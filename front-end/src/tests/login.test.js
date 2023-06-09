import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import api from '../services/requests';
// import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de login', () => {
  const emailInputId = 'common_login__input-email';
  const passwordInputId = 'common_login__input-password';
  const loginBtnId = 'common_login__button-login';
  const singUpBtnId = 'common_login__button-register';

  beforeEach(() => jest.mock('../services/requests'));
  // afterEach(() => jest.mockRestore());
  // api.get.mockresolvedvalue()

  it('Verifica se os inputs aparecem corretamente', () => {
    render(<App />, { wrapper: BrowserRouter });

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);
    const singUpBtn = screen.getByTestId(singUpBtnId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(singUpBtn).toBeInTheDocument();
  });

  it(`Verifica se o botão de login está inicialmente desabilitado,
   e não se habilita passando dados incorretos`, () => {
    render(<App />, { wrapper: BrowserRouter });

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);

    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, 'invalidEmail');
    userEvent.type(inputPassword, '');

    expect(loginBtn).toBeDisabled();
  });

  it('Verifica se o botão de login é habilitado quando passados dados corretos', () => {
    render(<App />, { wrapper: BrowserRouter });

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(inputEmail, 'validEmail@email.com');
    userEvent.type(inputPassword, '123456');

    expect(loginBtn).not.toBeDisabled();
  });

  it(`Verifica se aparece uma mensagem de error,
   ao fazer login com usuário inexistente`, async () => {
    api.post = jest.fn().mockRejectedValue({});
    render(<App />, { wrapper: BrowserRouter });

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(inputEmail, 'validEmail@email.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('common_login__element-invalid-email'))
        .toBeInTheDocument();
    });
  });

  it(`Verifica se é possível fazer login com um usuário cadastrado como administrador,
   e é redirecionado para tela de adm`, async () => {
    const responseMock = { data: { token: 'validToken', role: 'administrator' } };
    api.post = jest.fn().mockResolvedValue(responseMock);
    api.get = jest.fn().mockResolvedValue(responseMock);
    // api.post.mockResolvedValue(responseMock);
    // jest.spyOn(api, 'post').mockResolvedValue(responseMock);
    // jest.spyOn(api, 'get').mockResolvedValue(responseMock);
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(inputEmail, 'adm@deliveryapp.com');
    userEvent.type(inputPassword, '--adm2@21!!--');
    userEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /cadastrar novo usuário/i,
      }))
        .toBeInTheDocument();
    });
  });

  it(`Verifica se é possível fazer login com um usuário cadastrado como vendedor,
   e é redirecionado para tela de seller`, async () => {
    const responseMock = { data: { token: 'validToken', role: 'seller' } };
    api.post = jest.fn().mockResolvedValue(responseMock);
    api.get = jest.fn().mockResolvedValue(responseMock);
    // api.post.mockResolvedValue(responseMock);
    // jest.spyOn(api, 'post').mockResolvedValue(responseMock);
    // jest.spyOn(api, 'get').mockResolvedValue(responseMock);
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByTestId(emailInputId);
    const inputPassword = screen.getByTestId(passwordInputId);
    const loginBtn = screen.getByTestId(loginBtnId);

    userEvent.type(inputEmail, 'seller@deliveryapp.com');
    userEvent.type(inputPassword, '--seller@21!!--');
    userEvent.click(loginBtn);

    await waitFor(() => {
      // elemento da tela de seller:

      // expect(screen.getByRole('heading', {
      //   name: /cadastrar novo usuário/i,
      // }))
      //   .toBeInTheDocument();
    });
  });
});
