import React, { useState } from 'react';
// importuje hooka useState żeby móc go wykorzystać
import { Link } from 'react-router-dom';
// importuje link z react-router-dom
import MenuIcon from '@mui/icons-material/Menu';
// importuje ikonkę menu z biblioteki material-ui
import CloseIcon from '@mui/icons-material/Close';
// importuje ikonkę zamknięcia z biblioteki material-ui

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  // tworzę zmienną isOpen i funkcję setIsOpen, początkowo ustawiam ją na false poniewaz menu jest zamknięte

  return (
    <nav className="container">
      {/* 
        dodaje semantyczny  znacznik nav, który będzie zawierał nawigację
      */}
      <ul className="wrapper">
        {/* 
          znacznik ul będzie zawierał listę elementów czyli linki do innych stron
        */}
        <li className="wrapperItem">
          {/*   
            znacznik li będzie zawierał pojedynczy element listy 
          */}
          <Link className="navItem" to="/">
            {/* 
               Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/" przypisuję ścieżkę do strony głównej. Link renderuje się jako znacznik a
            */}
            Home
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/posts">
            {/* 
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/posts" przypisuję ścieżkę do strony z postami. Link renderuje się jako znacznik a
            */}
            Posts
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/todos">
            {/*
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/todos" przypisuję ścieżkę do strony z zadaniami. Link renderuje się jako znacznik a
            */}
            Todos
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/users">
            {/*
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/users" przypisuję ścieżkę do strony z użytkownikami. Link renderuje się jako znacznik a
            */}
            Users
          </Link>
        </li>
      </ul>
      <button className="menuIcon" onClick={() => setIsOpen((prev) => !prev)}>
        {/* 
            dodaje przycisk, który będzie na kliknięcie otwierał i zamykał menu. W funkcji setIsOpen przekazuję poprzedni stan zmiennej isOpen i odwracam jego wartość (negacja) dzięki temu menu będzie się otwierało i zamykało
          */}
        {isOpen ? <CloseIcon /> : <MenuIcon />}
        {/* 
            jeżeli isOpen będzie true to wyświetlam ikonkę zamknięcia, jeżeli false to ikonkę menu
        */}
      </button>

      {isOpen && (
        // jeżeli isOpen będzie true to wyświetlam nawigację
        <ul className="showWrapper">
          {/* 
            znacznik ul będzie zawierał listę elementów czyli linki do innych stron
          */}
          <li className="wrapperItem">
            {/*
              znacznik li będzie zawierał pojedynczy element listy
            */}
            <Link className="showNavItem" to="/">
              {/* 
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/" przypisuję ścieżkę do strony głównej. Link renderuje się jako znacznik a
              */}
              Home
            </Link>
          </li>
          <li>
            {/*
              znacznik li będzie zawierał pojedynczy element listy
            */}
            <Link className="showNavItem" to="/posts">
              {/*
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/posts" przypisuję ścieżkę do strony z postami. Link renderuje się jako znacznik a
              */}
              Posts
            </Link>
          </li>
          <li>
            {/*
              znacznik li będzie zawierał pojedynczy element listy
            */}
            <Link className="showNavItem" to="/todos">
              {/*
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/todos" przypisuję ścieżkę do strony z zadaniami. Link renderuje się jako znacznik a
              */}
              Todos
            </Link>
          </li>
          <li>
            {/*
              znacznik li będzie zawierał pojedynczy element listy
            */}
            <Link className="showNavItem" to="/users">
              {/*
                Link pozwala na nawigację pomiędzy stronami, do atrybutu to="/users" przypisuję ścieżkę do strony z użytkownikami. Link renderuje się jako znacznik a
              */}
              Users
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
// eksportuje komponent Navigation
