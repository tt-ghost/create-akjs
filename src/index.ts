#!/usr/bin/env node
import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";
import updateCheck from "update-check";
import packageJson from "../package.json";
import createApp from "./createApp";

let projectPath: string = "";

const program: Commander.Command = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(function (name: string) {
    projectPath = name;
  })
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<void> {
  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const result: prompts.Answers<string> = await prompts({
      initial: "my-akjs",
      message: "项目名称？",
      name: "path",
      type: "text",
    });

    if (typeof result.path === "string") {
      projectPath = result.path.trim();
    }
  }

  if (!projectPath) {
    console.log();
    console.log("请指定项目目录：");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log("示例：");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-akjs")}`);
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);

  await createApp({
    appPath: resolvedProjectPath,
  });
}

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

run()
  .then(notifyUpdate)
  .catch(async function (reason) {
    {
      console.log();
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
  });
