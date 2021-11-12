import { UserDto } from '@microservices-realworld-example-app/models';
import { Button } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  StyledPaper,
  StyledTextField,
} from '../../components/components.styled';
import { StyledButtonBar, StyledLoginLink } from './register.styled';
import { ConfigContext } from '../../context/routesContext';
import { useLoginUser, useRegisterUser } from '../../hooks';
import {
  loginStateChangedAction,
  setUserDetailsAction,
} from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const [registerFormData, setRegisterFormData] = useState({} as UserDto);
  const { setToken: setTokenInHeaders } = React.useContext(ConfigContext);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [{ data: registerData }, registerUser] = useRegisterUser();
  const [{ data: loginData }, loginUser] = useLoginUser();

  const handleSubmit = () => {
    registerUser({ data: { ...registerFormData } });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (registerData) {
      dispatch(setUserDetailsAction(registerData));
      loginUser({
        data: { username: registerData.email, password: registerData.password },
      });
    }
  }, [registerData, history, dispatch, loginUser]);

  useEffect(() => {
    if (loginData) {
      const { access_token: token } = loginData;
      localStorage.setItem('access_token', token);
      setTokenInHeaders(token);
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      history.push('/home');
    }
  }, [loginData, history, dispatch, setTokenInHeaders]);

  return (
    <StyledPaper>
      <form>
        <StyledTextField
          name="username"
          variant="outlined"
          label="Username"
          fullWidth
          onChange={handleInputChange}
        />
        <StyledTextField
          name="email"
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
            Register!
          </Button>
          <StyledLoginLink to="/login">Already registered? Login!</StyledLoginLink>
        </StyledButtonBar>
      </form>
    </StyledPaper>
  );
}

export default Register;
