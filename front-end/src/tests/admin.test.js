import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('testando a tela de administrador', () => {
  const admInputName = 'admin_manage__input-name';
  const admInputEmail = 'admin_manage__input-email';
  const admInputPassword = 'admin_manage__input-password';
  const admBtnRegister = 'common_register__button-register';
  const route = '/admin/manage';
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
    userEvent.type(inputEmail, 'valid@email.com');
    userEvent.type(inputPassword, '123456');

    expect(btnRegister).not.toBeDisabled();
  });
});
