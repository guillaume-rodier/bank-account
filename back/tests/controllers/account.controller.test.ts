import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import {
  getAccount,
  doDeposit,
  doWithdraw,
  setLimit,
  doApplyInterest,
} from '@/controllers/account.controller';
import { asyncHandler } from '@/utils/asyncHandler';
import I18nService from '@/services/locale.service';

// Setup of the mocked express app
const app = express();
app.use(bodyParser.json());

// Tested routes
app.get('/account', asyncHandler(getAccount));
app.post('/deposit', asyncHandler(doDeposit));
app.post('/withdraw', asyncHandler(doWithdraw));
app.post('/set-limit', asyncHandler(setLimit));
app.post('/interest', asyncHandler(doApplyInterest));

// Test suite for account controller
describe('Account Controller', () => {
  it('should get account details', async () => {
    const res = await request(app).get('/account');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should deposit a valid amount', async () => {
    const res = await request(app).post('/deposit').send({ amount: 50 });
    expect(res.status).toBe(200);
    expect(res.body.balance).toBeGreaterThanOrEqual(50);
  });

  it('should reject a negative deposit', async () => {
    const res = await request(app).post('/deposit').send({ amount: -10 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(I18nService.getTranslations('amount_positive'));
  });

  it('should reject withdrawal if over overdraft', async () => {
    const res = await request(app).post('/withdraw').send({ amount: 999999 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(I18nService.getTranslations('overdraft_not_allowed'));
  });

  it('should set a valid limit', async () => {
    const res = await request(app).post('/set-limit').send({ limit: 2000 });
    expect(res.status).toBe(200);
    expect(res.body.authorizedLimit).toBe(2000);
  });

  it('should apply interest if date is 31 Dec', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-31T12:00:00Z'));

    const fakeAccount = {
      id: 'abc',
      balance: 1000,
      authorizedLimit: 2000,
      authorizedOverdraft: -100,
    };

    const res = await request(app).post('/interest').send({ account: fakeAccount });
    expect(res.status).toBe(200);
    expect(res.body.updatedBalance).toBe(1020);
    expect(res.body.message).toContain('Interest applied');

    jest.useRealTimers();
  });

  it('should not apply interest if date is not 31 Dec', async () => {
    const fakeAccount = {
      id: 'abc',
      balance: 1000,
      authorizedLimit: 2000,
      authorizedOverdraft: -100,
    };

    const res = await request(app).post('/interest').send({ account: fakeAccount });
    expect(res.status).toBe(200);
    expect(res.body.updatedBalance).toBe(null);
    expect(res.body.message).toContain("It's not December 31");
  });
});
