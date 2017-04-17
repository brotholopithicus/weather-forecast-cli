function parseData(data) {
    const arr = [];
    for (let i = 0; i < data.list.length; i++) {
        const date = data.list[i].dt_txt.split(' ')[0];
        if (!arr.includes(date)) arr.push(date);
    }
    for (let j = 0; j < arr.length; j++) {
        arr[j] = { date: arr[j], temps: [] }
        for (let k = 0; k < data.list.length; k++) {
            if (data.list[k].dt_txt.split(' ')[0] === arr[j].date) {
                const jsDate = new Date(data.list[k].dt_txt);
                const weekday = (new Date(data.list[k].dt_txt)).toDateString().split(' ')[0];
                const shortDate = { month: (jsDate.getMonth() + 1) < 10 ? '0' + (jsDate.getMonth() + 1) : jsDate.getMonth() + 1, day: jsDate.getDate() < 10 ? '0' + (jsDate.getDate()) : jsDate.getDate() };
                arr[j].weekday = weekday;
                arr[j].shortHand = `${shortDate.month}/${shortDate.day}`;
                arr[j].temps.push(data.list[k].main.temp);
            }
        }
        arr[j].temps.sort();
        arr[j].high = fahrenheitToKelvin(arr[j].temps[arr[j].temps.length - 1]);
        arr[j].low = fahrenheitToKelvin(arr[j].temps[0])
    }
    return prettyPrintData(arr);
}

function fahrenheitToKelvin(K) {
    return Number((K * (9 / 5) - 459.67).toFixed(1));
}

function prettyPrintData(arr) {
    arr.forEach(date => {
        if (arr.indexOf(date) === 0) console.log('-------------')
        const str = `${date.weekday} - ${date.shortHand}:\nHigh: ${date.high} °F\nLow: ${date.low} °F\n-------------`;
        console.log(str);
    });
}

module.exports = parseData;
