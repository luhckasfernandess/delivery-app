import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataUser = JSON.parse(localStorage.getItem('user'));
  const { name } = dataUser;
  const navigate = useNavigate();

  const validateToken = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    validateToken()
  }, [])
 return(
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
    {isLoading ? <h3>Carregando...</h3> 
    : orders.map((order) => (
      <OrderCard
        key={ order.id }
        id={ order.id }
        status={ order.status }
        date={ order.date }
        price={ order.price }
      />
    ))
    }
 </div>
 )
}