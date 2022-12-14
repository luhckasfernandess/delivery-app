import PropTypes from 'prop-types';

export default function OrderCard({ id, status, date, totalPrice }) {
  return (
    <div>
      <div key={ id }>
        <h3
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}
        </h3>
        <h3
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </h3>
        <h3
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {date}
        </h3>
        <h3
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { `R$${totalPrice.replace('.', ',')}` }
        </h3>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  totalPrice: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
}.isRequired;
