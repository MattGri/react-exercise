import React, { useEffect } from 'react';
// importuje hooka useEffect żeby móc go wykorzystać

const ErrorPage = () => {
  useEffect(() => {
    // useEffect jest odpowiedzialny za wykonanie funkcji po załadowaniu strony
    document.title = 'Error';
    // ustawiam tytuł strony na Error
  }, []);
  // [] - tablica zależności, jeśli tablica jest pusta to funkcja useEffect wykona się tylko raz po załadowaniu strony

  return <h2 className="title">Page not found</h2>;
  // wyświetlam tytuł strony
};

export default ErrorPage;
// eksportujemy komponent ErrorPage
