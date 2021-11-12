import { UserDto } from '@microservices-realworld-example-app/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userData: UserDto;
  isUserLoggedIn: boolean;
}

interface LoginStateChangedPayloadAction {
  isUserLoggedIn: boolean;
}

const initialState: AuthState = {
  userData: { username: '', email: '', password: '' },
  isUserLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStateChanged: (
      state,
      action: PayloadAction<LoginStateChangedPayloadAction>
    ) => {
      state.isUserLoggedIn = action.payload.isUserLoggedIn;
    },
    setUserDetails: (state, action: PayloadAction<UserDto>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
      state.isUserLoggedIn = false;
    },
  },
});

const { setUserDetails, logout, loginStateChanged } = authSlice.actions;

export {
  setUserDetails as setUserDetailsAction,
  logout as LogoutAction,
  loginStateChanged as loginStateChangedAction,
};

export default authSlice.reducer;
