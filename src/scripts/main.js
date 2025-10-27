class AlbumRotator {
    constructor() {
        this.albums = [
            {
                id: 1,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/30346230">Слушайте <a href="https://music.yandex.ru/album/30346230?utm_source=desktop&utm_medium=copy_link">GUTS (spilled)</a> — <a href="https://music.yandex.ru/artist/4654635">Olivia Rodrigo</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 2,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/31266458">Слушайте <a href="https://music.yandex.ru/album/31266458?utm_source=desktop&utm_medium=copy_link">HIT ME HARD AND SOFT</a> — <a href="https://music.yandex.ru/artist/4353492">Billie Eilish</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 3,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/37999752">Слушайте <a href="https://music.yandex.ru/album/37999752">Man's Best Friend</a> — <a href="https://music.yandex.ru/artist/2001010">Sabrina Carpenter</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 4,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/34065401">Слушайте <a href="https://music.yandex.ru/album/34065401?utm_source=desktop&utm_medium=copy_link">Die With A Smile</a> — <a href="https://music.yandex.ru/artist/1438">Lady Gaga</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 5,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/37196930">Слушайте <a href="https://music.yandex.ru/album/37196930?utm_source=desktop&utm_medium=copy_link">Virgin</a> — <a href="https://music.yandex.ru/artist/1654436">Lorde</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 6,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/37815457">Слушайте <a href="https://music.yandex.ru/album/37815457?utm_source=desktop&utm_medium=copy_link">Man I Need</a> — <a href="https://music.yandex.ru/artist/8197193">Olivia Dean</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 7,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/6082708">Слушайте <a href="https://music.yandex.ru/album/6082708?utm_source=desktop&utm_medium=copy_link">Golden Hour</a> — <a href="https://music.yandex.ru/artist/863355">Kacey Musgraves</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 8,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/29632643">Слушайте <a href="https://music.yandex.ru/album/29632643?utm_source=desktop&utm_medium=copy_link">The Rise and Fall of a Midwest Princess</a> — <a href="https://music.yandex.ru/artist/5246714">Chappell Roan</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 9,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/30812341">Слушайте <a href="https://music.yandex.ru/album/30812341?utm_source=desktop&utm_medium=copy_link">THE TORTURED POETS DEPARTMENT</a> — <a href="https://music.yandex.ru/artist/4065">Taylor Swift</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 10,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/34123013">Слушайте <a href="https://music.yandex.ru/album/34123013?utm_source=desktop&utm_medium=copy_link">GNX</a> — <a href="https://music.yandex.ru/artist/543582">Kendrick Lamar</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 11,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/13707793">Слушайте <a href="https://music.yandex.ru/album/13707793?utm_source=desktop&utm_medium=copy_link">The Highlights</a> — <a href="https://music.yandex.ru/artist/611169">The Weeknd</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 12,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/3579166">Слушайте <a href="https://music.yandex.ru/album/3579166?utm_source=desktop&utm_medium=copy_link">25</a> — <a href="https://music.yandex.ru/artist/37027">Adele</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 13,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/36057268">Слушайте <a href="https://music.yandex.ru/album/36057268?utm_source=desktop&utm_medium=copy_link">eternal sunshine deluxe: brighter days ahead</a> — <a href="https://music.yandex.ru/artist/638312">Ariana Grande</a> на Яндекс Музыке</iframe>`
            },
            {
                id: 14,
                html: `<iframe frameborder="0" allow="clipboard-write" style="border:none;width:100%;height:556px;border-radius:15px;" src="https://music.yandex.ru/iframe/album/8649063">Слушайте <a href="https://music.yandex.ru/album/8649063?utm_source=desktop&utm_medium=copy_link">Hollywood's Bleeding</a> — <a href="https://music.yandex.ru/artist/3454418">Post Malone</a> на Яндекс Музыке</iframe>`
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
            container.innerHTML = currentAlbum.html;
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