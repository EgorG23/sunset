class SteamSpyAPI {
    async getTopGames() {
        try {
            const response = await fetch('https://steamspy.com/api.php?request=top100in2weeks');
            const data = await response.json();
            
            return Object.values(data).slice(0, 12).map(game => ({
                name: game.name,
                players: game.average_2weeks?.toLocaleString() || '0',
                positive: game.positive || 0,
                negative: game.negative || 0,
                score: this.calculateScore(game.positive, game.negative),
                price: game.price ? `${game.price / 100}$` : 'Бесплатно',
                image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
                appid: game.appid
            }));
        } catch (error) {
            console.error('Steam Spy API error:', error);
            throw new Error('Не удалось получить данные игр');
        }
    }

    async searchGames(query) {
        try {
            const response = await fetch('https://steamspy.com/api.php?request=all');
            const data = await response.json();
            
            const filteredGames = Object.values(data).filter(game => 
                game.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 12);
            
            return filteredGames.map(game => ({
                name: game.name,
                players: game.average_2weeks?.toLocaleString() || '0',
                positive: game.positive || 0,
                negative: game.negative || 0,
                score: this.calculateScore(game.positive, game.negative),
                price: game.price ? `${game.price / 100}$` : 'Бесплатно',
                image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
                appid: game.appid
            }));
        } catch (error) {
            console.error('Steam search error:', error);
            throw new Error('Не удалось найти игры');
        }
    }

    calculateScore(positive, negative) {
        const total = positive + negative;
        if (total === 0) return '0%';
        const score = Math.round((positive / total) * 100);
        return `${score}%`;
    }

    getScoreColor(score) {
        const numericScore = parseInt(score);
        if (numericScore >= 90) return '#10b981';
        if (numericScore >= 70) return '#f59e0b';
        return '#ef4444';
    }
}

const steamAPI = new SteamSpyAPI();

document.getElementById('search-btn')?.addEventListener('click', performSearch);
document.getElementById('search-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

async function performSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('steam-results');
    const query = input.value.trim();
    
    if (!query) {
        resultsContainer.innerHTML = '<div class="error">Введите название игры</div>';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Поиск игр в Steam...</div>';
    
    try {
        const games = await steamAPI.searchGames(query);
        
        if (games.length === 0) {
            resultsContainer.innerHTML = '<div class="error">Игры не найдены. Попробуйте другой запрос</div>';
            return;
        }
        
        renderGames(games, 'Найдено');
        
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="error">Ошибка при поиске игр</div>';
    }
}

function renderGames(games, title) {
    const resultsContainer = document.getElementById('steam-results');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            🎮 ${title} ${games.length} игр
        </div>
        <div class="games-container">
            <div class="games-header">
                <div>#</div>
                <div class="header-image">🎮</div>
                <div>Название</div>
                <div>Игроков (2 нед.)</div>
                <div>Рейтинг</div>
                <div>Цена</div>
            </div>
            ${games.map((game, index) => `
                <div class="game-row">
                    <div class="game-number">${index + 1}</div>
                    <img src="${game.image}" alt="${game.name}" class="game-image" 
                         onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=70&fit=crop'">
                    <div class="game-name" title="${game.name}">${game.name}</div>
                    <div class="game-players">${game.players}</div>
                    <div class="game-score" style="color: ${steamAPI.getScoreColor(game.score)}">
                        ${game.score}
                    </div>
                    <div class="game-price">${game.price}</div>
                </div>
            `).join('')}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('steam-results');
    if (resultsContainer && resultsContainer.innerHTML.includes('Используйте поиск')) {
        try {
            const games = await steamAPI.getTopGames();
            if (games.length > 0) {
                renderGames(games, 'Популярные игры в Steam');
            }
        } catch (error) {
        }
    }
});