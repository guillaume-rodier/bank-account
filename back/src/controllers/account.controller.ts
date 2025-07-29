import type { Account } from '@/types/account';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import I18nService from '@/services/locale.service';
import InterestService from '@/services/interest.services';

const account: Account = {
  id: uuidv4(),
  balance: 0,
  authorizedLimit: null,
  authorizedOverdraft: -100
};

// Get the account details
export const getAccount = async (req: Request, res: Response) => {
  res.json(account);
};

// Deposit an amount into the account
export const doDeposit = async (req: Request, res: Response) => {
  const amount = Number(req.body.amount);

  // Validate the amount
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: I18nService.getTranslations('amount_positive') });
  }

  // Check if the deposit exceeds the authorized limit
  if (account.authorizedLimit !== null && account.balance + amount > account.authorizedLimit) {
    return res.status(400).json({ error: I18nService.getTranslations('limit_exceeded') });
  }

  // Update the account balance
  account.balance += amount;

  // Return the updated account
  res.json(account);
};

// Withdraw an amount from the account
export const doWithdraw = async (req: Request, res: Response) => {
  const amount = Number(req.body.amount);

  // Validate the amount
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: I18nService.getTranslations('amount_positive') });
  }

  // Check if the withdrawal exceeds the authorized limit
  if (account.authorizedLimit === null || account.balance - amount < -account.authorizedLimit) {
    return res.status(400).json({ error:  I18nService.getTranslations('overdraft_not_allowed') });
  }

  // Update the account balance
  account.balance -= amount;

  // Return the updated account
  res.json(account);
};

// Set the authorized limit for the account
export const setLimit = async (req: Request, res: Response) => {
  const limit = req.body.limit;

  // Validate the limit
  if (isNaN(limit) || limit < 0) {
    return res.status(400).json({ error: I18nService.getTranslations('limit_positive') });
  }

  // Update the authorized limit
  account.authorizedLimit = limit;

  // Return the updated account
  res.json(account);
};

// Apply interest to the account balance if it's the end of the year
export const doApplyInterest = async (req: Request, res: Response) => {
  const today = new Date();
  const account: Account = req.body.account;
  const interestRate = 0.02;
  const { balance, authorizedLimit } = account;

  // Check if today is December 31
  if (!InterestService.isEndOfYear(today)) {
    return res.json({
      message: "Interest not applied. It's not December 31.",
      updatedBalance: null,
    });
  }

  // Validate the account
  if (!account) {
    return res.status(400).json({ message: "Account data is required." });
  }

  // Apply interest to the account balance
  const { newBalance, interestApplied } =
    InterestService.applyInterestToAccount(balance, authorizedLimit, interestRate);

  // Get the message if interest was applied
  const message =
    interestApplied > 0
      ? `Interest applied: ${interestApplied.toFixed(2)}. New balance: ${newBalance.toFixed(2)}.`
      : "No interest applied because account is overdrawn.";

  // return the updated account with the message
  return res.json({
    message,
    updatedBalance: newBalance,
    account,
  });
};
