import type { Account } from '../types/account';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import I18nService from '../services/localeService';

const account: Account = {
  id: uuidv4(),
  balance: 0,
  authorizedLimit: null,
  authorizedOverdraft: -100
};

export const getAccount = async (req: Request, res: Response) => {
  res.json(account);
};

export const doDeposit = async (req: Request, res: Response) => {
  const amount = Number(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: I18nService.getTranslations('amount_positive') });
  }
  if (account.authorizedLimit !== null && account.balance + amount > account.authorizedLimit) {
    return res.status(400).json({ error: I18nService.getTranslations('limit_exceeded') });
  }
  account.balance += amount;
  res.json(account);
};

export const doWithdraw = async (req: Request, res: Response) => {
  const amount = Number(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: I18nService.getTranslations('amount_positive') });
  }
  if (account.authorizedLimit === null || account.balance - amount < -account.authorizedLimit) {
    return res.status(400).json({ error:  I18nService.getTranslations('overdraft_not_allowed') });
  }
  account.balance -= amount;
  res.json(account);
};

export const setLimit = async (req: Request, res: Response) => {
  const limit = Number(req.body.limit);
  if (isNaN(limit) || limit < 0) {
    return res.status(400).json({ error: I18nService.getTranslations('limit_positive') });
  }
  account.authorizedLimit = limit;
  res.json(account);
};

export const applyInterest = async (req: Request, res: Response) => {
  const rate = Number(req.body.rate);
  if (isNaN(rate) || rate < 0) {
    return res.status(400).json({ error: I18nService.getTranslations('rate_positive') });
  }
  account.balance += account.balance * rate / 100;
  res.json(account);
};
