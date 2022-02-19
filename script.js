const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const realTemperature = document.querySelector('.real-temperature');
const humidity = document.querySelector('.humidity');
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=885ae7c047ca5c43eb495d26f2583f80';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Lublin';
	const URL = API_LINK + city + API_KEY + API_UNITS;
	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const tempFeelsLike = res.data.main.feels_like;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.round(temp * 10) / 10 + '°C';
			realTemperature.textContent = Math.round(tempFeelsLike * 10) / 10 + '°C';
			humidity.textContent = res.data.main.humidity + '%';
			weather.textContent = status.main;
			warning.textContent = null;
			input.value = null;
			console.log(status);
			if (status.id >= 200 && status.id <= 232) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.id <= 321) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (status.id >= 500 && status.id <= 531) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.id <= 622) {
				photo.setAttribute('src', './img/ice.png');
			} else if (status.id >= 700 && status.id <= 781) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id == 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (status.id > 800 && status.id <= 804) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
};

const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterKeyCheck);
button.addEventListener('click', getWeather);
getWeather();
