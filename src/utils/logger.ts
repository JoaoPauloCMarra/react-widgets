import chalk from 'chalk';

export const logError = (title: string, error: any) => {
  console.log(chalk.yellow(title));
  console.log(String(error));
};

export default {};
