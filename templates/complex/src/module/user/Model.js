import { Model } from "akjs";

export default class UserModel extends Model {
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

    const opts = { tableName: "user" };

    return this.app.model.define("user", attrs, opts);
  }
}
