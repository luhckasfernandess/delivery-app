import PropTypes from 'prop-types';

export default function TableOrder({ products }) {
  let count = 0;
  let cartIndex = 0;
  return (
    <table width="100%" border="1">
      <thead>
        <tr>
          <th>item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, i) => {
          if (item.quantity > 0) {
            count += 1;
            cartIndex = (count - 1);
            return (
              <tr key={ i }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${cartIndex}`
                  }
                >
                  {count}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${cartIndex}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `ccustomer_order_details__element-order-table-quantity-${cartIndex}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${cartIndex}`
                  }
                >

                  {item.price.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${cartIndex}`
                  }
                >

                  {(item.quantity * item.price).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            );
          }
          return '';
        })}
      </tbody>
    </table>
  );
}

TableOrder.propTypes = {
  products: PropTypes.any,
}.isRequired;
