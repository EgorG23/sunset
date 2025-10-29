class BooksAPI {
    async searchBooks(query) {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&printType=books`);
            
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            
            const data = await response.json();
            
            if (!data.items || data.items.length === 0) {
                return [];
            }
            
            return data.items.map(item => {
                const volumeInfo = item.volumeInfo;
                return {
                    title: volumeInfo.title || 'Название неизвестно',
                    author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Автор неизвестен',
                    year: volumeInfo.publishedDate ? volumeInfo.publishedDate.substring(0, 4) : 'Год неизвестен',
                    description: volumeInfo.description ? 
                        volumeInfo.description.substring(0, 120) + '...' : 
                        'Описание отсутствует',
                    image: volumeInfo.imageLinks ? 
                        volumeInfo.imageLinks.thumbnail : 
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=168&fit=crop',
                    preview: volumeInfo.previewLink || null,
                    info: volumeInfo.infoLink || null
                };
            });
            
        } catch (error) {
            console.error('Books API error:', error);
            throw new Error('Не удалось найти книги');
        }
    }
}

const booksAPI = new BooksAPI();

document.getElementById('search-btn')?.addEventListener('click', performSearch);
document.getElementById('search-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

async function performSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('books-results');
    const query = input.value.trim();
    
    if (!query) {
        resultsContainer.innerHTML = '<div class="error">Введите поисковый запрос</div>';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Поиск книг...</div>';
    
    try {
        const books = await booksAPI.searchBooks(query);
        
        if (books.length === 0) {
            resultsContainer.innerHTML = '<div class="error">Книги не найдены. Попробуйте другой запрос</div>';
            return;
        }
        
        renderBooks(books, 'Найдено');
        
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="error">Ошибка при поиске книг</div>';
    }
}

function renderBooks(books, title) {
    const resultsContainer = document.getElementById('books-results');
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem;">
            📚 ${title} ${books.length} книг
        </div>
        <div class="books-container">
            ${books.map((book, index) => `
                <div class="book-row">
                    <div class="book-number">${index + 1}</div>
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                    <div class="book-title" title="${book.title}">${book.title}</div>
                    <div class="book-author" title="${book.author}">${book.author}</div>
                    <div class="book-year">${book.year}</div>
                    <div class="book-actions">
                        ${book.preview ? 
                        `<a href="${book.preview}" target="_blank" class="preview-button">📖 Читать</a>` : 
                        '<span style="color: #a0aec0; font-size: 0.8rem;">—</span>'
                        }
                    </div>
                </div>

            `).join('')}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('books-results');
    if (resultsContainer && resultsContainer.innerHTML.includes('Используйте поиск')) {
        try {
            const books = await booksAPI.searchBooks('Музыка');
            if (books.length > 0) {
                renderBooks(books.slice(0, 20), 'Популярные книги о программировании');
            }
        } catch (error) {
        }
    }
});