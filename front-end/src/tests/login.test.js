import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de login', () => {
  const inputEmail = screen.getByTestId('common_login__input-email');
  const inputPassword = screen.getByTestId('common_login__input-password');
  const loginBtn = screen.getByTestId('common_login__button-login');
  const singUpBtn = screen.getByTestId('common_login__button-login');

  it('Verifica se os inputs aparecem corretamente', () => {
    renderWithRouter(<App />);
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(singUpBtn).toBeInTheDocument();
  });
  it(`Verifica se o botão de login está inicialmente desabilitado,
   e não se habilita passando dados incorretos`, () => {
    expect(loginBtn).toBeDisabled();
    userEvent.type(inputEmail, 'invalidEmail');
    userEvent.type(inputPassword, '');
    expect(loginBtn).toBeDisabled();
  });
  it('Verifica se o botão de login é habilitado quando passados dados corretos', () => {
    userEvent.type(inputEmail, 'validEmail@email.com');
    userEvent.type(inputPassword, '123456');
    expect(loginBtn).not.toBeDisabled();
  });
});
