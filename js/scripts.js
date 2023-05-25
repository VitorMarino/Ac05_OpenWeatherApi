// Definição de constantes

const apiKey = "742893749274927cjsbcjcabjhcB";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Seletores de elementos HTML

const cityInput = document.querySelector("#city-input"); // input cidade
const searchBtn = document.querySelector("#search"); // Botão pesquisa

const cityElement = document.querySelector("#city"); // exibir cidade pesquisada
const tempElement = document.querySelector("#temperature span"); // exibir temperatura
const descElement = document.querySelector("#description"); // exibir descriãço
const weatherIconElement = document.querySelector("#weather-icon"); // ícone clima
const umidityElement = document.querySelector("#umidity span"); // umidade
const windElement = document.querySelector("#wind span"); // velocidade do vento

const weatherContainer = document.querySelector("#weather-data"); // elementos de dados do clima

const errorMessageContainer = document.querySelector("#error-message"); // container mensagens de erro
const loader = document.querySelector("#loader"); // indicador de carregamento

const suggestionContainer = document.querySelector("#suggestions"); // Container sugestões de cidades
const suggestionButtons = document.querySelectorAll("#suggestions button"); // Botões sugestão de cidades


const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// dados do clima de uma cidade usando a API

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL); 
  const data = await res.json();

  toggleLoader();

  return data;
};

// Tratamento de erro

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide"); 
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

// Exibe os dados do clima

const showWeatherData = async (city) => {
  hideInformation(); 

  const data = await getWeatherData(city); 

  if (data.cod === "404") {
    showErrorMessage(); // erro cidade não encontrada
    return;
  }

  // Atualiza os elementos HTML com os dados do clima obtidos
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Altera a imagem de fundo do corpo da página
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide"); // Exibe o container de dados do clima
};

// Evento de clique no botão de pesquisa

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // evita recarregar a página

  const city = cityInput.value; // valor do campo de entrada

  showWeatherData(city); // Exibe os dados do clima para a cidade pesquisada
});

// Evento de pressionar a tecla Enter no campo de entrada

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") { 
    const city = e.target.value; // valor do campo de entrada

    showWeatherData(city); // dados do clima para a cidade
  }
});

// Sugestões de cidades

suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id"); //nome da cidade a partir do atributo "id"

    showWeatherData(city); // dados do clima para a cidade 
  });
});
