import { PayloadRequest } from "payload";

const isAdmin = ({ req }: { req: PayloadRequest }) => {
  return req.user?.roles?.some(role => role === 'admin') || false;
};

const isLogin = ({ req }: { req: PayloadRequest }) => {
  return !!req.user;
};

const isAuthor = ({ req, data }) => {
  return data?.author === req?.user?.id;
};

export { isAdmin, isLogin, isAuthor };
