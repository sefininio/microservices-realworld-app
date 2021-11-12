import { Button } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ConfigContext } from '../../context/routesContext';
import { useUserDetails } from '../../hooks';
import {
  LogoutAction,
  loginStateChangedAction,
  setUserDetailsAction,
} from '../../store/authSlice';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  StyledAppBar,
  StyledEmail,
  StyledMenuItem,
  StyledToolbar,
  ToolbarInnerContainer,
} from './header.styled';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { userData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { clearToken } = useContext(ConfigContext);

  const [
    { data: userDataFetched, loading, error },
    fetchUserDetails,
  ] = useUserDetails();

  const userToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!userToken) {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (userToken || isUserLoggedIn) {
      // isUserLoggedIn is used to re-render the component via redux after login.
      // userToken is used on refresh - token exists but isUserLoggedIn is false.
      // user logged in - get details
      fetchUserDetails();
    }
  }, [userToken, isUserLoggedIn, fetchUserDetails]);

  useEffect(() => {
    if (userDataFetched) {
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      dispatch(setUserDetailsAction(userDataFetched));
    }
  }, [userDataFetched, dispatch]);

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    dispatch(LogoutAction());
    clearToken();
    history.push('/login');
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar variant="dense">
        <ToolbarInnerContainer>
          {userToken && (
            <>
              <StyledMenuItem component={NavLink} to="/home">
                Home
              </StyledMenuItem>
              <StyledMenuItem component={NavLink} to="/publish">
                Publish
              </StyledMenuItem>
            </>
          )}
          {!userToken && (
            <>
              <StyledMenuItem component={NavLink} to="/login">
                Login
              </StyledMenuItem>
              <StyledMenuItem component={NavLink} to="/register">
                Register
              </StyledMenuItem>
            </>
          )}
        </ToolbarInnerContainer>
        <ToolbarInnerContainer>
          {userToken && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={logoutHandler}
              >
                Logout
              </Button>
              <StyledEmail>{userData?.email}</StyledEmail>
            </>
          )}
        </ToolbarInnerContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;
