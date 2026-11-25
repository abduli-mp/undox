import chalk from "chalk";

export function displayCommand(data) {
  console.log("\n" + chalk.bold.bgHex('#8A00C4')(data.name));

  console.log("\nWHAT");
  console.log(data.what);

  console.log("\nHOW");
  data.how.forEach((item) => {
    console.log(`- ${item.flag}: ${item.description}`);
  });

  console.log("\nIMPACT");
  console.log(data.impact);
}
