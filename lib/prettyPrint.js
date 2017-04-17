module.exports = (arr) => {
    arr.forEach(date => {
        if (arr.indexOf(date) === 0) console.log('-------------')
        const str = `${date.weekday} - ${date.shortHand}:\nHigh: ${date.high} °F\nLow: ${date.low} °F\n-------------`;
        console.log(str);
    });
    return process.exit(0);
}
