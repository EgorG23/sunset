import"./main-B5kkwyQZ.js";class d{async getTopGames(){try{const r=await(await fetch("https://steamspy.com/api.php?request=top100in2weeks")).json();return Object.values(r).slice(0,12).map(e=>({name:e.name,players:e.average_2weeks?.toLocaleString()||"0",positive:e.positive||0,negative:e.negative||0,score:this.calculateScore(e.positive,e.negative),price:e.price?`${e.price/100}$`:"Бесплатно",image:`https://cdn.cloudflare.steamstatic.com/steam/apps/${e.appid}/header.jpg`,appid:e.appid}))}catch(t){throw console.error("Steam Spy API error:",t),new Error("Не удалось получить данные игр")}}async searchGames(t){try{const e=await(await fetch("https://steamspy.com/api.php?request=all")).json();return Object.values(e).filter(s=>s.name.toLowerCase().includes(t.toLowerCase())).slice(0,12).map(s=>({name:s.name,players:s.average_2weeks?.toLocaleString()||"0",positive:s.positive||0,negative:s.negative||0,score:this.calculateScore(s.positive,s.negative),price:s.price?`${s.price/100}$`:"Бесплатно",image:`https://cdn.cloudflare.steamstatic.com/steam/apps/${s.appid}/header.jpg`,appid:s.appid}))}catch(r){throw console.error("Steam search error:",r),new Error("Не удалось найти игры")}}calculateScore(t,r){const e=t+r;return e===0?"0%":`${Math.round(t/e*100)}%`}getScoreColor(t){const r=parseInt(t);return r>=90?"#10b981":r>=70?"#f59e0b":"#ef4444"}}const n=new d;document.getElementById("search-btn")?.addEventListener("click",c);document.getElementById("search-input")?.addEventListener("keypress",a=>{a.key==="Enter"&&c()});async function c(){const a=document.getElementById("search-input"),t=document.getElementById("steam-results"),r=a.value.trim();if(!r){t.innerHTML='<div class="error">Введите название игры</div>';return}t.innerHTML='<div class="loading">Поиск игр в Steam...</div>';try{const e=await n.searchGames(r);if(e.length===0){t.innerHTML='<div class="error">Игры не найдены. Попробуйте другой запрос</div>';return}o(e,"Найдено")}catch(e){console.error("Search error:",e),t.innerHTML='<div class="error">Ошибка при поиске игр</div>'}}function o(a,t){const r=document.getElementById("steam-results");r.innerHTML=`
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            🎮 ${t} ${a.length} игр
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
            ${a.map((e,i)=>`
                <div class="game-row">
                    <div class="game-number">${i+1}</div>
                    <img src="${e.image}" alt="${e.name}" class="game-image" 
                         onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=70&fit=crop'">
                    <div class="game-name" title="${e.name}">${e.name}</div>
                    <div class="game-players">${e.players}</div>
                    <div class="game-score" style="color: ${n.getScoreColor(e.score)}">
                        ${e.score}
                    </div>
                    <div class="game-price">${e.price}</div>
                </div>
            `).join("")}
        </div>
    `}document.addEventListener("DOMContentLoaded",async()=>{const a=document.getElementById("steam-results");if(a&&a.innerHTML.includes("Используйте поиск"))try{const t=await n.getTopGames();t.length>0&&o(t,"Популярные игры в Steam")}catch{}});
