import"./main-DNEiqr4I.js";class d{async searchBooks(t){try{const r=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(t)}&printType=books`);if(!r.ok)throw new Error("Ошибка сети");const e=await r.json();return!e.items||e.items.length===0?[]:e.items.map(n=>{const s=n.volumeInfo;return{title:s.title||"Название неизвестно",author:s.authors?s.authors.join(", "):"Автор неизвестен",year:s.publishedDate?s.publishedDate.substring(0,4):"Год неизвестен",description:s.description?s.description.substring(0,120)+"...":"Описание отсутствует",image:s.imageLinks?s.imageLinks.thumbnail:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=168&fit=crop",preview:s.previewLink||null,info:s.infoLink||null}})}catch(r){throw console.error("Books API error:",r),new Error("Не удалось найти книги")}}}const o=new d;document.getElementById("search-btn")?.addEventListener("click",a);document.getElementById("search-input")?.addEventListener("keypress",i=>{i.key==="Enter"&&a()});async function a(){const i=document.getElementById("search-input"),t=document.getElementById("books-results"),r=i.value.trim();if(!r){t.innerHTML='<div class="error">Введите поисковый запрос</div>';return}t.innerHTML='<div class="loading">Поиск книг...</div>';try{const e=await o.searchBooks(r);if(e.length===0){t.innerHTML='<div class="error">Книги не найдены. Попробуйте другой запрос</div>';return}c(e,"Найдено")}catch(e){console.error("Search error:",e),t.innerHTML='<div class="error">Ошибка при поиске книг</div>'}}function c(i,t){const r=document.getElementById("books-results");r.innerHTML=`
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            📚 ${t} ${i.length} книг
        </div>
        <div class="books-container">
            <div class="books-header">
                <div>#</div>
                <div class="header-image">📖</div>
                <div>Название</div>
                <div>Автор</div>
                <div class="header-year">Год</div>
                <div class="header-actions">Действия</div>
            </div>
            ${i.map((e,n)=>`
                <div class="book-row">
                    <div class="book-number">${n+1}</div>
                    <img src="${e.image}" alt="${e.title}" class="book-image">
                    <div class="book-title" title="${e.title}">${e.title}</div>
                    <div class="book-author" title="${e.author}">${e.author}</div>
                    <div class="book-year">${e.year}</div>
                    <div class="book-actions">
                        ${e.preview?`<a href="${e.preview}" target="_blank" class="preview-button" title="Читать превью">
                                📖 Читать
                            </a>`:'<span style="color: #a0aec0; font-size: 0.8rem;">—</span>'}
                    </div>
                </div>
            `).join("")}
        </div>
    `}document.addEventListener("DOMContentLoaded",async()=>{const i=document.getElementById("books-results");if(i&&i.innerHTML.includes("Используйте поиск"))try{const t=await o.searchBooks("Музыка");t.length>0&&c(t.slice(0,20),"Популярные книги о программировании")}catch{}});
