import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import api from '../services/requests';
import responseMock,
{ responseMockCreate, responseMockDelete } from './helpers/adminMock';

describe('testando a tela de administrador', () => {
  beforeEach(() => jest.mock('../services/requests'));

  const admInputName = 'admin_manage__input-name';
  const admInputEmail = 'admin_manage__input-email';
  const admInputPassword = 'admin_manage__input-password';
  const admBtnRegister = 'admin_manage__button-register';
  const route = '/admin/manage';
  const validEmail = 'valid@email.com';

  it('Verifica se todos os elementos aparecem corretamente na tela', () => {
    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    const inputName = screen.getByTestId(admInputName);
    const inputEmail = screen.getByTestId(admInputEmail);
    const inputPassword = screen.getByTestId(admInputPassword);
    const btnRegister = screen.getByTestId(admBtnRegister);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it(`Verifica se o botão de cadastro esta inicialmente desabilitado,
   e não se habilita passados dados incorretos`, () => {
    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    const inputName = screen.getByTestId(admInputName);
    const inputEmail = screen.getByTestId(admInputEmail);
    const inputPassword = screen.getByTestId(admInputPassword);
    const btnRegister = screen.getByTestId(admBtnRegister);
    const invalidName = 'invalidName';

    expect(btnRegister).toBeDisabled();

    userEvent.type(inputName, invalidName);
    userEvent.type(inputEmail, 'invalidEmail');
    userEvent.type(inputPassword, '');

    expect(btnRegister).toBeDisabled();
  });

  it('Verifica se o botão de cadastro é habilitado passados dados corretos', () => {
    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    const inputName = screen.getByTestId(admInputName);
    const inputEmail = screen.getByTestId(admInputEmail);
    const inputPassword = screen.getByTestId(admInputPassword);
    const btnRegister = screen.getByTestId(admBtnRegister);
    const validName = 'validUserName123';

    expect(btnRegister).toBeDisabled();

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '123456');

    expect(btnRegister).not.toBeDisabled();
  });

  it('Verifica se os usuários cadastrados são mostrados corretamente', async () => {
    localStorage.setItem('token', 'validToken');
    api.get = jest.fn().mockResolvedValue(responseMock);

    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      screen.getByRole('columnheader', {
        name: /fulana pereira/i,
      });
    });

    const deleteBtn = screen.getAllByRole('button', {
      name: /excluir/i,
    });

    const seller = screen.getByRole('columnheader', {
      name: /fulana pereira/i,
    });
    const customer = screen.getByRole('columnheader', {
      name: /cliente zé birita/i,
    });

    expect(seller).toBeInTheDocument();
    expect(customer).toBeInTheDocument();
    expect(deleteBtn[0]).toBeInTheDocument();
    expect(deleteBtn.length).toBe(2);
    localStorage.clear();
  });

  it('Verifica se é possível cadastrar um novo usuário', async () => {
    localStorage.setItem('token', 'validToken');
    api.get = jest.fn()
      .mockResolvedValueOnce(responseMock).mockResolvedValueOnce(responseMockCreate);
    api.post = jest.fn().mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    const inputName = screen.getByTestId(admInputName);
    const inputEmail = screen.getByTestId(admInputEmail);
    const inputPassword = screen.getByTestId(admInputPassword);
    const btnRegister = screen.getByTestId(admBtnRegister);
    const validName = 'validUserName123';

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, '123456');
    userEvent.click(btnRegister);

    await waitFor(() => {
      expect(screen.getByRole('columnheader', {
        name: /validUserName123/i,
      }))
        .toBeInTheDocument();
    });
    localStorage.clear();
  });

  it('Verifica se é possível deletar um usuário', async () => {
    localStorage.setItem('token', 'validToken');
    api.get = jest.fn()
      .mockResolvedValueOnce(responseMock).mockResolvedValueOnce(responseMockDelete);
    api.delete = jest.fn().mockResolvedValue({ data: {} });

    render(
      <MemoryRouter initialEntries={ [route] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('admin_manage__element-user-table-name-1'))
        .toBeInTheDocument();
    });
    const deleteBtn = screen.getAllByRole('button', {
      name: /excluir/i,
    });

    await act(() => {
      userEvent.click(deleteBtn[1]);
    });

    await waitFor(() => {
      screen.getByTestId('admin_manage__element-user-table-name-0');
    });

    expect(api.get).toHaveBeenCalledTimes(2);

    localStorage.clear();
  });
});
