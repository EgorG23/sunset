import"./main-DQ5Y0OTh.js";const s=[{name:"Blinding Lights",artist:"The Weeknd",album:"After Hours",image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"},{name:"Save Your Tears",artist:"The Weeknd",album:"After Hours",image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"},{name:"Levitating",artist:"Dua Lipa",album:"Future Nostalgia",image:"https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=150&h=150&fit=crop"},{name:"Flowers",artist:"Miley Cyrus",album:"Endless Summer Vacation",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=150&h=150&fit=crop"},{name:"As It Was",artist:"Harry Styles",album:"Harry's House",image:"https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=150&h=150&fit=crop"},{name:"Anti-Hero",artist:"Taylor Swift",album:"Midnights",image:"https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=150&h=150&fit=crop"}];function e(){const t=document.getElementById("spotify-playlist");t&&setTimeout(()=>{t.innerHTML=s.map(a=>`
            <div class="track-card">
                <img src="${a.image}" alt="${a.album}" class="track-image">
                <div class="track-info">
                    <h4>${a.name}</h4>
                    <p>${a.artist}</p>
                    <p><small>${a.album}</small></p>
                </div>
            </div>
        `).join("")},1e3)}document.addEventListener("DOMContentLoaded",e);
