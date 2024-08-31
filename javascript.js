const apiKey = "b064a1bde58ef03152238f8a6e87c92f";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const searchbox = document.querySelector(".search-bar");
  const searchbtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");
  const errorElement = document.querySelector(".error");
  const weatherElement = document.querySelector(".weather");

  async function checkWeather(city) {
      try {
          const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
          
          if (response.status === 404) {
              errorElement.style.display = "block";
              weatherElement.style.display = "none";
              return;
          }

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          
          // Ensure elements exist before updating them
          const weatherTitle = document.querySelector(".weather1");
          const tempElement = document.querySelector(".temp");
          const humidityElement = document.querySelector(".humidity");
          const descriptionElement = document.querySelector(".description");
          const windElement = document.querySelector(".wind");

          if (weatherTitle && tempElement && humidityElement && windElement && descriptionElement) {
              weatherTitle.innerHTML = `Weather in ${data.name}`;
              tempElement.innerHTML = `${data.main.temp}°C`;
              humidityElement.innerHTML = `Humidity: ${data.main.humidity}%`;
              windElement.innerHTML = `Wind speed: ${data.wind.speed} km/h`;
              descriptionElement.innerHTML = data.weather[0].main;
          } else {
              console.error('One or more elements not found');
          }

          // Update the weather icon based on the weather description
          const weatherCondition = data.weather[0].main;
          switch (weatherCondition) {
              case "Clouds":
                  weatherIcon.src = "image/cloudy.png";
                  break;
              case "Clear":
                  weatherIcon.src = "image/sun.png";
                  break;
              case "Rain":
                  weatherIcon.src = "image/rainy.png";
                  break;
              case "Drizzle":
                  weatherIcon.src = "image/drizzle.png";
                  break;
              case "Thunderstorm":
                  weatherIcon.src = "image/storm.png";
                  break;
              case "Mist":
                  weatherIcon.src = "image/mist.png";
                  break;
              case "Haze":
                  weatherIcon.src = "image/haze.png";
                  break;
              default:
                  weatherIcon.src = "image/weather.png"; 
          }

          // Show weather data and hide error message
          weatherElement.style.display = "block";
          errorElement.style.display = "none";

      } catch (error) {
          console.error('Error fetching weather data:', error);
          errorElement.style.display = "block";
          weatherElement.style.display = "none";
      }
  }

  searchbtn.addEventListener("click", () => {
      checkWeather(searchbox.value);
  });

  searchbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
          checkWeather(searchbox.value);
      }
  });