import decode from 'jwt-decode';
import { store } from '../store/store';
import { LOGOUT_SUCCESS } from '../store/actionTypes';
import { history } from './history';

export default function requestWithoutToken(url, method = 'GET', body) {
  const config = {
    method: method,
    headers: {
      'content-Type': 'application/json',
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config).then(async (response) => {
    const res = await response.json();
    //   console.log('res', res)

    if (response.status >= 400 && response.status < 600) {
      if (res.error) {
        throw res.error;
      } else {
        throw new Error('Something went wrong');
      }
    }
    console.log('res 555', res);
    return res;
  });
}

export const getToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const parsedToken = JSON.parse(token);
    const decoded = decode(parsedToken.jwt);

    if (decoded.exp - new Date().getTime() / 1000 > 60) {
      return Promise.resolve(parsedToken.jwt);
    } else {
      const apiHost = process.env.REACT_APP_API_HOST;
      return requestWithoutToken(
        `${apiHost}/user/${decoded.userId}/token`,
        'PUT',
        {
          refreshToken: parsedToken.refreshToken,
        }
      )
        .then((token) => {
          saveToken(token);
          return token.jwt;
        })
        .catch(() => {
          logout();
        });
    }
  } else {
    logout();
  }
};

export function saveToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function logout() {
  localStorage.removeItem('token');
  store.dispatch({ type: LOGOUT_SUCCESS });
  history.push('/login');
}

export function checkLoginStatus() {
  return !!localStorage.getItem('token');
}

export function removeJWT() {
  localStorage.removeItem('token');
}

export function getJWT() {
  const token = localStorage.getItem('token');
  if (!token) {
    logout();
    return null;
  }
}

export function getLocalJWT() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
}
