import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar Skip Link', () => {
  beforeEach(() => {
    // Mock getElementById
    const mainContent = document.createElement('main')
    mainContent.setAttribute('id', 'main-content')
    mainContent.setAttribute('tabIndex', '-1')
    mainContent.focus = vi.fn()
    mainContent.scrollIntoView = vi.fn()
    document.body.appendChild(mainContent)
  })

  it('handles skip to content click', () => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    )

    const skipLink = screen.getByText(/skip to content/i)
    const mainContent = document.getElementById('main-content')!

    fireEvent.click(skipLink)

    expect(mainContent.focus).toHaveBeenCalled()
    expect(mainContent.scrollIntoView).toHaveBeenCalled()
  })
})
