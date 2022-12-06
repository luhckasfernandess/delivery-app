import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import deliveryLogo from '../images/rockGlass.svg';
import { requestLogin } from '../services/requests';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [invalidRegisterForm, setInvalidRegisterForm] = useState(true);
  const [failedTryCreate, setFailedTryCreate] = useState(false);

  const verifyRegisterForm = () => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    const minPasswordLength = 6;
    const minNameLength = 12;

    if (regex.test(email)
    && password.length >= minPasswordLength
    && name.length >= minNameLength) {
      setInvalidRegisterForm(false);
    } else {
      setInvalidRegisterForm(true);
    }
  };

  const accountCreate = async (e) => {
    e.preventDefault();
    try {
      await requestLogin('/register', { name, email, password });
      setIsCreated(true);
    } catch (error) {
      setFailedTryCreate(true);
      setIsCreated(false);
    }
  };

  useEffect(() => {
    setFailedTryCreate(false);
    verifyRegisterForm();
  }, [name, email, password]);

  if (isCreated) {
    return <Navigate to="/customer/products" />;
  }

  return (
    <section className="user-register-area">
      <img src={ deliveryLogo } alt="Delivery App Logo" />
      <form>
        <h1>Cadastro</h1>
        <label htmlFor="name-input">
          <input
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            data-testid="common_register__input-name"
            placeholder="Username"
          />
        </label>
        <label htmlFor="email-input">
          <input
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="common_register__input-email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid="common_register__input-password"
            placeholder="Senha"
          />
        </label>
        {
          (failedTryCreate)
            ? (
              <p data-testid="common_register__element-invalid_register">
                {
                  `O endereço de e-mail ou o username já estão sendo usados.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          data-testid="common_register__button-register"
          type="submit"
          onClick={ (event) => accountCreate(event) }
          disabled={ invalidRegisterForm }
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}

export default Register;
