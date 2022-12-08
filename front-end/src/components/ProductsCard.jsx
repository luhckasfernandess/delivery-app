import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsCard({ id, price, image, title }) {
  return (
    <div>
      <div key={ id }>
        <h3
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${price}` }
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
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value="0"
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
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
