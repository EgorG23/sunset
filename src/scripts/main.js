// Демо данные для Spotify виджета на главной странице
const demoMusicData = [
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
    },
    {
        name: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
    },
    {
        name: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=150&h=150&fit=crop"
    },
    {
        name: "Flowers",
        artist: "Miley Cyrus",
        album: "Endless Summer Vacation",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=150&h=150&fit=crop"
    },
    {
        name: "As It Was",
        artist: "Harry Styles",
        album: "Harry's House",
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=150&h=150&fit=crop"
    },
    {
        name: "Anti-Hero",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=150&h=150&fit=crop"
    }
];

// Загрузка Spotify виджета на главной странице
function loadSpotifyWidget() {
    const container = document.getElementById('spotify-playlist');
    
    if (!container) return;

    // Имитация загрузки
    setTimeout(() => {
        container.innerHTML = demoMusicData.map(track => `
            <div class="track-card">
                <img src="${track.image}" alt="${track.album}" class="track-image">
                <div class="track-info">
                    <h4>${track.name}</h4>
                    <p>${track.artist}</p>
                    <p><small>${track.album}</small></p>
                </div>
            </div>
        `).join('');
    }, 1000);
}

// Загрузка при старте
document.addEventListener('DOMContentLoaded', loadSpotifyWidget);