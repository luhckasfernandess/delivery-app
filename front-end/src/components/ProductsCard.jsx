import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductsCard({ id, price, image, title }) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div key={ id }>
        <h3
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${price.toString().replace('.', ',')}` }
        </h3>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          alt="beer"
          src={ image }
        />
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { title }
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => {
            if (counter <= 0) return 0;
            setCounter(counter - 1);
          } }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ counter }
          onChange={ ({ target }) => {
            if (Number(target.value)) setCounter(Number(target.value));
          } }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => { setCounter(counter + 1); } }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number,
  price: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
}.isRequired;
