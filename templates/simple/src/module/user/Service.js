import { Service } from "akjs";

export default class UserService extends Service {
  sayHello(message) {
    return { message };
  }
}
