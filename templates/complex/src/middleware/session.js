import session from "koa-session";

/**
 * 配置 session 中间件
 * https://github.com/koajs/session
 */
export default (app) => {
  const sessionConf = app.config.session || {};
  return session(sessionConf, app);
};
