const chalk = require('chalk');

module.exports = (arr) => {
  arr.forEach(date => {
    const spacer = '-------------';
    if (arr.indexOf(date) === 0) console.log(spacer)
    const header = chalk.underline.yellow(`${date.weekday} - ${date.shortHand}:\n`);
    const high = chalk.red(`High: ${date.high}\n`);
    const low = chalk.green(`Low:  ${date.low}\n`);
    const wind = chalk.cyan(`Wind: ${date.wind.speed} ${date.wind.direction}\n`);
    const str = header + high + low + wind + spacer;
    console.log(str);
  });
  return process.exit(0);
}
