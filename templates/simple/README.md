# akjs app

> akjs 为轻量级 Nodejs 框架

## 项目启动

1 依赖安装

```shell
pnpm i
```

2 启动方式

- 本地启动 `npm run dev` 通过 nodemon 本地热加载
  - 访问 [http://127.0.0.1:8120/user/hello](http://127.0.0.1:8120/user/hello)
- 线上环境启动 `npm run server-prod`，可以根据情况用 [pm2](https://www.npmjs.com/package/pm2) 管理
