

const validLogin = {
  id: 1,
  name: 'Jon Doe',
  email: 'jondoe@email.com',
  password: 'JonDoe',
}

const userRegistered = { ...validLogin, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
  validLogin,
  userRegistered,
}