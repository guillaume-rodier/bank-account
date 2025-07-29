class InterestService {
  constructor() {}

  // Method to apply interest to a balance
  applyInterestToAccount(
    balance: number,
    authorizedLimit: number | null,
    interestRate: number
  ): { newBalance: number; interestApplied: number } {
    if (balance < 0) {
      return { newBalance: balance, interestApplied: 0 };
    }

    let newBalance = balance + balance * interestRate;

    if (
      authorizedLimit !== null &&
      authorizedLimit !== undefined &&
      typeof authorizedLimit === 'number' &&
      !isNaN(authorizedLimit) &&
      newBalance > authorizedLimit
    ) {
      newBalance = authorizedLimit;
    }

    return {
      newBalance,
      interestApplied: newBalance - balance,
    };
  }

  // Method to check if the current date is the end of the year
  isEndOfYear(date: Date): boolean {
    return date.getMonth() === 11 && date.getDate() === 31;
  }
}

export default new InterestService()
