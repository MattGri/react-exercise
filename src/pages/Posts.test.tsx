import Posts from './Posts';
// importuje komponent Posts
import { render, screen } from '@testing-library/react';
// importuje metode render i screen

describe('Posts', () => {
  // testuje komponent Posts
  it('renders title', () => {
    // testuje czy komponent Posts się wyświetla
    render(<Posts />);
    // renderuje komponent Posts
    const title = screen.getByText(/Posts/i);
    // znajduje element zawierający tekst "Posts"
    expect(title).toBeInTheDocument();
    // sprawdzam czy element jest widoczny
  });
  it('shows document title as "Posts"', () => {
    // testuje czy tytuł strony to "Posts"
    render(<Posts />);
    // renderuje komponent Posts
    expect(document.title).toBe('Posts');
    // sprawdzam czy tytuł strony to "Posts"
  });
  it('fetches posts from API', async () => {
    // testuje czy komponent Posts pobiera dane z API
    render(<Posts />);
    // renderuje komponent Posts
    const posts = await screen.findAllByTestId('post');
    // znajduje elementy zawierające atrybut data-testid="post"
    expect(posts).toHaveLength(10);
    // sprawdzam czy elementy są widoczne i czy ich ilość jest równa 10
  });
});
