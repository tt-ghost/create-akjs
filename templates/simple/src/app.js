import { Application } from "akjs";

class App extends Application {
  ready() {
    console.log("App Ready!");
  }
  started() {
    console.log("🎉🎉🎉 恭喜 App 启动成功！ 🎉🎉🎉");
    console.log("");
    console.log("http://127.0.0.1:8120/user/hello");
    console.log("");
  }
}

new App().start();
