import chalk from "chalk";
import fs from "fs";
import path from "path";

export function isDirectoryEmpty(directoryPath: string, appName: string): boolean {
  const validFiles: string[] = [
    ".DS_Store",
    ".git",
    ".gitattributes",
    ".gitignore",
    ".gitlab-ci.yml",
    ".hg",
    ".hgcheck",
    ".hgignore",
    ".idea",
    ".npmignore",
    ".travis.yml",
    ".yarn",
    ".yarnrc.yml",
    "LICENSE",
    "Thumbs.db",
    "docs",
    "mkdocs.yml",
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log",
  ];

  const conflicts: string[] = fs
    .readdirSync(directoryPath)
    .filter(function (file: string) {
      return validFiles.includes(file) === false;
    })
    .filter(function (file: string) {
      return /\.iml$/.test(file) === false;
    });

  if (conflicts.length > 0) {
    console.log("目录中包含的文件可能冲突 " + chalk.green(appName) + " :");
    console.log();
    for (const file of conflicts) {
      try {
        const stats: fs.Stats = fs.lstatSync(path.join(directoryPath, file));
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    }
    console.log();
    console.log("尝试使用新的目录名称，或删除上面列出的文件.");
    console.log();
    return false;
  }

  return true;
}

export async function isDirectoryWriteable(directory: string): Promise<boolean> {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.log("目录模板不存在");
    return;
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export function replaceContent(fileName: string, fn: (data: any) => string) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const newData: string = fn(data);
      fs.writeFile(fileName, newData, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}
