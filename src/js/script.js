const API_KEY = "DEMO_KEY";
const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const image = document.getElementById("photo");
const loading = document.getElementById("loading");
const informations_box = document.getElementById("informations");

const photo_date = document.getElementById("photo_date");

const error_message = document.getElementById("error_message")

const copyright = document.getElementById("copyright")


informations_box.style.display = "none";
loading.style.display = "none";
error_message.style.display = "none"

async function loadToday() {
  try {
    informations_box.style.display = "none";
    error_message.style.display = "none"
    loading.style.display = "block"
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Houve um erro: " + response.status);

    const data = await response.json();
    image.src = data.hdurl || data.url;
    image.alt = data.copyright || "NASA"
    const photo_date_formatted = new Date(data.date + "T00:00:00").toLocaleDateString("pt-BR");
    photo_date.textContent = photo_date_formatted;
    copyright.textContent = data.copyright;
    image.onload = () => {
      informations_box.style.display = "block";
      loading.style.display = "none";
    };
  } catch(error) {
    error_message.textContent = error.message
    loading.style.display = "none"
    error_message.style.display = "block";
  }
}

async function loadRandom() {
  try {
    informations_box.style.display = "none";
    error_message.style.display = "none"
    loading.style.display = "block"
    const start = new Date("1995-06-16");
    const today = new Date();
    
    const randomTime = start.getTime() + Math.random() * (today.getTime() - start.getTime());
    const randomDate = new Date(randomTime).toISOString().split("T")[0];
    const URL2 = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${randomDate}`
    const response = await fetch(URL2);
    if (!response.ok) throw new Error("Houve um erro: " + response.status);

    const data = await response.json();
    image.src = data.hdurl || data.url;
    image.alt = data.copyright || "NASA"
    const photo_date_formatted = new Date(data.date + "T00:00:00").toLocaleDateString("pt-BR");
    photo_date.textContent = photo_date_formatted;
    image.onload = () => {
      informations_box.style.display = "block";
      loading.style.display = "none";
    };
  } catch(error) {
    error_message.textContent = error.message
    loading.style.display = "none"
    error_message.style.display = "block";
  }
}