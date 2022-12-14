export default function TableOrder() {
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
                    `customer_checkout__element-order-table-item-number-${cartIndex}`
                  }
                >
                  {count}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${cartIndex}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${cartIndex}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${cartIndex}`
                  }
                >

                  {item.price.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${cartIndex}`
                  }
                >

                  {(item.quantity * item.price).toFixed(2).replace('.', ',')}
                </td>
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${cartIndex}`
                    }
                    type="button"
                    onClick={ () => removeProduct(i) }
                  >
                    Remover
                  </button>
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
