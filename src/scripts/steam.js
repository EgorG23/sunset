class SteamSpyAPI {
    constructor() {
        this.demoGames = this.getDemoGames();
    }

    async getTopGames() {
        try {
            const response = await fetch('https://steamspy.com/api.php?request=top100in2weeks');
            
            if (!response.ok) {
                throw new Error('Steam Spy недоступен');
            }
            
            const data = await response.json();
            
            if (!data || Object.keys(data).length === 0) {
                return this.getDemoTopGames();
            }
            
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
            return this.getDemoTopGames();
        }
    }

    async searchGames(query) {
        try {
            const response = await fetch('https://steamspy.com/api.php?request=all');
            
            if (!response.ok) {
                throw new Error('Steam Spy недоступен');
            }
            
            const data = await response.json();
            
            if (!data || Object.keys(data).length === 0) {
                return this.searchDemoGames(query);
            }
            
            const filteredGames = Object.values(data).filter(game => 
                game.name && game.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 12);
            
            if (filteredGames.length === 0) {
                return this.searchDemoGames(query);
            }
            
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
            return this.searchDemoGames(query);
        }
    }

    getDemoGames() {
        return [
            {
                name: "Counter-Strike 2",
                players: "450,000",
                positive: 120000,
                negative: 8000,
                price: "Бесплатно",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"
            },
            {
                name: "Dota 2",
                players: "300,000", 
                positive: 95000,
                negative: 5000,
                price: "Бесплатно",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg"
            },
            {
                name: "Apex Legends",
                players: "200,000",
                positive: 88000,
                negative: 12000,
                price: "Бесплатно",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg"
            },
            {
                name: "Baldur's Gate 3",
                players: "150,000",
                positive: 150000,
                negative: 3000,
                price: "$59.99",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg"
            },
            {
                name: "Cyberpunk 2077",
                players: "80,000",
                positive: 120000,
                negative: 45000,
                price: "$39.99",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
            },
            {
                name: "Grand Theft Auto V",
                players: "120,000",
                positive: 850000,
                negative: 75000,
                price: "$29.99",
                image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
            }
        ];
    }

    getDemoTopGames() {
        return this.demoGames.slice(0, 8).map(game => ({
            ...game,
            score: this.calculateScore(game.positive, game.negative)
        }));
    }

    searchDemoGames(query) {
        const filtered = this.demoGames.filter(game => 
            game.name.toLowerCase().includes(query.toLowerCase())
        );
        return filtered.map(game => ({
            ...game,
            score: this.calculateScore(game.positive, game.negative)
        }));
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
        return '#ef4444'; // красный
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

        const sourceInfo = games.some(game => game.name.includes("Counter-Strike")) ? 
            '<div style="text-align: center; margin-bottom: 1rem; color: #666; font-size: 0.8rem;">Демо-данные (Steam Spy временно недоступен)</div>' :
            '<div style="text-align: center; margin-bottom: 1rem; color: #666; font-size: 0.8rem;">Данные из Steam Spy</div>';
        
        renderGames(games, 'Найдено', sourceInfo);
        
    } catch (error) {
        console.error('Search error:', error);
        const demoGames = steamAPI.searchDemoGames(query);
        if (demoGames.length > 0) {
            const sourceInfo = '<div style="text-align: center; margin-bottom: 1rem; color: #666; font-size: 0.8rem;">Демо-данные (Steam Spy недоступен)</div>';
            renderGames(demoGames, 'Найдено в демо-режиме', sourceInfo);
        } else {
            resultsContainer.innerHTML = '<div class="error">Ошибка при поиске игр</div>';
        }
    }
}

function renderGames(games, title, sourceInfo = '') {
    const resultsContainer = document.getElementById('steam-results');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            🎮 ${title} ${games.length} игр
        </div>
        ${sourceInfo}
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
                const sourceInfo = games.some(game => game.name.includes("Counter-Strike")) ? 
                    '<div style="text-align: center; margin-bottom: 1rem; color: #666; font-size: 0.8rem;">Демо-данные (Steam Spy временно недоступен)</div>' :
                    '';
                renderGames(games, 'Популярные игры в Steam', sourceInfo);
            }
        } catch (error) {

        }
    }
});