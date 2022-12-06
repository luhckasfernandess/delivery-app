import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { deleteData, requestData, requestLogin, setToken } from '../services/requests';

function Admin() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [allUsers, setAllUsers] = useState([]);
  const [invalidRegisterForm, setInvalidRegisterForm] = useState(true);
  const [failedTryCreate, setFailedTryCreate] = useState(false);

  // const MOCK_TABLE = [{ item: 1, nome: 'Zé', email: 'zé@email.com', tipo: 'Vendedor' },
  //   { item: 2, nome: 'Tadeu', email: 'tadeu@email.com', tipo: 'Comprador' }];

  const verifyRegisterForm = () => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    const minPasswordLength = 6;
    const minUsernameLength = 12;

    if (regex.test(email)
    && password.length >= minPasswordLength
    && username.length > minUsernameLength) {
      setInvalidRegisterForm(false);
    } else {
      setInvalidRegisterForm(true);
    }
  };

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      const users = await requestData('/admin');
      setAllUsers(users);
    } catch (error) {
      return <Navigate to="/" />;
    }
  };
  const accountCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      await requestLogin('/admin/register', { name: username, email, password, role });
      setUserName('');
      setEmail('');
      setPassword('');
      getAllUsers();
    } catch (error) {
      setFailedTryCreate(true);
    }
  };

  const deleteUser = async (e) => {
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      const { target: { value: name } } = e;
      await deleteData('/admin/delete', { name });
      getAllUsers();
    } catch (error) {
      console.log('erro');
    }
  };

  useEffect(() => {
    setFailedTryCreate(false);
    verifyRegisterForm();
  }, [username, email, password]);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section>
      <form>
        <h1>Cadastrar novo usuário</h1>
        <label htmlFor="name-input">
          <input
            type="text"
            value={ username }
            onChange={ ({ target: { value } }) => setUserName(value) }
            data-testid="admin_manage__input-name"
            placeholder="Username"
          />
        </label>
        <label htmlFor="email-input">
          <input
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="admin_manage__input-email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password-input">
          <input
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            data-testid="admin_manage__input-password"
            placeholder="Senha"
          />
        </label>
        <label htmlFor="type-select">
          Tipo:
          <select
            name="type-select"
            id="type-select"
            value={ role }
            data-testid="admin_manage__select-role"
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="administrator">Administrador</option>
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        {
          (failedTryCreate)
            ? (
              <p data-testid="admin_manage__element-invalid-register">
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                }
              </p>
            )
            : null
        }
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          onClick={ (event) => accountCreate(event) }
          disabled={ invalidRegisterForm }
        >
          Cadastrar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {(allUsers.length !== 0)
          && allUsers.map((data, index) => (
            <tr key={ data.item }>
              <th
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {data.id}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {data.name}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {data.email}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {data.role}
              </th>
              <th
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
              >
                <button
                  type="button"
                  value={ data.name }
                  onClick={ (e) => deleteUser(e) }
                >
                  Excluir
                </button>
              </th>
            </tr>))}
        </tbody>
      </table>
    </section>

  );
}

export default Admin;
