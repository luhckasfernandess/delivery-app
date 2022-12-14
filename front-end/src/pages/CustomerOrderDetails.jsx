import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TableOrder from '../components/TableOrder';
import { requestData } from '../services/requests';

export default function CustomerOrdersDetails() {
  const cartProducts = JSON.parse(localStorage.getItem('cart'));
  const dataUser = JSON.parse(localStorage.getItem('user'));
  const [orderDetails, setOrderDetails] = useState({});
  const { name } = dataUser;
  const location = useLocation();
  const testId = 'customer_order_details__element-order-details-label-delivery-status';

  const getOrdeDetails = async () => {
    const id = location.pathname.split('/')[3];
    const details = await requestData(`/details/${id}`);
    setOrderDetails(details);
  };

  const totalPrice = () => {
    const total = cartProducts.reduce((acc, item) => {
      if (item.quantity) acc += item.price * item.quantity;
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  useEffect(() => {
    getOrdeDetails();
  }, []);

  //   {
  //     "saleDate": "14/12/2022",
  //     "id": 1,
  //     "userId": 3,
  //     "sellerId": 2,
  //     "totalPrice": "12.00",
  //     "deliveryAddress": null,
  //     "deliveryNumber": null,
  //     "status": "pendente",
  //     "seller": {
  //         "name": "Fulana Pereira"
  //     }
  // }

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
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`Pedido ${orderDetails.id}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {orderDetails.seller && orderDetails.seller.name}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {orderDetails.saleDate}
        </h3>
        <h3
          data-testid={ testId }
        >
          {orderDetails.status}
        </h3>
        <button
          data-testid="customer_order_details__button-delivery-check"
          disabled={ orderDetails.status !== 'entregue' }
          type="button"
        >
          Marcar como Entregue
        </button>
        <TableOrder
          products={ cartProducts }
        />
        <p data-testid="customer_order_details__element-order-total-price">
          {totalPrice().replace('.', ',')}
        </p>
      </div>
    </div>
  );
}
