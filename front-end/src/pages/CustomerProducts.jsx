import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import { requestData } from '../services/requests';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataUser = JSON.parse(localStorage.getItem('user'));
  const { name } = dataUser;
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState('0.00');

  const validateToken = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const pricePerQuantity = (arr) => (
    arr.reduce((acc, curr) => (curr.quantity * +curr.price) + acc, 0)
  );

  const totalPriceCalc = (id, value) => {
    const productsArray = [...products];
    const indexProduct = productsArray.findIndex((element) => element.id === id);
    productsArray[indexProduct].quantity = value;
    setProducts([...productsArray]);
    setTotalPrice(pricePerQuantity(productsArray).toFixed(2));
    localStorage.setItem('cart', JSON.stringify(products));
    localStorage.setItem('totalPrice', totalPrice);
  };

  const setCartFromLocalStorate = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      return localStorage.setItem('cart', JSON.stringify([]));
    }
    setTotalPrice(pricePerQuantity(cart).toFixed(2));

    return setProducts(cart);
  };

  const getAllProducts = async () => {
    const allProducts = await requestData('/products');
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (!cartStorage || cartStorage.length === 0) {
      const newProducts = allProducts.map((product) => ({ ...product, quantity: 0 }));
      setProducts(newProducts);
      setIsLoading(false);
      return newProducts;
    }
    setIsLoading(false);
    return products;
  };

  useEffect(() => {
    setCartFromLocalStorate();
    getAllProducts();
    validateToken();
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
        userName={ name }
      />
      <div>
        <button
          type="button"
          onClick={ () => {
            localStorage.setItem('cart', JSON.stringify(products));
            localStorage.setItem('totalPrice', totalPrice);
            navigate('/customer/checkout');
          } }
          data-testid="customer_products__button-cart"
          disabled={ totalPrice === '0.00' }
        >
          Ver carrinho: R$
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {totalPrice.toString().replace('.', ',')}
          </span>
        </button>
        { isLoading ? <h3>Carregando...</h3>
          : products.map((product) => (
            <ProductsCard
              key={ product.id }
              id={ product.id }
              price={ product.price }
              image={ product.urlImage }
              title={ product.name }
              quantity={ product.quantity }
              totalPriceCalc={ totalPriceCalc }
            />
          ))}
      </div>
    </div>
  );
}
