const isAuthSelector = (state) => state.auth.isAuth;
const authStatusSelector = (state) => state.auth.status;
const authErrorSelector = (state) => state.auth.error;
const currentUserSelector = (state) => state.auth.user;

export {
  isAuthSelector,
  authStatusSelector,
  authErrorSelector,
  currentUserSelector,
};
