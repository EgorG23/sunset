import"./main-BZLj-QyK.js";class l{async searchBooks(t){try{const s=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(t)}&printType=books`);if(!s.ok)throw new Error("Ошибка сети");const e=await s.json();return!e.items||e.items.length===0?[]:e.items.map(o=>{const r=o.volumeInfo;return{title:r.title||"Название неизвестно",author:r.authors?r.authors.join(", "):"Автор неизвестен",year:r.publishedDate?r.publishedDate.substring(0,4):"Год неизвестен",description:r.description?r.description.substring(0,120)+"...":"Описание отсутствует",image:r.imageLinks?r.imageLinks.thumbnail:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=168&fit=crop",preview:r.previewLink||null,info:r.infoLink||null}})}catch(s){throw console.error("Books API error:",s),new Error("Не удалось найти книги")}}}const i=new l;document.getElementById("search-btn")?.addEventListener("click",a);document.getElementById("search-input")?.addEventListener("keypress",n=>{n.key==="Enter"&&a()});async function a(){const n=document.getElementById("search-input"),t=document.getElementById("books-results"),s=n.value.trim();if(!s){t.innerHTML='<div class="error">Введите поисковый запрос</div>';return}t.innerHTML='<div class="loading">Поиск книг...</div>';try{const e=await i.searchBooks(s);if(e.length===0){t.innerHTML='<div class="error">Книги не найдены. Попробуйте другой запрос</div>';return}c(e,"Найдено")}catch(e){console.error("Search error:",e),t.innerHTML='<div class="error">Ошибка при поиске книг</div>'}}function c(n,t){const s=document.getElementById("books-results");s.innerHTML=`
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            📚 ${t} ${n.length} книг
        </div>
        <div class="books-container">
            ${n.map((e,o)=>`
                <div class="book-row">
                    <div class="book-number">${o+1}</div>
                    <img src="${e.image}" alt="${e.title}" class="book-image">
                    <div class="book-title" title="${e.title}">${e.title}</div>
                    <div class="book-author" title="${e.author}">${e.author}</div>
                    <div class="book-year">${e.year}</div>
                    <div class="book-actions">
                        ${e.preview?`<a href="${e.preview}" target="_blank" class="preview-button">📖 Читать</a>`:'<span style="color: #a0aec0; font-size: 0.8rem;">—</span>'}
                    </div>
                </div>

            `).join("")}
        </div>
    `}document.addEventListener("DOMContentLoaded",async()=>{const n=document.getElementById("books-results");if(n&&n.innerHTML.includes("Используйте поиск"))try{const t=await i.searchBooks("Музыка");t.length>0&&c(t.slice(0,20),"Популярные книги о программировании")}catch{}});
