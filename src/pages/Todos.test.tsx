import Todos from './Todos';
// importuje komponent Todos
import { render, screen } from '@testing-library/react';
// importuje metode render i screen

describe('Todos', () => {
  // testuje komponent Todos
  it('renders title', () => {
    // testuje czy komponent Todos się wyświetla
    render(<Todos />);
    // renderuje komponent Todos
    const title = screen.getByText(/Todos/i);
    // znajduje element zawierający tekst "Todos"
    expect(title).toBeInTheDocument();
    // sprawdzam czy element jest widoczny
  });

  it('shows document title as "Todos"', () => {
    // testuje czy tytuł strony to "Todos"
    render(<Todos />);
    // renderuje komponent Todos
    expect(document.title).toBe('Todos');
    // sprawdzam czy tytuł strony to "Todos"
  });

  it('fetches todos from API', async () => {
    //  testuje czy komponent Todos pobiera dane z API
    render(<Todos />);
    // renderuje komponent Todos
    const todos = await screen.findAllByTestId('todo');
    // znajduje elementy zawierające atrybut data-testid="todo"
    expect(todos).toHaveLength(10);
    // sprawdzam czy elementy są widoczne i czy ich ilość jest równa 10
  });
});
