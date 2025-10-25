class WeatherAPI {
    constructor() {
        this.apiKey = 'ТВОЙ_API_КЛЮЧ'; // ← ЗАМЕНИ НА СВОЙ КЛЮЧ
    }

    async getWeather(city) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric&lang=ru`
            );
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Город не найден');
                }
                throw new Error('Ошибка сервера');
            }
            
            const data = await response.json();
            
            return {
                temp: Math.round(data.main.temp),
                condition: data.weather[0].main,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                pressure: Math.round(data.main.pressure * 0.75), // переводим в мм рт.ст.
                city: data.name,
                country: data.sys.country
            };
            
        } catch (error) {
            console.error('Weather API error:', error);
            throw error;
        }
    }

    getWeatherIcon(condition) {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Snow': '❄️',
            'Thunderstorm': '⛈️',
            'Drizzle': '🌦️',
            'Mist': '🌫️',
            'Fog': '🌫️'
        };
        return icons[condition] || '🌈';
    }

    getConditionText(condition) {
        const conditions = {
            'Clear': 'Ясно',
            'Clouds': 'Облачно',
            'Rain': 'Дождь',
            'Snow': 'Снег',
            'Thunderstorm': 'Гроза',
            'Drizzle': 'Морось',
            'Mist': 'Туман',
            'Fog': 'Туман'
        };
        return conditions[condition] || condition;
    }
}

const weatherAPI = new WeatherAPI();

document.getElementById('weather-btn')?.addEventListener('click', getWeather);
document.getElementById('city-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const input = document.getElementById('city-input');
    const resultsContainer = document.getElementById('weather-results');
    const city = input.value.trim();
    
    if (!city) {
        resultsContainer.innerHTML = '<div class="error">Введите название города</div>';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Получение данных о погоде...</div>';
    
    try {
        const weather = await weatherAPI.getWeather(city);
        
        const icon = weatherAPI.getWeatherIcon(weather.condition);
        const conditionText = weatherAPI.getConditionText(weather.condition);
        
        resultsContainer.innerHTML = `
            <div class="weather-card">
                <div class="weather-icon">${icon}</div>
                <h2>${weather.city}, ${weather.country}</h2>
                <div class="temperature">${weather.temp}°C</div>
                <p>${conditionText} (${weather.description})</p>
                
                <div class="weather-details">
                    <div class="detail-item">
                        <strong>💧 Влажность</strong>
                        <p>${weather.humidity}%</p>
                    </div>
                    <div class="detail-item">
                        <strong>💨 Ветер</strong>
                        <p>${weather.wind} м/с</p>
                    </div>
                    <div class="detail-item">
                        <strong>📊 Давление</strong>
                        <p>${weather.pressure} мм рт.ст.</p>
                    </div>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Weather error:', error);
        resultsContainer.innerHTML = `<div class="error">${error.message || 'Ошибка получения данных о погоде'}</div>`;
    }
}

// Показать погоду для популярных городов при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('weather-results');
    if (resultsContainer && resultsContainer.innerHTML.includes('Введите город')) {
        try {
            const weather = await weatherAPI.getWeather('Москва');
            const icon = weatherAPI.getWeatherIcon(weather.condition);
            const conditionText = weatherAPI.getConditionText(weather.condition);
            
            resultsContainer.innerHTML = `
                <div style="text-align: center; margin-bottom: 1rem; color: #666;">
                    Пример погоды для Москвы:
                </div>
                <div class="weather-card">
                    <div class="weather-icon">${icon}</div>
                    <h2>${weather.city}, ${weather.country}</h2>
                    <div class="temperature">${weather.temp}°C</div>
                    <p>${conditionText}</p>
                </div>
            `;
        } catch (error) {
            // Оставляем исходное сообщение
        }
    }
});