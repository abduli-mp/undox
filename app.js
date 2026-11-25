#!/usr/bin/env node

import { program } from "commander";
import { readFile } from "node:fs/promises";
import chalk from "chalk";
import { displayCommand } from "./display.js";
import { suggestCommand } from "./search.js";

const commands = ["mkdir", "cd"];

program
  .name("undox")
  .version("1.0.0")
  .description("It explains command-line instructions in plain English.")
  .argument("<cmd>", "Command to explain")
  .action(async (cmd) => {
    try {
      const file = await readFile(
        new URL(`./commands/${cmd}.json`, import.meta.url),
        "utf-8",
      );

      const data = JSON.parse(file);

      displayCommand(data);
    } catch (error) {
      const suggestions = suggestCommand(cmd, commands);

      console.log(chalk.red(`\nNo explanation found for: ${cmd}`));

      if (suggestions.length > 0) {
        console.log(chalk.white("\nDid you mean?"));

        suggestions.forEach((command) => {
          console.log(
            chalk.bgHex("#8A00C4").hex("#f5f5f5")(`  - ${command}      `),
          );
        });
      }

      console.log();
    }
  });

program.parse();
