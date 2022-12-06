import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
// import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de registro', () => {
  const inputUserNameId = 'common_register__input-name';
  const inputEmailId = 'common_register__input-email';
  const inputPasswordID = 'common_register__input-password';
  // const singUpBtnId = 'common_login__button-register';

  it('Verifica se os inputs aparecem corretamente', async () => {
    // renderWithRouter(<App />);
    // render(<App />, { wrapper: BrowserRouter });
    // const singUpBtn = screen.getByTestId(singUpBtnId);
    // userEvent.click(singUpBtn);
    // await waitFor(() => {
    //   screen.getByTestId(inputUserNameId);
    // });
    render(
      <MemoryRouter initialEntries={ ['/register'] }>
        <App />
      </MemoryRouter>,
    );
    const inputUsername = screen.getByTestId(inputUserNameId);
    const inputEmail = screen.getByTestId(inputEmailId);
    const inputPassword = screen.getByTestId(inputPasswordID);
    expect(inputUsername).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it(`Verifica se o botão de cadastrar está inicialmente desabilitado,
   e não se habilita passando dados incorretos`, async () => {
    // render(<App />, { wrapper: BrowserRouter });
    // const singUpBtn = screen.getByTestId(singUpBtnId);
    // userEvent.click(singUpBtn);
    // await waitFor(() => {
    //   screen.getByTestId(inputUserNameId);
    // });
    render(
      <MemoryRouter initialEntries={ ['/register'] }>
        <App />
      </MemoryRouter>,
    );
    const inputUsername = screen.getByTestId(inputUserNameId);
    const inputEmail = screen.getByTestId(inputEmailId);
    const inputPassword = screen.getByTestId(inputPasswordID);
    const registerBtn = screen.getByTestId('common_register__button-register');
    const invalidUsername = 'lessThan12';
    // expect(registerBtn).toBeDisabled();
    userEvent.type(inputUsername, invalidUsername);
    userEvent.type(inputEmail, 'invalidEmail');
    userEvent.type(inputPassword, '');
    expect(registerBtn).toBeDisabled();
  });

  it(`Verifica se o botão de cadastrar é habilitado,
   quando passados dados corretos`, async () => {
    // render(<App />, { wrapper: BrowserRouter });
    // const singUpBtn = screen.getByTestId(singUpBtnId);
    // userEvent.click(singUpBtn);
    // await waitFor(() => {
    //   screen.getByTestId(inputUserNameId);
    // });
    render(
      <MemoryRouter initialEntries={ ['/register'] }>
        <App />
      </MemoryRouter>,
    );
    const inputUsername = screen.getByTestId(inputUserNameId);
    const inputEmail = screen.getByTestId(inputEmailId);
    const inputPassword = screen.getByTestId(inputPasswordID);
    const registerBtn = screen.getByTestId('common_register__button-register');
    userEvent.type(inputUsername, 'ValidUsername123');
    userEvent.type(inputEmail, 'validEmail@email.com');
    userEvent.type(inputPassword, '123456');
    expect(registerBtn).not.toBeDisabled();
  });
});
