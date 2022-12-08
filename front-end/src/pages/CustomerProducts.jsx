import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import { requestData } from '../services/requests';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    requestData('/products')
      .then((resp) => resp) // funçao fora chamada no useEfect
      .then((data) => setProducts(data));
    setIsLoading(false);
  }, []);

  return (
    <div>
      <NavBar
        path1="/customer/products"
        dataTestid1="customer_products__element-navbar-link-products"
        item1="PRODUTOS"
        path2="/customer/orders"
        dataTestid2="customer_products__element-navbar-link-orders"
        item2="MEUS PEDIDOS"
        userName="Zé Birita"
      />
      <div>
        { isLoading ? <h3>Carregando...</h3>
          : products.map((product) => (
            <ProductsCard
              key={ product.id }
              id={ product.id }
              price={ product.price }
              image={ product.urlImage }
              title={ product.name }
            />
          ))}
      </div>
    </div>
  );
}
