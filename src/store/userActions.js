import request from '../helpers/request';
import * as actionTypes from './userActionTypes';
import requestWithoutToken, {removeJWT, getLocalJWT, saveToken} from './../helpers/auth';

const apiUrl = process.env.REACT_APP_API_URL;
const apiHost = process.env.REACT_APP_API_HOST;

export function register(data, navigate) {
    return function (dispatch) {
      dispatch({ type: actionTypes.PENDING });
      requestWithoutToken(`${apiHost}/user`, "POST", data)
        .then(() => {
          dispatch({
            type: actionTypes.REGISTER_SUCCESS,
          });
          navigate("/login");
        })
        .catch((error) => {
          dispatch({ type: actionTypes.ERROR, error: error.message });
        });
    };
  }
  
  export function login(data, navigate) {
    return function (dispatch) {
      dispatch({ type: actionTypes.PENDING });
      requestWithoutToken(`${apiHost}/user/sign-in`, "POST", data)
        .then((res) => {
          saveToken(res);
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
          });
          navigate("/");
        })
        .catch((error) => {
          dispatch({ type: actionTypes.ERROR, error: error.message });
        });
    };
  }
  
  export function logout(navigate) {
    return async (dispatch) => {
      dispatch({ type: actionTypes.AUTH_LOADING });
      const jwt = getLocalJWT();
      
      if (jwt) {
        request(navigate, `${apiHost}/user/sign-out`, "POST", { jwt })
          .then(() => {
            removeJWT();
            dispatch({ type: actionTypes.LOGOUT_SUCCESS });
            navigate("/login");
          })
          .catch((err) => {
            dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
          });
      } else {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
        navigate("/login");
      }
    };
  }


export function getUserInfo(){

    return (dispatch)=>{
        dispatch({type: actionTypes.AUTH_LOADING});

        request(`${apiUrl}/user`)
        .then(data => {
            dispatch({type: actionTypes.GET_USER_INFO_SUCCESS, userInfo: data});  
        })
        .catch(err => {
            dispatch({type: actionTypes.AUTH_ERROR, error: err.message});  
        });
    }
}