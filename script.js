const weekList = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'};
const monthList = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'};

welcomeLine = document.querySelector('.welcome');

let fonNight = localStorage.getItem('fonNight') ? localStorage.getItem('fonNight') : localStorage.setItem('fonNight', 1);
let fonMorning = localStorage.getItem('fonMorning') ? localStorage.getItem('fonMorning') : localStorage.setItem('fonMorning', 1);
let fonDay = localStorage.getItem('fonDay') ? localStorage.getItem('fonDay') : localStorage.setItem('fonDay', 1);
let fonEvening = localStorage.getItem('fonEvening') ? localStorage.getItem('fonEvening') : localStorage.setItem('fonEvening', 1);
let numThisFone = localStorage.getItem('numThisFone') ? localStorage.getItem('numThisFone') : localStorage.setItem('numThisFone', 1);

let standingNight = localStorage.getItem('standingNight') ? localStorage.getItem('standingNight') : localStorage.setItem('standingNight', 0);
let standingMorning = localStorage.getItem('standingMorning') ? localStorage.getItem('standingMorning') : localStorage.setItem('standingMorning', 0);
let standingDay = localStorage.getItem('standingDay') ? localStorage.getItem('standingDay') : localStorage.setItem('standingDay', 0);
let standingEvening = localStorage.getItem('standingEvening') ? localStorage.getItem('standingEvening') : localStorage.setItem('standingEvening', 0);

const alert = document.querySelector('.alert');

let nameInput = '';
console.log(localStorage);

const time = () => {
    let dateTime = new Date();
    document.getElementById("time").innerHTML = `${addZero(dateTime.getHours())} : ${addZero(dateTime.getMinutes())} : ${addZero(dateTime.getSeconds())}`;
    document.getElementById("date").innerHTML = `${weekList[dateTime.getDay()]} ${dateTime.getDate()} ${monthList[Number(dateTime.getMonth() + 1)]}`;

    if (dateTime.getMinutes() === 0 && dateTime.getSeconds() === 0 ) backgroundImg('new');
    if (dateTime.getMinutes() === 0 && dateTime.getSeconds() === 0 ) getQuote();

    setTimeout(time, 1000)
  }
const addZero = (item) =>  String(item).length < 2 ?`0${item}`:item;
const welcome = () => {
    const dateTime = new Date();
    if ((dateTime.getHours() >= 0 && dateTime.getHours() < 6)) welcomeLine.innerHTML = 'Goodnight';
    else {
        if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) welcomeLine.innerHTML = 'Good morning';
        if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) welcomeLine.innerHTML = 'Good day';
        if (dateTime.getHours() >= 18 && dateTime.getHours() < 24) welcomeLine.innerHTML = 'Good evening';
    }
}

const start = () => {
    localStorage.getItem('yourName') ? document.querySelector('.yourName').innerHTML = localStorage.getItem('yourName') : document.querySelector('.yourName').innerHTML = '' ;
    localStorage.getItem('taskToday') ? document.querySelector('.taskToday').innerHTML = localStorage.getItem('taskToday') : document.querySelector('.taskToday').innerHTML = '' ;
    localStorage.getItem('city') ? document.querySelector('.city').innerHTML = localStorage.getItem('city') : document.querySelector('.city').innerHTML = 'Minsk';

    if(localStorage.getItem('rangeBlur')){
        document.body.style.backdropFilter =  document.body.style.webkitBackdropFilter = 'blur(' + String(localStorage.getItem('rangeBlur')) + 'px)';
        document.querySelector('#blur').value = localStorage.getItem('rangeBlur');
    }
    else {
        document.body.style.backdropFilter = 'blur(0px)';
    }
    backgroundImg('old');
}

