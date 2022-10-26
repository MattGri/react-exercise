import Home from './Home';
// importuje komponent Home
import { render, screen } from '@testing-library/react';
// importuje metode render i screen

describe('Home', () => {
  // testuje komponent Home
  it('renders title', () => {
    // testuje czy komponent Home się wyświetla
    render(<Home />);
    // renderuje komponent Home
    const title = screen.getByText(/Recruitment Task/i);
    //  znajduje element zawierający tekst "Recruitment Task"
    expect(title).toBeInTheDocument();
    // sprawdzam czy element jest widoczny
  });

  it('shows document title as "Home"', () => {
    render(<Home />);
    // renderuje komponent Home
    expect(document.title).toBe('Home');
    // sprawdzam czy tytuł strony to "Home"
  });
});
