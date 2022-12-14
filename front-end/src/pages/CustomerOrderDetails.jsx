import NavBar from '../components/NavBar';

export default function CustomerOrdersDetails() {
  const dataUser = JSON.parse(localStorage.getItem('user'));
  const { name } = dataUser;
  return (
    <div>
      <NavBar
        path1="/customer/products"
        dataTestid1="customer_products__element-navbar-link-products"
        item1="PRODUTOS"
        path2="/customer/orders"
        dataTestid2="customer_products__element-navbar-link-orders"
        item2="MEUS PEDIDOS"
        userName={ name }
      />
      <h1>Detalhes do Pedido</h1>
      <div>
        <h3
          data-testid={
            `customer_order_details__element-order-details-label-order-${1}`
          }
        >
          Pedido
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Fulana
        </h3>
        <h3
          data-testid={ `customer_orders__element-order-date-${1}` }
        >
          02/08/2022
        </h3>
        <h3
          data-testid={ `customer_order_details_
          _element-order-details-label-delivery-status` }
        >
          Entregue
        </h3>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
        >
          Marcar como Entregue
        </button>
      </div>
    </div>
  );
}
