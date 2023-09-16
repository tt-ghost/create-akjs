export default (app) => {
  const { config } = app;
  const { NODE_ENV } = process.env;
  config.project = {};
  config.router = {
    prefix: "/api",
  };
  config.middleware = ["error", "body-parser", "session", "favicon"];

  // https://github.com/koajs/bodyparser#options
  config.bodyParser = {
    // 表单大小
    formLimit: "1mb",
  };

  // db config
  config.db = {
    database: "akjs_example",
    user: "root",
    password: "12345678",
    option: {
      port: 3306,
      host: "127.0.0.1",
      connectTimeout: 30 * 1000,
      dialect: "mysql",
    },
  };

  // https://github.com/koajs/session
  config.session = {
    key: "akjs_example",
    maxAge: 1000 * 60 * 60 * 24,
    // (boolean) automatically commit headers (default true
    autoCommit: true,
    // (boolean) can overwrite or not (default true)
    overwrite: true,
    // (boolean) httpOnly or not (default true)
    httpOnly: true,
    // (boolean) signed or not (default true)
    signed: true,
    rolling: false,
    renew: false,
    cookie: {
      maxAge: "", // cookie有效时长
      expires: "", // cookie失效时间
      path: "/", // 写cookie所在的路径
      domain: "", // 写cookie所在的域名
      httpOnly: true, // 是否只用于http请求中获取
      overwrite: "", // 是否允许重写
      secure: "",
      sameSite: "",
      signed: "",
    },
  };

  // 服务启动配置
  config.server = {
    PORT: 8121,
  };

  // 环境变量
  config.env = {
    // 后台启动端口
    NODE_ENV,
    IS_DEV: NODE_ENV === "dev",
    IS_TEST: NODE_ENV === "test",
    IS_STAGE: NODE_ENV === "stage",
    IS_PROD: NODE_ENV === "prod",
  };
};
