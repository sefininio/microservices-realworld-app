import { UserDto } from '@microservices-realworld-example-app/models';
import { Button } from '@mui/material';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory } from 'react-router';
import {
  StyledPaper,
  StyledTextField,
} from '../../components/components.styled';
import { StyledButtonBar, StyledRegisterLink } from './login.styled';
import { useLoginUser } from '../../hooks';
import { useAppDispatch } from '../../store/hooks';
import { loginStateChangedAction } from '../../store/authSlice';
import { ConfigContext } from '../../context/routesContext';


/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [loginFormData, setLoginFormData] = useState({} as UserDto);
  const { setToken: setTokenInHeaders } = React.useContext(ConfigContext);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [{ data: loginData, loading, error }, loginUser] = useLoginUser();

  const handleSubmit = () => {
    loginUser({ data: {...loginFormData} })
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loginData) {
      localStorage.setItem('access_token', loginData.access_token);
      setTokenInHeaders(loginData.access_token);
      dispatch(loginStateChangedAction({isUserLoggedIn: true}));
      history.push('/home');
    }
  }, [loginData, history, dispatch, setTokenInHeaders]);

  // show spinner while loading
  // handle error
  return (
    <StyledPaper>
      <form>
        <StyledTextField
          name="username"
          variant="outlined"
          label="Email"
          fullWidth
          onChange={handleInputChange}
        />
        <StyledTextField
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          onChange={handleInputChange}
        />
        <StyledButtonBar>
          <Button variant="contained" onClick={handleSubmit}>
            Log me In!
          </Button>
          <StyledRegisterLink to="/register">Not registered yet?</StyledRegisterLink>
        </StyledButtonBar>
      </form>
    </StyledPaper>
  );
}

export default Login;
