import React, { useEffect, useState } from 'react';
// import hooka useEffect zeby móc go wykorzystać oraz useState
import axios from 'axios';
// import biblioteki axios do wykonywania metod HTTP
import ReactPaginate from 'react-paginate';
// import biblioteki ReactPaginate do wyświetlania paginacji

interface Todo {
  id: number;
  title: string;
  due_on: string;
  status: string;
}

// tworze interfejs obiektu naszego API czyli szkielet tego jak ma wyglądać obiekt

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // tworze state todos i ustawiam go na pustą tablicę na bazie interfejsu Todo czyli naszych danych pobieranych z API

  const [pageNumber, setPageNumber] = useState(0);
  // tworze state dla numeru strony (początkowo ustawiony na 0)
  const [actualPage, setActualPage] = useState(
    // tworze state dla aktualnej strony (początkowo ustawiony na 1)
    localStorage.getItem('todo') || 1
    // pobieram z localStorage aktualną stronę lub ustawiam na 1
  );

  useEffect(() => {
    document.title = 'Todos';
    // ustawiam tytuł strony na Todos

    axios
      .get(`https://gorest.co.in/public/v1/todos?page=${actualPage}`)
      // pobieram dane z API za pomocą biblioteki axios, metodą (http) get i podaję adres API z numerem strony pobranym z localStorage (jeśli nie ma to ustawiony jest na 1) dzięki temu po odświeżeniu strony nie zaczynamy od początku tylko od ostatniej strony na której byliśmy
      .then((response) => {
        // jeśli dane zostały pobrane pomyślnie to wykonuję poniższe instrukcje
        setPageNumber(response.data.meta.pagination.pages);
        //  pobieram z danych z API ilość wszystkich stron i ustawiam ją jako ilość stron w paginacji
        setTodos(response.data.data);
        // ustawiam state todos na pobrane dane z API

        setActualPage(Number(localStorage.getItem('todo')));
        // ustawiam state actualPage na numer strony pobrany z localStorage
      })
      .catch((error) => {
        // jeśli wystąpi błąd to wyświetlam go w konsoli
        // console.log(error);
        // wyświetlam błąd w konsoli
      });
  }, [actualPage]);
  // wykonuję useEffect tylko wtedy gdy zmieni się state actualPage, spowoduje to ponowne pobranie danych z API i ponowne wyświetlenie ich na stronie

  const changePage = ({ selected }: { selected: number }) => {
    // selected to numer strony na którą klikniemy i jest typu number
    setActualPage(selected + 1);
    // ustawiam state actualPage na numer strony pobrany z obiektu selected i dodaję 1 ponieważ numeracja stron w API zaczyna się od 1 a nie od 0

    localStorage.setItem('todo', JSON.stringify(selected + 1));
    // zapisuje do localStorage numer strony na której jestem, kluczem jest todo, a wartością numer strony
  };

  return (
    <>
      <h2 className="title">Todos</h2>
      {/* wyświetlam tytuł strony */}
      <ul className="wrapperParent" data-testid="todo">
        {/* tworze kontener dla listy */}
        {todos.map(({ id, title, due_on, status }: Todo) => {
          /*wyświetlam listę użytkowników dzięki metodzie tablicowej map ponieważ jest to tablica obiektów w metodzie map przekazuję parametry id, name, email, gender, status za pomocą destrukturyzacji ktore bazuja na interfejsie Todo */
          return (
            <li className="item" key={id}>
              {/*
                wyświetlam element listy dzieki znacznikowi li i dodaje mu klasę item
                element listy ma key który jest równy id
              */}
              <h2 className="itemTitle">{title}</h2>
              {/* wyświetlam tytuł */}
              <p className="itemInformation">{due_on}</p>
              {/* wyświetlam datę */}
              <p className="itemInformation">{status}</p>
              {/* wyświetlam status */}
            </li>
          );
        })}
      </ul>

      <ReactPaginate
        // wyświetlam komponent ReactPaginate
        forcePage={
          // ustawiam aktualną stronę na numer pobrany z localStorage
          localStorage.getItem('todo')
            ? // pobieram numer strony z localStorage
              Number(localStorage.getItem('todo')) - 1
            : // jeśli localStorage nie jest pusty to przypisuje do state actualPage numer strony pobrany z localStorage
              0
        }
        // jesli znajdzie ustawia page -1 a jak nie znajdzie ustawia na 0
        previousLabel={'<'}
        // ustawiam etykietę dla przycisku poprzedniej strony
        nextLabel={'>'}
        // ustawiam etykietę dla przycisku następnej strony
        breakLabel={'...'}
        // ustawiam etykietę dla przycisku po środku między stronami
        pageCount={pageNumber}
        // ustawiam ilość stron
        marginPagesDisplayed={1}
        // ustawiam ilość stron wyświetlanych na końcu
        pageRangeDisplayed={1}
        // ustawiam ilość stron wyświetlanych w środku
        onPageChange={changePage}
        // ustawiam funkcję która ma się wykonać po kliknięciu na przycisk czyli changePage
        containerClassName="pagination"
        // ustawiam klasę dla kontenera z przyciskami
        pageLinkClassName="page-num"
        // ustawiam klasę dla przycisków
        previousLinkClassName="page-num"
        // ustawiam klasę dla przycisku poprzednia strona
        nextLinkClassName="page-num"
        // ustawiam klasę dla przycisku następna strona
        activeClassName="active"
        // ustawiam klasę dla aktywnego przycisku
      />
    </>
  );
};

export default Todos;
