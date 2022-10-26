import Users from './Users';
// importuje komponent Users
import { render, screen } from '@testing-library/react';
// importuje metode render i screen

describe('Users', () => {
  // testuje komponent Users
  it('renders title', () => {
    // testuje czy komponent Users się wyświetla
    render(<Users />);
    // renderuje komponent Users
    const title = screen.getByText(/Users/i);
    // znajduje element zawierający tekst "Users"
    expect(title).toBeInTheDocument();
    // sprawdzam czy element jest widoczny
  });

  it('shows document title as "Users"', () => {
    // testuje czy tytuł strony to "Users"
    render(<Users />);
    // renderuje komponent Users
    expect(document.title).toBe('Users');
    // sprawdzam czy tytuł strony to "Users"
  });

  it('fetches users from API', async () => {
    // testuje czy komponent Users pobiera dane z API
    render(<Users />);
    // renderuje komponent Users
    const users = await screen.findAllByTestId('user');
    // znajduje elementy zawierające atrybut data-testid="user"
    expect(users).toHaveLength(10);
    // sprawdzam czy elementy są widoczne i czy ich ilość jest równa 10
  });
});
