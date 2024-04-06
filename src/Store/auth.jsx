import { configureStore, createSlice } from "@reduxjs/toolkit";
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        token: null,
        take:null,
        userFullName: null,
        loading: false,
        error: null,
        success: null,
        isAuthenticated: false,
        menu: [],
        notification: {
          loading: false,
          type: null,
          message: null,
        },
        refreshToken: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return {
      token: null,
      take:null,
      userFullName: null,
      loading: false,
      error: null,
      success: null,
      isAuthenticated: false,
      menu: [],
      notification: {
        loading: false,
        type: null,
        message: null,
      },
      refreshToken: null,
    };
  }
};

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (error) {
    // Handle potential errors here
  }
};
const auth = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    loginStart: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token, refreshtoken, userFullName, menu,take } = action.payload;
      state.token = token;
      state.userFullName = userFullName;
      state.take=take
      state.loading = false;
      state.error = null;
      state.success = null;
      state.menu = menu;
      state.notification = {
        loading: false,
        type: null,
        message: null,
      };
      state.isAuthenticated = true;
      state.refreshToken = refreshtoken;
      saveToLocalStorage(state);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetTokens: (state, action) => {
      const { accestoken, refreshToken } = action.payload;
      state.token = accestoken;
      state.refreshToken = refreshToken;
      saveToLocalStorage(state);
    },
    changeMenu: (state, action) => {
      const { menu } = action.payload;
      state.menu = menu;
    },
    logout: state => {
      state.token = null;
      state.refreshToken = null;
      state.userFullName = null;
      state.loading = false;
      state.error = null;
      state.take=null;
      state.success = null;
      state.isAuthenticated = false;
      state.menu = [];
      state.notification = {
        loading: false,
        type: null,
        message: null,
      };
      saveToLocalStorage(state);
    },
    changeNot: (state, action) => {
      const { message } = action.payload;
      state.error = message;
    },
    changeSuccess: (state, action) => {
      const { message } = action.payload;
      state.success = message;
    },
    changeToast: (state, action) => {
      const { loading, type, message } = action.payload;
      state.notification.loading = loading;
      state.notification.type = type;
      state.notification.message = message;
      saveToLocalStorage(state);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  changeMenu,
  resetTokens,
  changeNot,
  changeSuccess,
  changeToast,
} = auth.actions;

export default configureStore({ reducer: { auth: auth.reducer } });
