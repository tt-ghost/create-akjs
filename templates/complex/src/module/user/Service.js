import { Service } from "akjs";

export default class UserService extends Service {
  async getCurrentUser(userId) {
    const result = await this.app.model.User.findOne({
      where: { id: userId },
    });
    return result;
  }

  async read(userId) {
    const result = await this.app.model.User.findByPk(userId);
    return result;
  }

  async create(user) {
    const { username, email, password } = user || {};
    const one = await this.app.model.User.findOne({
      where: { username },
    });
    if (one) {
      return new Error("已经存在");
    } else {
      const userPO = { username, email, password, deleted: 0 };
      const result = await this.app.model.User.create(userPO);
      return result;
    }
  }

  async update(user) {
    const { userId, username, email, password } = user || {};
    const one = await this.read(userId);
    if (!one) {
      return new Error("未注册");
    } else {
      const userPO = { username, email, password };
      await one.update(userPO);
      return one;
    }
  }
}
