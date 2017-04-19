const tempConvert = require('./tempConvert');
const speedConvert = require('./speedConvert');
const getCardinal = require('./getCardinal');

const tempUnitConvert = tempUnits();

module.exports = (data) => {
  const arr = [];
  for (let i = 0; i < data.list.length; i++) {
    const date = data.list[i].dt_txt.split(' ')[0];
    if (!arr.includes(date)) arr.push(date);
  }
  for (let j = 0; j < arr.length; j++) {
    arr[j] = { date: arr[j], temps: [], wind: { speed: [], direction: [] } };
    for (let k = 0; k < data.list.length; k++) {
      if (data.list[k].dt_txt.split(' ')[0] === arr[j].date) {
        const jsDate = new Date(data.list[k].dt_txt);
        const weekday = (new Date(data.list[k].dt_txt)).toDateString().split(' ')[0];
        const month = (jsDate.getMonth() + 1) < 10 ?
          '0' + (jsDate.getMonth() + 1) :
          jsDate.getMonth() + 1;
        const day = jsDate.getDate() < 10 ?
          '0' + (jsDate.getDate()) :
          jsDate.getDate();
        arr[j].weekday = weekday;
        arr[j].shortHand = `${month}/${day}`;
        arr[j].temps.push(data.list[k].main.temp);
        arr[j].wind.speed.push(data.list[k].wind.speed);
        arr[j].wind.direction.push(data.list[k].wind.deg);
      }
    }
    arr[j].temps.sort();
    arr[j].high = tempUnitConvert(arr[j].temps[arr[j].temps.length - 1]);
    arr[j].low = tempUnitConvert(arr[j].temps[0])
    arr[j].wind.speed = speedConvert.metricToImperial(arr[j].wind.speed.average()).toFixed(1) + ' mph';
    arr[j].wind.direction = getCardinal(arr[j].wind.direction.average());
  }
  return arr;
}
Array.prototype.average = function() {
  return this.sum() / this.length;
}
Array.prototype.sum = function() {
  return this.reduce((acc, val) => acc + val);
}

function tempUnits() {
  const unit = process.argv[3];
  if (unit) {
    if (unit === 'F' || unit === 'f') return tempConvert.kelvinToFahrenheit;
    if (unit === 'C' || unit === 'c') return tempConvert.kelvinToCelsius;
    if (unit === 'K' || unit === 'k') return tempConvert.kelvin;
  } else {
    return tempConvert.kelvinToFahrenheit;
  }
}
