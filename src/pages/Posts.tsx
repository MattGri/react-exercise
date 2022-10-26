import React, { useEffect, useState } from 'react';
// import hooka useEffect zeby móc go wykorzystać oraz useState
import axios from 'axios';
// import biblioteki axios do wykonywania metod HTTP
import ReactPaginate from 'react-paginate';
// import biblioteki ReactPaginate do wyświetlania paginacji

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
// tworze interface obiektu naszego API czyli szkielet tego jak ma wyglądać obiekt

interface Comment {
  id: number;
  post_id: number;
  body: string;
}
// tworze interface obiektu naszego API czyli szkielet tego jak ma wyglądać obiekt

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // tworze state posts i ustawiam go na pustą tablicę na bazie interfejsu Post czyli naszych danych pobieranych z API
  const [comments, setComments] = useState<Comment[]>([]);
  // tworze state comments i ustawiam go na pustą tablicę na bazie interfejsu Comment czyli naszych danych pobieranych z API

  const [title, setTitle] = useState('');
  // tworze state dla tytułu (początkowo pusty)
  const [body, setBody] = useState('');
  // tworze state dla treści (początkowo pusty)

  const [pageNumber, setPageNumber] = useState(0);
  // tworze state dla numeru strony (początkowo 0)
  const [actualPage, setActualPage] = useState(
    // tworze state dla aktualnej strony (początkowo 1)
    localStorage.getItem('post') || 1
    // pobieram z localStorage aktualną stronę lub ustawiam na 1
  );

  useEffect(() => {
    document.title = 'Posts';
    // ustawiam tytuł strony na Posts

    axios
      .get(
        `https://gorest.co.in/public/v1/posts?page=${actualPage}`,
        // pobieram dane z API za pomocą biblioteki axios, metodą (http) get i podaję adres API z numerem strony pobranym z localStorage (jeśli nie ma to ustawiony jest na 1) dzięki temu po odświeżeniu strony nie zaczynamy od początku tylko od ostatniej strony na której byliśmy
        {
          headers: {
            // dodaję nagłówki do zapytania
            Accept: 'application/json',
            // ustawiam typ danych na json
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 1533f5328041264a1747ee4d995d1ffca1379aefb195c0fa7ee3f34b9d46b5f5',
            // ustawiam token autoryzacyjny który jest wymagany do pobrania danych z API poniewaz jest to API wykorzystujace wygenerowany token
          },
        }
      )
      .then((response) => {
        // jeśli dane zostały pobrane pomyślnie to wykonuję poniższe instrukcje
        setPageNumber(response.data.meta.pagination.pages);
        //  pobieram z danych z API ilość wszystkich stron i ustawiam ją jako ilość stron w paginacji
        setPosts(response.data.data);
        // ustawiam state posts na pobrane dane z API
      })
      .catch((error) => {
        // jeśli wystąpi błąd to wykonuję poniższe instrukcje
        // console.log(error);
        // wyświetlam błąd w konsoli
      });

    axios
      .get(`https://gorest.co.in/public/v1/comments?page=${actualPage}`)
      // pobieram z API komentarze do postów
      .then((response) => {
        setComments(response.data.data);
        // ustawiam state comments na dane z API
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [actualPage, title]);
  // wykonuję useEffect tylko wtedy gdy zmieni się state actualPage lub name, spowoduje to ponowne pobranie danych z API i ponowne wyświetlenie ich na stronie

  const changePage = ({ selected }: { selected: number }) => {
    // selected to numer strony na którą klikniemy i jest typu number
    // tworze funkcje changePage która przyjmuje obiekt selected typu number
    setActualPage(selected + 1);
    // ustawiam state actualPage na numer strony pobrany z obiektu selected i dodaję 1 ponieważ numeracja stron w API zaczyna się od 1 a nie od 0

    localStorage.setItem('post', JSON.stringify(selected + 1));
    // zapisuje do localStorage numer strony na której jestem, kluczem jest post, a wartością numer strony
  };

  const createPost = () => {
    if (title === '' || body === '') {
      // jeśli title lub body są puste to wykonuję poniższe instrukcje
      return alert('Please fill all fields');
      // wyświetlam komunikat o błędzie i kończę działanie funkcji
    }
    axios
      .post(
        'https://gorest.co.in/public/v1/posts',
        {
          // wysyłam dane do API za pomocą biblioteki axios, metodą (http) post i podaję adres API
          title: title,
          // przypisuje do pola title wartość pobraną z state title
          body: body,
          // przypisuje do pola body wartość pobraną z state body
          user_id: Math.floor(Math.random() * 1000),
          // przypisuje do pola user_id identyfikator użytkownika, wykorzystuję do tego metode Math.random która zwraca losową liczbę z przedziału 0-1, mnożę ją przez 1000 dzięki czemu otrzymuję liczbę z przedziału 0-1000, następnie zaokrąglam ją do najbliższej liczby całkowitej za pomocą metody Math.floor
        },
        {
          headers: {
            // dodaję nagłówki do zapytania
            Accept: 'application/json',
            // ustawiam typ danych na json
            'Content-Type': 'application/json',

            'Access-Control-Allow-Origin': '*',

            Authorization:
              'Bearer 1533f5328041264a1747ee4d995d1ffca1379aefb195c0fa7ee3f34b9d46b5f5',
            // ustawiam token autoryzacyjny który jest wymagany do pobrania danych z API poniewaz jest to API wykorzystujace wygenerowany token
          },
        }
      )
      .then((response) => {
        // jeśli dane zostały wysłane pomyślnie to wykonuję poniższe instrukcje
        setTitle('');
        // ustawiam state title na pusty string ponieważ po wysłaniu posta chcę żeby pole title było puste
        setBody('');
        // ustawiam state body na pusty string ponieważ po wysłaniu posta chcę żeby pole body było puste
      })
      .catch((error) => {
        // jeśli wystąpi błąd to wykonuję poniższe instrukcje
        // console.log(error);
        // wyświetlam błąd w konsoli
      });
  };

  return (
    <>
      <h2 className="title">Posts</h2>
      {/* 
      // wyświetlam tytuł strony
      */}

      <div className="wrapperForm">
        {/* 
        // tworzę kontener dla formularza
        */}
        <input
          className="information"
          required
          type="text"
          placeholder="Post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* 
          wyswietlam pole do wpisania posta dzieki znacznikowi input i dodaje mu klase information
          ustawiam pole jako wymagane (required)
          ustawiam typ pola na text
          ustawiam placeholder na Post
          ustawiam value na state title
          pole ma event onChange który wywołuje funkcję setPost która ustawia state name na wartość wpisaną w pole po każdej zmianie
        */}
        <input
          className="information"
          required
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {/* 
          wyswietlam pole do wpisania posta dzieki znacznikowi input i dodaje mu klase information
          ustawiam pole jako wymagane (required)
          ustawiam typ pola na text
          ustawiam placeholder na Body
          ustawiam value na state body
          pole ma event onChange który wywołuje funkcję setBody która ustawia state body na wartość wpisaną w pole po każdej zmianie
        */}

        <button className="submit" onClick={createPost}>
          Create Post
        </button>
        {/* 
        tworze przycisk który po kliknięciu wywołuje funkcję createPost
        */}
      </div>
      <ul className="wrapperParent" data-testid="post">
        {posts.map(({ id, title, body, user_id }: Post) => (
          // wyświetlam posty za pomocą metody tablicowej map poniewaz jest to tablica obiektów, w metodzie map przekazuje parametry id, title, body, user_id, za pomocą destrukturyzacji ktore
          // bazuja na interfejsie Post
          <li
            className="item"
            // wyświetlam posty w liście
            key={id}
            // ustawiam klucz na id posta
          >
            <h2 className="itemTitle">{title}</h2>
            {/* 
            wyświetlam tytuł postu
            */}
            <p className="itemInformation">{body}</p>
            {/* 
            wyświetlam treść postu
            */}
            <p className="itemInformation">{id}</p>

            {/* 
            wyświetlam id postu
            */}

            <p className="itemInformation">{user_id}</p>

            {/* 
            wyświetlam id użytkownika
            */}

            {comments
              .filter(({ post_id }: Comment) => post_id === id)
              .map(({ id, body }: Comment) => (
                // sprawdzam czy id postu jest równe id komentarza za pomocą metody tablicowej filter i wyświetlam komentarze do postu za pomocą metody tablicowej map
                <p key={id} className="itemInformation">
                  {body}
                </p>
                // wyświetlam komentarze do postu i przypisuję im key id komentarza zeby nie było błędu w konsoli
              ))}
          </li>
        ))}
      </ul>

      <ReactPaginate
        // wyświetlam komponent ReactPaginate
        forcePage={
          // ustawiam stronę na którą ma być przekierowany użytkownik po kliknięciu w przycisk
          localStorage.getItem('post')
            ? // pobieram z localStorage wartość klucza post
              Number(localStorage.getItem('post')) - 1
            : // jeśli localStorage nie jest pusty to przypisuję do forcePage wartość klucza post - 1 ponieważ numeracja stron w ReactPaginate zaczyna się od 0
              0
          // jeśli localStorage jest pusty to przypisuję do forcePage wartość 0
        }
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

export default Posts;
// eksportuję komponent Posts
