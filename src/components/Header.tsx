import React from 'react';
import catImage from '../images/cat.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header__title">Welcome</h1>
      <img src={catImage} className="header__image" alt="Cat" width="40" height="40" />
    </header>
  );
};

export default Header;