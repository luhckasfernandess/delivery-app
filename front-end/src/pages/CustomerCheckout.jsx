import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerCheckout() {
  const takeEachProducts = localStorage.getItem('cart');
  const objProducts = JSON.parse(takeEachProducts);
  let count = 0;

  const navigate = useNavigate();
  const [products, setProducts] = useState(objProducts);
  const [sellers, setSellers] = useState([]);
  const [sendInfo, setsendInfo] = useState({
    Vendedor: 2,
    Endereco: '',
    Numero: 0,
    Produtos: [],
    User: JSON.parse(localStorage.getItem('user')),
  });

  const takeAllSellers = async () => {
    const allSellers = await fetch('http://localhost:3001/sellers');
    const allSellersJson = await allSellers.json();
    setSellers(allSellersJson);
  };
  const getCartProduct = () => {
    const filter = products.filter((item) => item.quantity > 0);
    setsendInfo({
      ...sendInfo,
      Produtos: filter,
    });
  };

  const removeProduct = (e) => {
    objProducts[e].quantity = 0;
    localStorage.setItem('cart', JSON.stringify(objProducts));
    setProducts(objProducts);
  };

  const totalPrice = () => {
    const total = products.reduce((acc, item) => {
      if (item.quantity) acc += item.price * item.quantity;
      return acc;
    }, 0);
    return total.toFixed(2);
  };

  const handleChange = (e) => {
    setsendInfo({
      ...sendInfo,
      [e.target.name]: e.target.value,
    });
  };

  const checkout = async (body) => {
    body.totalPrice = totalPrice();
    fetch('http://localhost:3001/checkout', {
      method: 'post',
      headers: {
        Authorization: body.User.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((id) => navigate(`/customer/order/${id}`))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCartProduct();
  }, [products]);
  useEffect(() => {
    getCartProduct();
    takeAllSellers();
  }, []);

  return (
    <div>
      Checkout
      <table width="100%" border="1">
        <thead>
          <tr>
            <th>item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => {
            if (item.quantity > 0) {
              count += 1;
              return (
                <tr
                  // dataTestId={`element_order_table-customer-sale-product-${i}`}
                  key={ i }
                >
                  <td>{count}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    R$
                    {item.price}
                  </td>
                  <td>
                    R$
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td>
                    <button type="button" onClick={ () => removeProduct(i) }>
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
      <p>
        Total R$:
        {totalPrice()}
      </p>
      <h1>Detalhes da entrega</h1>
      <div>
        <label htmlFor="Vendedor">
          Vendedor
          <select name="Vendedor" onChange={ handleChange }>
            {sellers.map((item, i) => (
              <option key={ i } value={ item.id }>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="Endereco">
          Endereço
          <input
            type="text"
            name="Endereco"
            onChange={ handleChange }
            value={ sendInfo.Endereco }
          />
        </label>
      </div>
      <div>
        <label htmlFor="Numero">
          Numero
          <input
            type="number"
            name="Numero"
            onChange={ handleChange }
            value={ sendInfo.Numero }
          />
        </label>
      </div>
      <button type="button" onClick={ () => checkout(sendInfo) }>FINALIZAR PEDIDO</button>
    </div>
  );
}
