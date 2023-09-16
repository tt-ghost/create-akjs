import { Service } from "akjs";
/**
 * passport service
 */
export default class PassportService extends Service {
  async login({ username, password }) {
    const result = await this.app.model.Passport.findOne({
      where: { username, password },
    });
    if (!result) return;
  }

  /**
   * 注册用户
   * @param {String} param0 用户名
   */
  async reg(newUser) {
    const { username, password, email } = newUser;
    const result = await this.app.model.Passport.findOne({
      where: { username },
    });

    if (result) return console.log("已经存在该用户");

    const one = await this.app.model.Passport.create({
      where: { username, password, email },
    });
    return one;
  }
}
