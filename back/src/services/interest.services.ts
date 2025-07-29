class InterestService {
  constructor() {}

  // Method to apply interest to a balance
  applyInterest(balance: number, interestRate: number): number {
    return balance + balance * interestRate;
  }

  // Method to check if the current date is the end of the year
  isEndOfYear(date: Date): boolean {
    return date.getMonth() === 11 && date.getDate() === 31;
  }
}

export default new InterestService()
