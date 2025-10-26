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
        ];
        this.currentAlbumIndex = this.getMinuteOfHour() % this.albums.length;
        this.startAutoRotation();
    }

    getMinuteOfHour() {
        return new Date().getMinutes();
    }

    getDayOfMonth() {
        return new Date().getDate();
    }

    startAutoRotation() {
        setInterval(() => {
            this.currentAlbumIndex = (this.currentAlbumIndex + 1) % this.albums.length;
            this.updateWidget();
            console.log(`Автосмена альбома: ${this.albums[this.currentAlbumIndex].title}`);
        }, 60000);
    }

    updateWidget() {
        const container = document.getElementById('yandex-music-container');
        const currentAlbum = this.albums[this.currentAlbumIndex];
        
        if (container) {
            container.innerHTML = `
                <div class="album-info">
                    <h3>${currentAlbum.title}</h3>
                    <p class="album-artist">${currentAlbum.artist}</p>
                </div>
                ${currentAlbum.html}
            `;
            this.updateSectionTitle(currentAlbum);
        }
    }

    updateSectionTitle(album) {
        const widgetSection = document.querySelector('.spotify-widget h2');
        if (widgetSection) {
            widgetSection.innerHTML = `🎵 Альбом дня: <span class="album-title">${album.title}</span>`;
        }
    }

    init() {
        this.updateWidget();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('yandex-music-container')) {
        const albumRotator = new AlbumRotator();
        albumRotator.init();
        console.log('🎵 Ротатор альбомов запущен (смена каждую минуту)');
    }
});