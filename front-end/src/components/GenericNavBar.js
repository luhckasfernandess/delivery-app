import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function GenericNavBar(
  {
    item1,
    path1,
    dataTestid1,
    item2,
    path2,
    dataTestid2,
    userName,
  },
) {
  return (
    <nav>

      <Link
        to={ path1 }
        data-testid={ dataTestid1 }
      >
        { item1 }
      </Link>

      {item2 && (
        <Link
          to={ path2 }
          data-testid={ dataTestid2 }
        >
          { item2 }
        </Link>
      )}

      <h3
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { userName }
      </h3>

      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );
}

GenericNavBar.defaultProps = {
  item2: '',
  path2: '',
  dataTestid2: '',
};

GenericNavBar.propTypes = {
  item1: PropTypes.string.isRequired,
  path1: PropTypes.string.isRequired,
  dataTestid1: PropTypes.string.isRequired,
  item2: PropTypes.string,
  path2: PropTypes.string,
  dataTestid2: PropTypes.string,
  userName: PropTypes.string.isRequired,
};
