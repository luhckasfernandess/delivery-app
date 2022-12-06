import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de login', () => {
  const emailInputId = 'common_login__input-email';
  const passwordInputId = 'common_login__input-password';
  const loginBtnId = 'common_login__button-login';
  const singUpBtnId = 'common_login__button-register';

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
});
