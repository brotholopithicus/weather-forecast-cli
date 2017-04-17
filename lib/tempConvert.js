exports.kelvinToFahrenheit = (K) => (K * (9 / 5) - 459.67).toFixed(1) + ' °F';

exports.kelvinToCelsius = (K) => (K - 273.15).toFixed(1) + '  °C';

exports.kelvin = (K) => K.toFixed(1) + ' K';
