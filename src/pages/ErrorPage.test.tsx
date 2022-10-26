import ErrorPage from './ErrorPage';
// importuje komponent ErrorPage
import { render, screen } from '@testing-library/react';
// importuje metode render i screen

describe('Error page', () => {
  // testuje komponent ErrorPage
  it('renders error page', () => {
    // testuje czy komponent ErrorPage się wyświetla
    render(<ErrorPage />);
    // renderuje komponent ErrorPage
    const title = screen.getByText(/Page not found/i);
    // znajduje element zawierający tekst "Page not found"
    expect(title).toBeInTheDocument();
    // sprawdzam czy element jest na stronie
  });

  it('shows document title as "Error"', () => {
    // testuje czy tytuł strony jest "Error"
    render(<ErrorPage />);
    // renderuje komponent ErrorPage
    expect(document.title).toBe('Error');
    // sprawdzam czy tytuł strony to "Error"
  });
});
