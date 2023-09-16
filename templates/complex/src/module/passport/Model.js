import { Model } from "akjs";

// export default (app) => {
//   const { DataTypes } = app.Sequelize;
//   const { INTEGER,  STRING } = DataTypes
//   const attrs = {
//     id: {
//       type: INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: STRING,
//     birthday: DATE,
//     status: STRING,
//     name: STRING,
//     nickname: STRING,
//     email: STRING,
//     password: STRING,
//     avator: STRING,
//     sex: STRING,
//   };

//   const opts = { tableName: "user" };

//   return app.defineModel("user", attrs, opts);
// };

export default class PassportModel extends Model {
  constructor() {
    super();
    const { DataTypes } = this.app.Sequelize;
    const { INTEGER, STRING, DATE } = DataTypes;
    const attrs = {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      username: STRING,
      birthday: DATE,
      status: STRING,
      name: STRING,
      nickname: STRING,
      email: STRING,
      password: STRING,
      avator: STRING,
      sex: STRING,
    };

    const opts = { tableName: "passport" };

    return this.app.model.define("passport", attrs, opts);
  }
}
