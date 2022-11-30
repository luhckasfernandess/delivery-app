import React from 'react';
import PropTypes from 'prop-types';

export default function NavBar({ item1, item2, userName, logout }) {
  return (
    <nav>
      <h1>{ item1 }</h1>
      <h1>{ item2 }</h1>
      <h1>{ userName }</h1>
      <h1>{ logout }</h1>
    </nav>
  );
}

NavBar.defaultProps = {
  item2: '',
  logout: 'Sair',
};

NavBar.propTypes = {
  item1: PropTypes.string.isRequired,
  item2: PropTypes.string,
  userName: PropTypes.string.isRequired,
  logout: PropTypes.string,
};
