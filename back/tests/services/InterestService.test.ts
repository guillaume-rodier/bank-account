import InterestService from '../../src/services/interest.services';

beforeAll(() => {
  console.log('Running InterestService tests');
});

// Test suite for interest service
describe('InterestService', () => {
  describe('applyInterestToAccount', () => {
    it('applies interest correctly when everything is valid', () => {
      const result = InterestService.applyInterestToAccount(1000, null, 0.02);
      expect(result.newBalance).toBeCloseTo(1020);
      expect(result.interestApplied).toBeCloseTo(20);
    });

    it('returns the same balance if the account is overdrawn', () => {
      const result = InterestService.applyInterestToAccount(-100, 1000, 0.02);
      expect(result.newBalance).toBe(-100);
      expect(result.interestApplied).toBe(0);
    });

    it("does not exceed the authorized ceiling", () => {
      const result = InterestService.applyInterestToAccount(1000, 1010, 0.02);
      expect(result.newBalance).toBe(1010); // au lieu de 1020
      expect(result.interestApplied).toBe(10);
    });

    it('ignore null or invalid ceilings', () => {
      const result1 = InterestService.applyInterestToAccount(1000, null, 0.02);
      const result2 = InterestService.applyInterestToAccount(1000, NaN, 0.02);
      expect(result1.newBalance).toBeCloseTo(1020);
      expect(result2.newBalance).toBeCloseTo(1020);
    });
  });

  describe('isEndOfYear', () => {
    it('returns true for December 31', () => {
      const date = new Date('2025-12-31');
      expect(InterestService.isEndOfYear(date)).toBe(true);
    });

    it("returns false for any other day", () => {
      const date = new Date('2025-07-29');
      expect(InterestService.isEndOfYear(date)).toBe(false);
    });
  });
});
