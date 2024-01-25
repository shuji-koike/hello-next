"use server";

import { exec } from "node:child_process";

export async function execDate() {
  return new Promise<string>((resolve, reject) => {
    exec("date", (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}

export async function execUname() {
  "server action";
  return new Promise<string>((resolve) => {
    exec("uname -a", (_, stdout) => resolve(stdout));
  });
}
