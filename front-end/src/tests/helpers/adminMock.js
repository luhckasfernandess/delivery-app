const nomeFulana = 'Fulana Pereira';
const emailFulana = 'fulana@deliveryapp.com';

export const responseMockCreate = { data: [
  {
    id: 2,
    name: nomeFulana,
    email: emailFulana,
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  }, {
    id: 4,
    name: 'validUserName123',
    email: 'valid@email.com',
    password: '123456',
    role: 'customer',
  },
] };

export const responseMockDelete = { data: [
  {
    id: 2,
    name: nomeFulana,
    email: emailFulana,
    role: 'seller',
  },
] };

export default { data: [
  {
    id: 2,
    name: nomeFulana,
    email: emailFulana,
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
  },
] };
