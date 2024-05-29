// here is the object of weatherapi
const weatherApi = {
  key: "4eb3703790b356562054106543b748b2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};
// get  weather report -- ( dot .)baseurl lagane se hum weatherapi ki value ko access kar saktey hai
// get input box

let searchInputBox = document.getElementById("input-box");
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getWeatherReport(searchInputBox.value);
  }
});
// getWeatherReport("Delhi");
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      console.log(weather);
      return weather.json();
    })
    .then(showWeatherReport); // shoeWeatherReport ek function hai
}

// show weather report

function showWeatherReport(weather) {
  let city_cod = weather.cod;
  if (city_cod === "400") {
    alert("Please enter valid city name");
  } else if (city_cod === "404") {
    alert("Entered city didn't matched");
  } else {
    let weather_body = document.getElementById("weather-body");
    weather_body.style.display = "block";
    let todayDate = new Date();
    let parent = document.getElementById("parent");
    weather_body.innerHTML = `
    <div calss='location-details'>
    <div class='city'>${weather.name},${weather.sys.country}</div>
    <div class='date'>${dateManage(todayDate)}</div>
    </div>
    <div class ='weather-status' > 
    <div class ='temp' id='temp'>${Math.round(weather.main.temp)}&deg;C </div> 
    <div class ='weather' id='weather'>${
      weather.weather[0].main
    }<i class ="${getIconClass(weather.weather[0].main)}"> </i></div>
    <div class ='min-max' id='min-max'>${Math.floor(
      weather.main.temp_min
    )}&deg;C(min)/${Math.floor(weather.main.temp_max)}&deg;C(max)</div>
    <div id='updated_on'>Updated as of ${getTime(todayDate)} </div>
    </div>
    <hr>
    <div class='day-details'>
    <div class='basic'>Feels Like${weather.main.feels_like}&deg;C | Humidity${
      weather.main.humidity
    }%<br> Pressure${weather.main.pressure}mb|wind${weather.wind.speed}KMPH/div>
    </div>
    `;
    parent.append(weather_body);
    reset();
  }
}
// date time
function getTime(todayDate) {
  let hour = addZero(todayDate.getHours());
  let minute = addZero(todayDate.getMinutes());
  return `${hour}:${minute}`;
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function reset() {
  let input = document.getElementById("input-box");
  input.value = "";
}
// icons function
function getIconClass(weather) {
  if (weather === "Clear") {
    return "fas fa-sun";
  } else if (weather === "Clouds") {
    return "fas fa-cloud";
  } else if (weather === "Rain") {
    return "fas fa-cloud-showers-heavy";
  } else if (weather === "Snow") {
    return "fas fa-snowflake";
  } else if (weather === "Thunderstorm") {
    return "fas fa-bolt";
  } else {
    return "fas fa-cloud";
  }
}

// dateManage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[dateArg.getDay()];
  let date = dateArg.getDate();
  let month = months[dateArg.getMonth()];
  let year = dateArg.getFullYear();

  // console.log(year+" "+date+" "+day+" "+month);
  return `${date} ${month} (${day}) , ${year}`;
}

class Particle {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "aqua";
    ctx.fill();
  }
}

const particles = [];
const numParticles = 25;

for (let i = 0; i < numParticles; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speedX = (Math.random() - 0.5) * 1.2;
  const speedY = (Math.random() - 0.5) * 1.2;
  particles.push(new Particle(x, y, speedX, speedY));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) {
    particle.update();
    particle.draw();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 110) {
        ctx.strokeStyle = "rgba(157, 212, 215, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

animate();
