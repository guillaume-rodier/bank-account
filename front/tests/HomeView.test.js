import { render, screen, fireEvent } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import { useAccountStore } from '@/stores/account'
import HomeView from '@/views/HomeView.vue'
import '@testing-library/jest-dom'

describe('HomeView', () => {
  test('displays account information', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
      initialState: {
        account: {
          balance: 1200,
          authorizedLimit: 500
        }
      }
    })

    render(HomeView, {
      global: { plugins: [pinia] },
    })

    expect(await screen.findByTestId('balance')).toHaveTextContent('1200 €')
    expect(await screen.findByTestId('limit')).toHaveTextContent('500 €')
  })

  test('displays "None" if authorizedLimit is null', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
      initialState: {
        account: {
          account: {
            balance: 1000,
            authorizedLimit: null,
          }
        }
      }
    })

    render(HomeView, {
      global: { plugins: [pinia] },
    })

    expect(await screen.findByTestId('limit')).toHaveTextContent('Aucune')
  })

  test('disables the deposit button if the amount is 0', async () => {
    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
    })

    render(HomeView, {
      global: { plugins: [pinia] },
    })

    const button = screen.getByText('Déposer')
    expect(button).toBeDisabled()
  })

  test('remove the operating limit', async () => {
    const setLimitMock = vi.fn().mockResolvedValue({ message: 'Limite retirée' })

    const pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
      initialState: {
        account: {
          balance: 1200,
          authorizedLimit: 500,
        },
      },
    })

    const store = useAccountStore()
    store.setLimit = setLimitMock

    render(HomeView, {
      global: { plugins: [pinia] },
    })

    const button = screen.getByText('Retirer la limite de plafond')
    await fireEvent.click(button)

    expect(setLimitMock).toHaveBeenCalledWith(null)
  })
})
