# akjs app

> akjs 为轻量级 Nodejs 框架

## 项目启动

1 依赖安装

```shell
pnpm i
```

2 启动数据库

```shell
# 记得需要提前安装 mysql奥
mysql.server start
```

3 登录数据库

```shell
mysql -uroot -p
```

4 创建数据库

```sql
-- 数据库名 src/config/default.conf.js 中修改
CREATE DATABASE akjs_example;
```

5 启动方式

- 本地启动 `npm run dev` 通过 nodemon 本地热加载
  - 访问 [127.0.0.1:8121/api/user/current](127.0.0.1:8121/api/user/current)
- 线上环境启动 `npm run server-prod`，可以根据情况用 [pm2](https://www.npmjs.com/package/pm2) 管理

## 项目结构

```js
.
├── app.js                // 入口文件
├── base                  // 基础class
│   ├── model.js
│   └── service.js
├── config                // 配置文件，与default.conf.js文件合并
│   ├── default.conf.js
│   └── dev.conf.js
├── middleware           // 中间件
│   ├── body-parser.js
│   ├── favicon.js
│   ├── index.js
│   ├── proxy-cdn.js
│   └── session.js
├── module                // 业务模块，每个文件夹对应一个模块，含route\service\model
│   ├── index.js
│   ├── passport          // 登录业务模块
│   │   ├── index.js
│   │   ├── Model.js
│   │   ├── Service.js
│   │   └── Controller.js
│   └── user              // 用户模块
│       ├── index.js
│       ├── Model.js
│       ├── Service.js
│       └── Controller.js
├── plugin
│   ├── index.js
│   ├── sequelize.js
│   └── validate.js
└── utils                 // 方法工具集
    ├── index.js
    └── crypto.js
```
