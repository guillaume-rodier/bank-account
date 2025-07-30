import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/api/axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        balance: 1200,
        authorizedLimit: 500,
      },
    }),
  },
}))
