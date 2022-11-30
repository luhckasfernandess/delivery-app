import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import deliveryLogo from '../images/rockGlass.svg';
import { requestData, requestLogin, setToken } from '../services/requests';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [invalidLoginForm, setInvalidLoginForm] = useState(true);
  const [roleData, setRoleData] = useState('');
  const navigate = useNavigate();

  const verifyLoginForm = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minPasswordLength = 6;
    if (regex.test(email) && password.length >= minPasswordLength) {
      setInvalidLoginForm(false);
    } else {
      setInvalidLoginForm(true);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const { token } = await requestLogin('/login', { email, password });

      setToken(token);

      const { role } = await requestData('/login/validate', { email, password });

      localStorage.setItem('token', token);
      setRoleData(role);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
    verifyLoginForm();
  }, [email, password]);

  if (isLogged) {
    if (roleData === 'administrator') {
      return <Navigate to="/admin/manage" />;
    }
    if (roleData === 'seller') {
      return <Navigate to="/seller/orders" />;
    }
    if (roleData === 'customer') {
      return <Navigate to="/customer/products" />;
    }
  }

  return (
    <section className="user-login-area">
      <img src={ deliveryLogo } alt=" Logo" />
      <form>
        <h1>Login</h1>
        <label htmlFor="email-input">
          <input
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="common_login__input-email"
            placeholder="Login"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid="common_login__input-password"
            placeholder="Senha"
          />
        </label>
        {
          (failedTryLogin)
            ? (
              <p data-testid="common_login__element-invalid-email">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          data-testid="common_login__button-login"
          type="submit"
          onClick={ (event) => login(event) }
          disabled={ invalidLoginForm }
        >
          Entrar
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </section>
  );
}

export default Login;
