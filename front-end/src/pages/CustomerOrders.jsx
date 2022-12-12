import { useEffect } from "react";
import NavBar from "../components/NavBar";

export default function CustomerOrders() {
  // const dataUser = JSON.parse(localStorage.getItem('user'));
  // const { name } = dataUser;

  const validateToken = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    
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
    userName={ 'fulano' }
    />
 </div>
 )
}