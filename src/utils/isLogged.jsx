function isLogged() {
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
  return token ? true : false;
}

export default isLogged;
