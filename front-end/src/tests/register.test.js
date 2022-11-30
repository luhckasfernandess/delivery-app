import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de registro', () => {
  const inputUsername = screen.getByTestId('common_register__input-name');
  const inputEmail = screen.getByTestId('common_register__input-email');
  const inputPassword = screen.getByTestId('common_register__input-password');
  const singUpBtn = screen.getByTestId('common_register__button-register');

  it('Verifica se os inputs aparecem corretamente', () => {
    renderWithRouter(<App />);
    expect(inputUsername).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(singUpBtn).toBeInTheDocument();
  });
  it(`Verifica se o botão de cadastrar está inicialmente desabilitado,
   e não se habilita passando dados incorretos`, () => {
    const invalidUsername = 'lessThan12';
    expect(singUpBtn).toBeDisabled();
    userEvent.type(inputUsername, invalidUsername);
    userEvent.type(inputEmail, 'invalidEmail');
    userEvent.type(inputPassword, '');
    expect(singUpBtn).toBeDisabled();
  });
  it(`Verifica se o botão de cadastrar é habilitado,
   quando passados dados corretos`, () => {
    userEvent.type(inputUsername, 'ValidUsername123');
    userEvent.type(inputEmail, 'validEmail@email.com');
    userEvent.type(inputPassword, '123456');
    expect(loginBtn).not.toBeDisabled();
  });
});