const writeLine = (from, to) => {
    const val = document.querySelector(from);
    localStorage.setItem(val.id, val.value);
    start ();
}
const backgroundImg = (newFon) => {
    const dateTime = new Date();
    let folder = ''; let numFon = 1;

    if ((localStorage.getItem('standingNight') > 0 || localStorage.getItem('standingMorning') > 0 || localStorage.getItem('standingDay') > 0 || localStorage.getItem('standingEvening') > 0 ) && newFon !== 'old') {
        localStorage.getItem('standingNight') > 0 ? localStorage.getItem('standingNight') : localStorage.setItem('standingNight', 1);
        localStorage.getItem('standingMorning') > 0 ? localStorage.getItem('standingMorning') : localStorage.setItem('standingMorning', 1);
        localStorage.getItem('standingDay') > 0 ? localStorage.getItem('standingDay') : localStorage.setItem('standingDay', 1);
        localStorage.getItem('standingEvening') > 0 ? localStorage.getItem('standingEvening') : localStorage.setItem('standingEvening', 1);
        if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
            folder = 'night';
            numFonSts = localStorage.getItem('standingNight');
        }
        if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
            folder = 'morning';
            numFonSts = localStorage.getItem('standingMorning');
        }
        if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
            folder = 'day';
            numFonSts = localStorage.getItem('standingDay');
        }
        if (dateTime.getHours() >= 18 && dateTime.getHours() < 24) {
            folder = 'evening';
            numFonSts = localStorage.getItem('standingEvening');
        }
        document.body.style.backgroundImage = `url('assets/images/${folder}/${numFonSts.toString().padStart(2,0)}.jpg')`;
        setTimeout(1000);
    }
    else {
        if (newFon === 'new') {
            if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
                folder = 'night';
                numFon = fonNight <= 20 ? localStorage.setItem('fonNight', Number(fonNight) + 1) : localStorage.setItem('fonNight', 1);
            }
            if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
                folder = 'morning';
                numFon = fonMorning <= 20 ? localStorage.setItem('fonMorning', Number(fonMorning) + 1) : localStorage.setItem('fonMorning', 1);
            }
            if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
                folder = 'day';
                fonDay <= 20 ? localStorage.setItem('fonDay', Number(fonDay) + 1) : localStorage.setItem('fonDay', 1);
                numFon = localStorage.getItem('fonDay');
            }
            if (dateTime.getHours() >= 18 && dateTime.getHours() < 24) {
                folder = 'evening';
                fonEvening <= 20 ? localStorage.setItem('fonEvening', Number(fonEvening) + 1) : localStorage.setItem('fonEvening', 1);
                numFon = localStorage.getItem('fonEvening');
            }
            setTimeout(1000);
        }
        if(newFon === 'old') {
            if (localStorage.getItem('standingNight') > 0 || localStorage.getItem('standingMorning') > 0 || localStorage.getItem('standingDay') > 0 || localStorage.getItem('standingEvening') > 0 ) {
                if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
                    folder = 'night';
                    numFon = localStorage.getItem('standingNight');
                }
                if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
                    folder = 'morning';
                    numFon = localStorage.getItem('standingMorning');
                }
                if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
                    folder = 'day';
                    numFon = localStorage.getItem('standingDay');
                }
                if (dateTime.getHours() >= 18 && dateTime.getHours() < 24) {
                    folder = 'evening';
                    numFon = localStorage.getItem('standingEvening');
                }
            }
            else {
                if (dateTime.getHours() >= 0 && dateTime.getHours() < 6) {
                    folder = 'night';
                    numFon = localStorage.getItem('fonNight');
                }
                if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
                    folder = 'morning';
                    numFon = localStorage.getItem('fonMorning');
                }
                if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
                    folder = 'day';
                    numFon = localStorage.getItem('fonDay');
                }
                if (dateTime.getHours() >= 18 && dateTime.getHours() < 24) {
                    folder = 'evening';
                    numFon = localStorage.getItem('fonEvening');
                }
            }
        }
        document.body.style.backgroundImage = `url('assets/images/${folder}/${numFon.toString().padStart(2,0)}.jpg')`;
    }
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
}


const getRandomInt = () => Math.floor(Math.random() * (20 - 1)) + 1;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');

  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
    const dateTime = new Date();
    let folder = '';
    if (dateTime.getHours() >= 0 && dateTime.getHours() < 6)  {
        folder = 'night';
        standingBg = checkGetImg('standingNight',folder);
    }
    if (dateTime.getHours() >= 6 && dateTime.getHours() < 12) {
        folder = 'morning';
        standingBg = checkGetImg('standingMorning',folder);
    }
    if (dateTime.getHours() >= 12 && dateTime.getHours() < 18) {
        folder = 'day';
        standingBg = checkGetImg('standingDay',folder);
    }
    if (dateTime.getHours() >= 18 && dateTime.getHours() < 24){
        folder = 'evening';
        standingBg = checkGetImg('standingEvening',folder);
    }

    const imageSrc = `assets/images/${folder}/${addZero(standingBg)}.jpg`;
    viewBgImage(imageSrc);
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}

