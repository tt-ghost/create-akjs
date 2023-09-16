#!/usr/bin/env node
import chalk from "chalk";
import Commander from "commander";
import updateCheck from "update-check";
import packageJson from "../package.json";
import createApp from "./createApp";

new Commander.Command(packageJson.name)
  .version(packageJson.version)

async function notifyUpdate(): Promise<void> {
  try {
    const res = await updateCheck(packageJson).catch(function () {
      return null;
    });
    if (res?.latest) {
      console.log();
      console.log(chalk.yellow.bold("有新版可用 `create-akjs`！"));
      console.log("你可以更新最新版: yarn global add create-akjs");
      console.log();
    }
  } catch {
    // Ignore error.
  }
}

async function catchError (reason: any) {
  console.log("放弃安装！");

  if (reason.command) {
    console.log(`  ${chalk.cyan(reason.command)} 有错误！`);
  } else {
    console.log(chalk.red("未知错误，请上报bug："));
    console.log(reason);
  }
  console.log();

  await notifyUpdate();

  process.exit(1);
}

createApp()
  .then(notifyUpdate)
  .catch(catchError);
