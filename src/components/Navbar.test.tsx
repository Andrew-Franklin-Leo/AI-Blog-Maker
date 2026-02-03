import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument()
    expect(screen.getByText(/Test AI/i)).toBeInTheDocument()
  })

  it('highlights the active link with aria-current="page"', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <Navbar />
      </MemoryRouter>
    )

    const createLink = screen.getByRole('link', { name: /Create Post/i })
    expect(createLink).toHaveAttribute('aria-current', 'page')

    const homeLink = screen.getByRole('link', { name: /Home/i })
    expect(homeLink).not.toHaveAttribute('aria-current', 'page')
  })

  it('correctly handles the home link active state with end prop', () => {
    render(
      <MemoryRouter initialEntries={['/create']}>
        <Navbar />
      </MemoryRouter>
    )

    const homeLink = screen.getByRole('link', { name: /Home/i })
    expect(homeLink).not.toHaveAttribute('aria-current', 'page')
  })
})
