class MusicAPI {
    async searchTracks(query) {
        try {
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=musicTrack&country=US`
            );
            
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            
            const data = await response.json();
            
            if (!data.results || data.results.length === 0) {
                return this.getDemoTracks(query);
            }
            
            return data.results.map(track => ({
                name: track.trackName,
                artist: track.artistName,
                album: track.collectionName || 'Неизвестный альбом',
                image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '250x250bb') : this.getDefaultImage(),
                preview: track.previewUrl
            }));
            
        } catch (error) {
            console.error('Music API error:', error);
            return this.getDemoTracks(query);
        }
    }

    async getTopTracks() {
        try {
            const popularQueries = ['pop', 'rock', 'hip hop', 'electronic', 'r&b', 'dance'];
            const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
            
            const response = await fetch(
                `https://itunes.apple.com/search?term=${randomQuery}&entity=musicTrack&country=US`
            );
            
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            
            const data = await response.json();
            
            if (!data.results || data.results.length === 0) {
                return this.getDemoTopTracks();
            }
            
            return data.results.map(track => ({
                name: track.trackName,
                artist: track.artistName,
                album: track.collectionName || 'Неизвестный альбом',
                image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '250x250bb') : this.getDefaultImage(),
                preview: track.previewUrl
            }));
            
        } catch (error) {
            console.error('Top tracks error:', error);
            return this.getDemoTopTracks();
        }
    }

    getDefaultImage() {
        return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=250&h=250&fit=crop';
    }

    getDemoTracks(query) {
        const allTracks = this.getDemoTopTracks();
        const filtered = allTracks.filter(track => 
            track.name.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase())
        );
        return filtered.length > 0 ? filtered : allTracks.slice(0, 4);
    }

    getDemoTopTracks() {
        return [
            {
                name: "Blinding Lights",
                artist: "The Weeknd",
                album: "After Hours",
                image: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d1/3d/33/d13d33a9-91c9-d555-7b71-241ac2cb0a0a/20UMGIM53933.rgb.jpg/250x250bb.jpg",
                preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/50/5c/32/505c32a1-04e5-8f6f-8676-6e4c24c0a837/mzaf_13346412281003489284.plus.aac.p.m4a"
            },
            {
                name: "Flowers",
                artist: "Miley Cyrus",
                album: "Endless Summer Vacation",
                image: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/60/0a/6c/600a6c87-ecd7-5e1b-5b13-7e8c4d811d41/23UMGIM89099.rgb.jpg/250x250bb.jpg",
                preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/5e/4b/3c/5e4b3c9c-7d8b-8c8c-7b4f-7e9e4b3c9c7d/mzaf_13346412281003489284.plus.aac.p.m4a"
            }
        ];
    }
}

class AudioManager {
    constructor() {
        this.currentAudio = null;
        this.currentPlayingButton = null;
    }

    playAudio(previewUrl, button) {
        if (this.currentPlayingButton === button && this.currentAudio) {
            if (this.currentAudio.paused) {
                this.currentAudio.play();
                button.innerHTML = '⏸';
                button.classList.add('playing');
            } else {
                this.currentAudio.pause();
                button.innerHTML = '▶';
                button.classList.remove('playing');
            }
            return;
        }
        
        if (this.currentAudio) {
            this.currentAudio.pause();
            if (this.currentPlayingButton) {
                this.currentPlayingButton.innerHTML = '▶';
                this.currentPlayingButton.classList.remove('playing');
            }
        }
        
        if (!previewUrl) {
            button.style.opacity = '0.5';
            return;
        }
        
        try {
            this.currentAudio = new Audio(previewUrl);
            this.currentPlayingButton = button;

            button.innerHTML = '⏸';
            button.classList.add('playing');

            this.currentAudio.play();

            this.currentAudio.onended = () => this.onAudioEnded();
            this.currentAudio.onerror = () => this.onAudioError();
            
        } catch (error) {
            console.error('Audio error:', error);
            this.onAudioError();
        }
    }

    onAudioEnded() {
        if (this.currentPlayingButton) {
            this.currentPlayingButton.innerHTML = '▶';
            this.currentPlayingButton.classList.remove('playing');
        }
        this.currentAudio = null;
        this.currentPlayingButton = null;
    }

    onAudioError() {
        if (this.currentPlayingButton) {
            this.currentPlayingButton.innerHTML = '▶';
            this.currentPlayingButton.classList.remove('playing');
            this.currentPlayingButton.style.opacity = '0.5';
        }
        this.currentAudio = null;
        this.currentPlayingButton = null;
    }
}

const musicAPI = new MusicAPI();
const audioManager = new AudioManager();

document.getElementById('search-btn')?.addEventListener('click', performSearch);
document.getElementById('search-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

async function performSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('music-results');
    const query = input.value.trim();
    
    if (!query) {
        resultsContainer.innerHTML = '<div class="error">Введите название трека или артиста</div>';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Поиск музыки в iTunes...</div>';
    
    try {
        const tracks = await musicAPI.searchTracks(query);
        
        if (tracks.length === 0) {
            resultsContainer.innerHTML = '<div class="error">Музыка не найдена. Попробуйте другой запрос</div>';
            return;
        }
        
        renderTracks(tracks, 'Найдено');
        
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="error">Ошибка при поиске музыки</div>';
    }
}

function renderTracks(tracks, title) {
    const resultsContainer = document.getElementById('music-results');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            🎵 ${title} ${tracks.length} треков
        </div>
        <div class="playlist-container">
            ${tracks.map((track, index) => `
                <div class="track-row">
                    <div class="track-number">${index + 1}</div>
                    <img src="${track.image}" alt="${track.album}" class="track-image">
                    <div class="track-name" title="${track.name}">${track.name}</div>
                    <div class="track-artist" title="${track.artist}">${track.artist}</div>
                    <div class="track-album" title="${track.album}">${track.album}</div>
                    <div class="track-preview">
                        ${track.preview ? 
                            `<button class="play-button" data-preview="${track.preview}">
                                ▶
                            </button>` : 
                            '<span style="color: #a0aec0; font-size: 0.8rem;">—</span>'
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', function() {
            const previewUrl = this.getAttribute('data-preview');
            audioManager.playAudio(previewUrl, this);
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('music-results');
    if (resultsContainer && resultsContainer.innerHTML.includes('Используйте поиск')) {
        try {
            const tracks = await musicAPI.getTopTracks();
            if (tracks.length > 0) {
                renderTracks(tracks, 'Популярные');
            }
        } catch (error) {

        }
    }
});