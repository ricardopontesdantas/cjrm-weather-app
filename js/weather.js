const APIKey = "gmuAnDScJz7e8t7lvU79tnhzNARru90Q";
const baseURL = "http://dataservice.accuweather.com";
const language = "pt-br";

const getCityUrl = (cityName) =>
  `${baseURL}/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`;

const getWeatherUrl = (cityKey) =>
  `${baseURL}/currentconditions/v1/${cityKey}?apikey=${APIKey}&language=${language}`;

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados da API");
    }

    return response.json();
  } catch ({ name, message }) {
    console.log(name, message);

    return false;
  }
};

const getCityData = async (cityName) => fetchData(getCityUrl(cityName));

const getWeatherData = async (cityKey) => fetchData(getWeatherUrl(cityKey));
