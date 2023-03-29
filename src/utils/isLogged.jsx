function isLogged() {
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'));
  console.log(token ? true : false);
  return token ? true : false;
}

export default isLogged;
