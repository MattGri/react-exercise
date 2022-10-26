import React, { useEffect } from 'react';
// import hooka useEffect zeby móc go wykorzystać

const Home = () => {
  useEffect(() => {
    // useEffect jest odpowiedzialny za wykonanie funkcji po załadowaniu strony
    document.title = 'Home';
    // ustawiam tytuł strony na Home
  }, []);
  // [] - tablica zależności, jeśli tablica jest pusta to funkcja useEffect wykona się tylko raz po załadowaniu strony

  return (
    <h1 className="title">Recruitment Task</h1>
    // wyświetlam tytuł strony
  );
};

export default Home;
// eksportuję komponent Home
