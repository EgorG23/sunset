import"./main-CJ9zkEGQ.js";class c{constructor(){this.apiKey="ТВОЙ_API_КЛЮЧ"}async getWeather(t){try{const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(t)}&appid=${this.apiKey}&units=metric&lang=ru`);if(!n.ok)throw n.status===404?new Error("Город не найден"):new Error("Ошибка сервера");const e=await n.json();return{temp:Math.round(e.main.temp),condition:e.weather[0].main,description:e.weather[0].description,humidity:e.main.humidity,wind:e.wind.speed,pressure:Math.round(e.main.pressure*.75),city:e.name,country:e.sys.country}}catch(n){throw console.error("Weather API error:",n),n}}getWeatherIcon(t){return{Clear:"☀️",Clouds:"☁️",Rain:"🌧️",Snow:"❄️",Thunderstorm:"⛈️",Drizzle:"🌦️",Mist:"🌫️",Fog:"🌫️"}[t]||"🌈"}getConditionText(t){return{Clear:"Ясно",Clouds:"Облачно",Rain:"Дождь",Snow:"Снег",Thunderstorm:"Гроза",Drizzle:"Морось",Mist:"Туман",Fog:"Туман"}[t]||t}}const i=new c;document.getElementById("weather-btn")?.addEventListener("click",o);document.getElementById("city-input")?.addEventListener("keypress",r=>{r.key==="Enter"&&o()});async function o(){const r=document.getElementById("city-input"),t=document.getElementById("weather-results"),n=r.value.trim();if(!n){t.innerHTML='<div class="error">Введите название города</div>';return}t.innerHTML='<div class="loading">Получение данных о погоде...</div>';try{const e=await i.getWeather(n),s=i.getWeatherIcon(e.condition),a=i.getConditionText(e.condition);t.innerHTML=`
            <div class="weather-card">
                <div class="weather-icon">${s}</div>
                <h2>${e.city}, ${e.country}</h2>
                <div class="temperature">${e.temp}°C</div>
                <p>${a} (${e.description})</p>
                
                <div class="weather-details">
                    <div class="detail-item">
                        <strong>💧 Влажность</strong>
                        <p>${e.humidity}%</p>
                    </div>
                    <div class="detail-item">
                        <strong>💨 Ветер</strong>
                        <p>${e.wind} м/с</p>
                    </div>
                    <div class="detail-item">
                        <strong>📊 Давление</strong>
                        <p>${e.pressure} мм рт.ст.</p>
                    </div>
                </div>
            </div>
        `}catch(e){console.error("Weather error:",e),t.innerHTML=`<div class="error">${e.message||"Ошибка получения данных о погоде"}</div>`}}document.addEventListener("DOMContentLoaded",async()=>{const r=document.getElementById("weather-results");if(r&&r.innerHTML.includes("Введите город"))try{const t=await i.getWeather("Москва"),n=i.getWeatherIcon(t.condition),e=i.getConditionText(t.condition);r.innerHTML=`
                <div style="text-align: center; margin-bottom: 1rem; color: #666;">
                    Пример погоды для Москвы:
                </div>
                <div class="weather-card">
                    <div class="weather-icon">${n}</div>
                    <h2>${t.city}, ${t.country}</h2>
                    <div class="temperature">${t.temp}°C</div>
                    <p>${e}</p>
                </div>
            `}catch{}});
