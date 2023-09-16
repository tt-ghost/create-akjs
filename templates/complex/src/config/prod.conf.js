export default (app) => {
  const { config } = app;

  config.db = {
    database: "akjs_example",
    user: "root",
    password: "12345678",
    port: "3306",
    host: "localhost",
    connectTimeout: 30 * 1000,
  };
};
