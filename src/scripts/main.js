
class AlbumRotator {
    constructor() {
        this.albums = [
            {
                id: 1,
                title: "GUTS (spilled)",
                artist: "Olivia Rodrigo",
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/30346230">Слушайте <a href="https://music.yandex.ru/album/30346230?utm_source=desktop&utm_medium=copy_link">GUTS (spilled)</a> — <a href="https://music.yandex.ru/artist/4654635">Olivia Rodrigo</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 2,
                title: "HIT ME HARD AND SOFT",
                artist: "Billie Eilish",
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/31266458">Слушайте <a href="https://music.yandex.ru/album/31266458?utm_source=desktop&utm_medium=copy_link">HIT ME HARD AND SOFT</a> — <a href="https://music.yandex.ru/artist/4353492">Billie Eilish</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 3,
                title: "Man's Best Friend",
                artist: "Sabrina Carpenter",
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/37999752">Слушайте <a href="https://music.yandex.ru/album/37999752">Man's Best Friend</a> — <a href="https://music.yandex.ru/artist/2001010">Sabrina Carpenter</a> на Яндекс Музыке</iframe>`
            }
            // Добавьте сюда остальные альбомы...
        ];
        
        // ДЛЯ ТЕСТА: меняем каждую минуту вместо каждого дня
        this.currentAlbumIndex = this.getMinuteOfHour() % this.albums.length;
        
        // Запускаем автоматическую смену каждую минуту
        this.startAutoRotation();
    }

    // ДЛЯ ТЕСТА: получаем минуту часа (0-59) вместо дня месяца
    getMinuteOfHour() {
        return new Date().getMinutes();
    }

    // ДЛЯ ПРОДУКШЕНА: получаем день месяца (1-31)
    getDayOfMonth() {
        return new Date().getDate();
    }

    // Автоматическая смена альбомов
    startAutoRotation() {
        // Меняем каждую минуту (60000 миллисекунд)
        setInterval(() => {
            this.currentAlbumIndex = (this.currentAlbumIndex + 1) % this.albums.length;
            this.updateWidget();
            this.updateCounter();
            console.log(`Автосмена альбома: ${this.albums[this.currentAlbumIndex].title}`);
        }, 60000); // 60000 мс = 1 минута
    }

    // Обновляем виджет на странице
    updateWidget() {
        const container = document.getElementById('yandex-music-container');
        const currentAlbum = this.albums[this.currentAlbumIndex];
        
        if (container) {
            container.innerHTML = `
                <div class="album-info">
                    <h3>${currentAlbum.title}</h3>
                    <p class="album-artist">${currentAlbum.artist}</p>
                    <p class="album-timer">Следующая смена: через <span id="countdown">60</span> сек</p>
                </div>
                ${currentAlbum.html}
            `;
            
            // Обновляем заголовок секции
            this.updateSectionTitle(currentAlbum);
            // Запускаем таймер обратного отсчета
            this.startCountdown();
        }
    }

    // Таймер обратного отсчета
    startCountdown() {
        let seconds = 60;
        const countdownElement = document.getElementById('countdown');
        
        if (countdownElement) {
            const countdownInterval = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }
    }

    // Обновляем заголовок секции
    updateSectionTitle(album) {
        const widgetSection = document.querySelector('.spotify-widget h2');
        if (widgetSection) {
            widgetSection.innerHTML = `🎵 Альбом дня: <span class="album-title">${album.title}</span>`;
        }
    }

    // Инициализация
    init() {
        this.updateWidget();
        
        // Добавляем кнопки управления только если есть несколько альбомов
        if (this.albums.length > 1) {
            this.addManualControls();
        }
    }

    // Добавляем кнопки управления
    addManualControls() {
        const container = document.getElementById('yandex-music-container');
        
        if (container) {
            const controls = document.createElement('div');
            controls.className = 'album-controls';
            controls.innerHTML = `
                <button id="prev-album" class="album-btn">← Предыдущий</button>
                <span class="album-counter">${this.currentAlbumIndex + 1} / ${this.albums.length}</span>
                <button id="next-album" class="album-btn">Следующий →</button>
            `;
            
            container.parentNode.insertBefore(controls, container.nextSibling);

            // Назначаем обработчики событий
            this.setupEventListeners();
        }
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        document.getElementById('prev-album')?.addEventListener('click', () => {
            this.currentAlbumIndex = (this.currentAlbumIndex - 1 + this.albums.length) % this.albums.length;
            this.updateWidget();
            this.updateCounter();
        });

        document.getElementById('next-album')?.addEventListener('click', () => {
            this.currentAlbumIndex = (this.currentAlbumIndex + 1) % this.albums.length;
            this.updateWidget();
            this.updateCounter();
        });
    }

    // Обновляем счетчик
    updateCounter() {
        const counter = document.querySelector('.album-counter');
        if (counter) {
            counter.textContent = `${this.currentAlbumIndex + 1} / ${this.albums.length}`;
        }
    }
}

// Загрузка при старте
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация ротатора альбомов (только на главной странице)
    if (document.getElementById('yandex-music-container')) {
        const albumRotator = new AlbumRotator();
        albumRotator.init();
        console.log('🎵 Ротатор альбомов запущен (смена каждую минуту)');
    }
});
