import { Application } from "akjs";

class App extends Application {
  ready() {
    console.log("App Ready!");
    // 自动创建数据表，需要提前创建数据库
    this.app.model.sync();
  }
  started() {
    console.log("恭喜💐💐💐 App 启动成功！");
    console.log("http://127.0.0.1:8120/user/current");
  }
}

new App().start();
