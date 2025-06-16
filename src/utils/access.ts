const isAdmin = ({ req }) => {
  return req.user?.roles?.some(role => role === 'admin');
};

const isLogin = ({ req }) => {
  return !!req.user;
};

const isAuthor = ({ req, data }) => {
  return data?.author === req?.user?.id;
};

export { isAdmin, isLogin, isAuthor };