const checkGetImg = (item, folder) => {
    standingBg = localStorage.getItem(item);
    standingBg < 20 ? localStorage.setItem(item, Number(standingBg) + 1) : localStorage.setItem(item, 1);
    standingBg === '0' ? standingBg = Number(standingBg) +1 : standingBg;
    document.body.style.backgroundImage  === `url("assets/images/${folder}/${addZero(standingBg)}.jpg")` ? localStorage.setItem(item, Number(standingBg) + 1) : localStorage.getItem(item);
    return localStorage.getItem(item);
}
const btnAuto = () => {
    localStorage.setItem('standingNight', 0);
    localStorage.setItem('standingMorning', 0);
    localStorage.setItem('standingDay', 0);
    localStorage.setItem('standingEvening', 0);
    localStorage.setItem('fonNight', 1);
    localStorage.setItem('fonMorning', 1);
    localStorage.setItem('fonDay', 1);
    localStorage.setItem('fonEvening', 1);
    backgroundImg('old');
}
const btn = document.querySelector('.backgroundСhange');
const btnRes = document.querySelector('.backgroundAuto');
btn.addEventListener('click', function(){
    getImage()
    alert.classList.remove('outFade');
    alert.style.display = 'block';

    alert.innerHTML = 'The background is changed and saved. Automatic switching once per hour is disabled.';
    setTimeout(function() {
        alert.style.display = 'none';
        alert.classList.remove('outFade');
      }, 5000);
});
btnRes.addEventListener('click', function(){
    btnAuto();
    alert.classList.remove('outFade');
    alert.style.display = 'block';

    alert.innerHTML = 'The background has been reset. Automatic changeover once an hour is enabled.';
    setTimeout(function() {
        alert.style.display = 'none';
        alert.classList.remove('outFade');
      }, 5000);
} );

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const weatherIcon1 = document.querySelector('.weatherIcon');
const humidity = document.querySelector('.humidity');



const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=62a79fb9b098cccc2c07fbb51cf015c8&units=metric`;    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
        city.innerText = localStorage.getItem('city')
        return alert(`Something went wrong  \_(  -_-)_/`);
    }
   

    weatherIcon1.style.backgroundImage = `url("http://openweathermap.org/img/wn/${data.weather[0].icon}.png")`;
    weatherIcon1.style.backgroundRepeat = 'no-repeat';
    weatherIcon1.style.backgroundSize = 'cover';
    weatherIcon1.style.backgroundPosition = 'center';

    temperature.textContent = `${data.main.temp}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${data.wind.speed} m/second`;

    localStorage.setItem('city', data.name);
  }
function setCity(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode == 9 || event.keyCode == 13) {
      getWeather();
      city.blur();
    }
  }

  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);

// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked

async function getQuote() {
    const url = `https://favqs.com/api/qotd`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.quote.body.length > 115) {
        return getQuote();
    }
    else{
        data.quote.body.length;
        blockquote.textContent = data.quote.body;
        figcaption.textContent = data.quote.author;
    }
}
const btnQuoteChange = document.querySelector('.quoteChange');
document.addEventListener('DOMContentLoaded', getQuote);
btnQuoteChange.addEventListener('click', getQuote);

const yourName = document.querySelector('.yourName');


async function getYourName() {
    localStorage.setItem('yourName', document.querySelector('.yourName').innerText);
}

function setYourName(event) {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode == 9 || event.keyCode == 13) && document.querySelector('.yourName').innerText !== '') {
        getYourName();
        yourName.blur();
    }
  }

document.addEventListener('DOMContentLoaded', getYourName);
yourName.addEventListener('keypress', setYourName);


const taskToday = document.querySelector('.taskToday');

async function getTaskToday() {
    localStorage.setItem('taskToday', document.querySelector('.taskToday').innerText);
}

function setTaskToday(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.keyCode == 9 || event.keyCode == 13) {
        getTaskToday();
        taskToday.blur();
    }
}

document.addEventListener('DOMContentLoaded', getTaskToday);
taskToday.addEventListener('keypress', setTaskToday);


function rangeBlur() {
    var rng = document.querySelector('#blur');
    localStorage.setItem('rangeBlur', rng.value);
    document.body.style.backdropFilter = 'blur(' + String(rng.value) + 'px)';
}

start();
welcome();
time();
