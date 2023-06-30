import React, { useEffect, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

export default function ExploreFoodsNacionalites() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(true);
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Explore Nationalities" />
      <Footer />
    </div>
  );
}
