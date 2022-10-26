import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Users from './pages/Users';
import ErrorPage from './pages/ErrorPage';
import './styles/home.scss';
import './styles/navigation.scss';
import './styles/apiPages.scss';

function App() {
  // komponent App który będzie zawierał wszystkie inne komponenty
  return (
    // zwracam komponent Router który jest odpowiedzialny za nawigację pomiędzy stronami
    <Router>
      {/* 
        Router pozwala nam na owinięcie wszystkich komponentów, dzięki temu będziemy mogli nawigować się pomiędzy stronami
      */}
      <div className="App">
        {/* 
          div zawiera całą aplikację 
        */}
        <Navigation />
        {/* 
          wyświetlam komponent Navigation który jest odpowiedzialny za nawigację pomiędzy stronami
        */}
        <Routes>
          {/* 
            Routes zawiera wszystkie routy do innych stron 
          */}
          <Route path="/" element={<Home />} />
          {/* 
            Route jest odpowiedzialny za wyświetlanie odpowiedniej strony w zależności od ścieżki path, do path przypisuję ścieżkę do strony głównej, do element przypisuję komponent Home który jest odpowiedzialny za wyświetlanie strony głównej
          */}

          <Route path="/posts" element={<Posts />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
