"use server";

import { exec } from "node:child_process";

export async function execDate() {
  return new Promise((resolve, reject) => {
    exec("date", (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}
