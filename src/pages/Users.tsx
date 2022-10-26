import React, { useEffect, useState } from 'react';
// import hooka useEffect który jest odpowiedzialny za wykonanie funkcji po załadowaniu strony oraz useState który jest odpowiedzialny za tworzenie i aktualizowanie stanu
import axios from 'axios';
// importuje bibliotekę axios która jest odpowiedzialna za komunikację z API
import ReactPaginate from 'react-paginate';
// import biblioteki ReactPaginate która jest odpowiedzialny za paginację

interface User {
  email: string;
  gender: string;
  id: number;
  name: string;
  status: string;
}

// tworze interface obiektu naszego API czyli szkielet tego jak ma wyglądać obiekt

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  // tworze state users i ustawiam go na pustą tablicę na bazie interfejsu User czyli naszych danych pobieranych z API

  const [name, setName] = useState('');
  // tworze state dla imienia (początkowo pusty)

  const [email, setEmail] = useState('');
  // tworze state dla emaila (początkowo pusty)
  const [gender, setGender] = useState('male');
  // tworze state dla płci (początkowo ustawiony na male)
  const [status, setStatus] = useState('active');
  // tworze state dla statusu (początkowo ustawiony na active)

  const [pageNumber, setPageNumber] = useState(0);
  // tworze state dla numeru strony (początkowo ustawiony na 0)
  const [actualPage, setActualPage] = useState(
    // tworze state dla aktualnej strony (początkowo ustawiony na 1)

    localStorage.getItem('page') || 1
    // pobieram z localStorage aktualną stronę lub ustawiam na 1
  );

  useEffect(() => {
    document.title = 'Users';
    // ustawiam tytuł strony na Users

    axios
      .get(`https://gorest.co.in/public/v1/users?page=${actualPage}`, {
        // pobieram dane z API za pomocą biblioteki axios, metodą (http) get i podaję adres API z numerem strony pobranym z localStorage (jeśli nie ma to ustawiony jest na 1) dzięki temu po odświeżeniu strony nie zaczynamy od początku tylko od ostatniej strony na której byliśmy
        headers: {
          // dodaję nagłówki do zapytania

          Accept: 'application/json',
          // ustawiam typ danych na json
          'Content-Type': 'application/json',
          // ustawiam typ danych na json

          Authorization:
            'Bearer 1533f5328041264a1747ee4d995d1ffca1379aefb195c0fa7ee3f34b9d46b5f5',
          // ustawiam token autoryzacyjny który jest wymagany do pobrania danych z API poniewaz jest to API wykorzystujace wygenerowany token
        },
      })
      .then((response) => {
        // jeśli dane zostały pobrane pomyślnie to wykonuję poniższe instrukcje
        // pobieram z danych z API ilość wszystkich elementów
        setPageNumber(response.data.meta.pagination.pages);
        //  pobieram z danych z API ilość wszystkich stron i ustawiam ją jako ilość stron w paginacji

        setUsers(response.data.data);
        // ustawiam state users na pobrane dane z API

        setActualPage(Number(localStorage.getItem('page')));
        // ustawiam state actualPage na numer strony pobrany z localStorage
      })
      .catch((error) => {
        // jeśli wystąpi błąd to wykonuję poniższe instrukcje
        // console.log(error);
        // wyświetlam błąd w konsoli
      });
  }, [actualPage, name]);
  // wykonuję useEffect tylko wtedy gdy zmieni się state actualPage lub name, spowoduje to ponowne pobranie danych z API i ponowne wyświetlenie ich na stronie

  const changePage = ({ selected }: { selected: number }) => {
    // selected to numer strony na którą klikniemy i jest typu number

    setActualPage(selected + 1);
    // ustawiam state actualPage na numer strony pobrany z obiektu selected i dodaję 1 ponieważ numeracja stron w API zaczyna się od 1 a nie od 0

    localStorage.setItem('page', JSON.stringify(selected + 1));
    // zapisuje do localStorage numer strony na której jestem, kluczem jest post, a wartością numer strony
  };

  const createUser = () => {
    // tworze funkcję createUser

    if (name === '' || email === '') {
      // jeśli pole name lub email jest puste to
      return alert('Please fill all the fields');
      // zwracam alert z komunikatem o błędzie i kończę działanie funkcji
    } else if (
      !email.includes('@') ||
      !email.includes('.') ||
      email.length < 5
      // jeśli pole email nie zawiera @ lub . lub jest krótsze niż 5 znaków to
    ) {
      return alert('Please enter a valid email');
      // zwracam alert z komunikatem o błędzie i kończę działanie funkcji
    }
    axios
      .post(
        'https://gorest.co.in/public/v1/users',
        {
          // wysyłam dane do API za pomocą biblioteki axios, metodą (http) post i podaję adres API

          name: name,
          // przypisuje do pola name wartość pobraną z state name
          email: email,
          // przypisuje do pola email wartość pobraną z state email
          gender: gender,
          // przypisuje do pola gender wartość pobananą z state gender
          status: status,
          // przypisuje do pola status wartość pobraną z state status
        },
        {
          headers: {
            // dodaję nagłówki do zapytania
            Accept: 'application/json',
            // ustawiam typ danych na json
            'Content-Type': 'application/json',
            // ustawiam typ danych na json
            Authorization:
              'Bearer 1533f5328041264a1747ee4d995d1ffca1379aefb195c0fa7ee3f34b9d46b5f5',
            // ustawiam token autoryzacyjny który jest wymagany do pobrania danych z API poniewaz jest to API wykorzystujace wygenerowany token
          },
        }
      )
      .then((response) => {
        // jeśli dane zostały wysłane pomyślnie to wykonuję poniższe instrukcje
        setName('');
        // ustawiam state name na pusty string poniewaz po wysłaniu danych chcę aby pole name było puste
        setEmail('');
        // ustawiam state email na pusty string poniewaz po wysłaniu danych chcę aby pole name było puste
        setGender('male');
        // ustawiam state gender na pusty string poniewaz po wysłaniu danych chcę aby pole name było puste
        setStatus('active');
        // ustawiam state status na pusty string poniewaz po wysłaniu danych chcę aby pole name było puste
      })
      .catch((error) => {
        // jeśli wystąpi błąd to wykonuję poniższe instrukcje
        // console.log(error);
        // wyświetlam błąd w konsoli
      });
  };

  return (
    <>
      <h2 className="title">Users</h2>
      {/* 
        wyświetlam tytuł strony dzieki znacznikowi h1 i dodaje mu klasę title
      */}
      <div className="wrapperForm">
        {/* 
         tworzę kontener dla formularza
        */}
        <input
          className="information"
          required
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* 
          wyświetlam pole do wpisania imienia dzieki znacznikowi input i dodaje mu klasę information
          pole jest wymagane (required)
          pole jest typu text
          pole ma placeholder o treści Enter name
          pole ma wartość pobraną z state name
          pole ma event onChange który wywołuje funkcję setName która ustawia state name na wartość wpisaną w pole po każdej zmianie
        */}
        <input
          className="information"
          required
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/*
          wyświetlam pole do wpisania emaila dzieki znacznikowi input i dodaje mu klasę information
          pole jest wymagane (required)
          pole jest typu email
          pole ma placeholder o treści Enter email
          pole ma wartość pobraną z state email
          pole ma event onChange który wywołuje funkcję setEmail która ustawia state name na wartość wpisaną w pole po każdej zmianie
        */}
        <select
          className="information"
          required
          value={gender}
          onChange={(e) => {
            const selectedGender = e.target.value;
            setGender(selectedGender);
          }}
        >
          {/* 
              wyświetlam pole do wyboru płci dzieki znacznikowi select i dodaje mu klasę information
              pole jest wymagane (required)
              pole ma wartość pobran
              pole ma event onChange który wywołuje funkcję setGender  która ustawia 

            */}

          <option value="male">male</option>
          {/* 
            pierwsza opcja ma wartosc male

          */}
          <option value="female">female</option>
          {/* 
            druga opcja ma wartosc female
          */}
        </select>
        <select
          className="information"
          required
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          {/* 
            pierwsza opcja ma wartosc active
          */}
          <option value="inactive">Inactive</option>
          {/* 
            druga opcja ma wartosc inactive
          */}
        </select>

        <button className="submit" onClick={createUser}>
          {/* 
        tworze przycisk który po kliknięciu wywołuje funkcję createUser
        */}
          create user
        </button>
        {/*
          wyświetlam przycisk dzieki znacznikowi button i dodaje mu klasę submit
          przycisk ma event onClick który wywołuje funkcję createUser
        */}
      </div>

      <ul className="wrapperParent" data-testid="user">
        {/* 
          tworzę kontener dla listy
        */}
        {users.map(({ id, name, email, gender, status }: User) => {
          /*wyświetlam listę użytkowników dzięki metodzie tablicowej map ponieważ jest to tablica obiektów w metodzie map przekazuję parametry id, name, email, gender, status za pomocą destrukturyzacji ktore bazuja na interfejsie User */
          return (
            <li className="item" key={id}>
              {/*
                wyświetlam element listy dzieki znacznikowi li i dodaje mu klasę item
                element listy ma key który jest równy id
              */}
              <h2 className='itemTitle'>{name}</h2>
              {/* 
                wyświetlam imię użytkownika 
              */}
              <p className="itemInformation">{email}</p>
              {/*
                wyświetlam email użytkownika 
              */}
              <p className="itemInformation">{gender}</p>
              {/*
                wyświetlam płeć użytkownika
              */}
              <p className="itemInformation">{status}</p>
              {/*
                wyświetlam status użytkownika
              */}
            </li>
          );
        })}
      </ul>

      <ReactPaginate
        // wyświetlam komponent ReactPaginate
        forcePage={
          // ustawiam aktualną stronę na numer pobrany z localStorage
          localStorage.getItem('page')
            ? // pobieram numer strony z localStorage
              Number(localStorage.getItem('page')) - 1
            : // jeśli localStorage nie jest pusty to przypisuje do state actualPage numer strony pobrany z localStorage
              0
          // jeśli localStorage jest pusty to przypisuje do state actualPage 0
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

export default Users;
// eksportuję komponent Users
