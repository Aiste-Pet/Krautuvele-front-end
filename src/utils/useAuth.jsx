import { createAuthProvider } from 'react-token-auth';

const session = { accessToken: '', refreshToken: '' };

export const { useAuth, authFetch, login, logout } = createAuthProvider({
  // Extract the access token from the session object
  getAccessToken: (session) => session.access_token,

  // Use localStorage to store the token
  storage: localStorage,

  // Handle token updates
  onUpdateToken: (token) =>
    fetch('/update-token', {
      method: 'POST',
      body: token.refreshToken,
    }).then((r) => r.json()),

  // Pass the session object
  ...session,
});
