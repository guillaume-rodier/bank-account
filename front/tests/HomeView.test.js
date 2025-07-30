import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import HomeView from '@/views/HomeView.vue'
import '@testing-library/jest-dom'

describe('HomeView', () => {
  test('display account infos', async () => {
    const pinia = createPinia()

    render(HomeView, {
      global: {
        plugins: [pinia],
      },
    })

    expect(await screen.findByText('1200 €')).toBeInTheDocument()
    expect(await screen.findByText('500 €')).toBeInTheDocument()
  })
})
