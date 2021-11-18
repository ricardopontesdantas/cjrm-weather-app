const containerMain = document.querySelector(".container");
const changeLocation = document.querySelector('[data-js="changeLocation"]');
const cityName = document.querySelector(".city-name > h2");
const temperature = document.querySelector('[data-js="temperature"]');
const descriptionWeather = document.querySelector(
  '[data-js="descriptionWeather"]'
);
const iconWeather = document.querySelector('[data-js="iconWeather"]');
const containerCityWeahetInfo = document.querySelector(
  '[data-js="cityWeatherInfo"]'
);
const cityNotFound = document.querySelector('[data-js="cityNotFound"]');

const resetForm = () => {
  cityNotFound.classList.remove("d-none");
  containerCityWeahetInfo.classList.add("d-none");
  containerMain.style.backgroundImage = "";
  changeLocation.reset();
};

const renderMessageNotFound = (message) => {
  resetForm();
  throw new Error(message);
};

const getCityWeatherDetails = async (cityName) => {
  const data = await getCityData(cityName);

  if (data.length === 0) {
    renderMessageNotFound("Cidade não localizada");
  }

  const [{ Key, LocalizedName }] = data;

  const [
    {
      IsDayTime,
      LocalObservationDataTime,
      Temperature,
      WeatherIcon,
      WeatherText,
    },
  ] = await getWeatherData(Key);

  return {
    LocalizedName,
    IsDayTime,
    LocalObservationDataTime,
    Temperature,
    WeatherIcon,
    WeatherText,
  };
};

const renderInfoCity = (
  LocalizedName,
  IsDayTime,
  Temperature,
  WeatherIcon,
  WeatherText
) => {
  if (containerCityWeahetInfo.classList.contains("d-none")) {
    containerCityWeahetInfo.classList.remove("d-none");
  }

  if (!cityNotFound.classList.contains("d-none")) {
    cityNotFound.classList.add("d-none");
  }

  const containerBackground = IsDayTime
    ? "url(./src/day.jpg)"
    : "url(./src/night.jpg)";

  containerMain.style.backgroundImage = containerBackground;
  cityName.innerHTML = LocalizedName;
  descriptionWeather.innerHTML = WeatherText;
  iconWeather.src = `./src/icons/${WeatherIcon}.svg`;
  temperature.innerHTML = `${Temperature.Metric.Value}&deg;`;
};

changeLocation.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityNameSearched = event.target.city.value;

  const { LocalizedName, IsDayTime, Temperature, WeatherIcon, WeatherText } =
    await getCityWeatherDetails(cityNameSearched);

  renderInfoCity(
    LocalizedName,
    IsDayTime,
    Temperature,
    WeatherIcon,
    WeatherText
  );

  changeLocation.reset();
});
