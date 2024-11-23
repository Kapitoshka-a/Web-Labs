

document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.getElementById('sort-checkbox');
    const countButton = document.getElementById('count-button');
    const totalPriceSpan = document.getElementById('total-price'); // Поле для відображення загальної ціни
    const searchInput = document.getElementById('input-search'); // Поле вводу для пошуку
    const searchButton = document.getElementById('search-button'); // Кнопка пошуку
    const resetButton = document.getElementById('reset_button'); // Кнопка очищення

    // Функція для завантаження елементів із сортуванням і пошуком
    function fetchItems(sortOrder = 'asc', searchQuery = '') {
        fetch(`/modellen?sort=${sortOrder}&q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("items-container");
            container.innerHTML = "";  // Очищаємо контейнер перед додаванням нових елементів

            data.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                itemDiv.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}" class="image">
                    <div class="item-info">
                        <h1 class="item-name">${item.name}</h1>
                        <p class="item-description">${item.description}</p>
                        <p><span class="price">${item.price}</span>$</p>
                        <p class="item-lastupdate">
                            <span>${new Date(item.updated).toLocaleString()}</span>
                        </p>
                        <div class="item-buttons">
                            <label class="item-buttons-detail">
                                <a href="/item_edit/${item.id}/" class="edit-button" data-pk="${item.id}">Edit</a>
                            </label>
                            <label class="item-buttons-detail">
                                <button class="remove-button" data-id="${item.id}">Remove</button>
                            </label>
                        </div>
                    </div>
                `;

                // Логіка видалення елементів
                const deleteButton = itemDiv.querySelector('.remove-button');
                deleteButton.addEventListener('click', function(event) {
                    event.preventDefault();  // Запобігаємо стандартній дії

                    const itemId = deleteButton.getAttribute('data-id');

                    // Підтвердження видалення
                    if (confirm('Are you sure you want to delete this house?')) {
                        fetch(`/delete/${itemId}/`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRFToken': getCsrfToken(),  // CSRF токен для безпеки
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                alert('House deleted successfully.');
                                itemDiv.remove();  // Видаляємо елемент з DOM
                            } else {
                                alert('Error deleting house: ' + response.statusText);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('An error occurred: ' + error.message);
                        });
                    }
                });

                container.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
    }

    // Функція для обчислення загальної ціни
    function calculateTotalPrice(sortOrder = 'asc', searchQuery = '') {
        fetch(`/modellen?sort=${sortOrder}&q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            totalPriceSpan.textContent = `${data.total_price}$`; // Оновлюємо загальну ціну
        })
        .catch(error => {
            console.error("Error fetching total price:", error);
        });
    }

    // Початкове завантаження за замовчуванням (по зростанню)
    fetchItems('asc');

    // Додаємо обробник зміни стану чекбокса для зміни порядку сортування
    checkbox.addEventListener('change', function() {
        const sortOrder = this.checked ? 'desc' : 'asc';  // Якщо чекбокс відмічений, сортувати за спаданням
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        fetchItems(sortOrder, searchQuery);  // Оновлюємо елементи на основі нового порядку
    });

    // Додаємо обробник натискання кнопки "Search"
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Запобігаємо стандартній дії кнопки
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        fetchItems(currentSortOrder, searchQuery); // Оновлюємо елементи на основі нового пошуку
    });

    // Додаємо обробник натискання кнопки "Count"
    countButton.addEventListener('click', function() {
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        const searchQuery = searchInput.value; // Отримуємо текст пошуку
        calculateTotalPrice(currentSortOrder, searchQuery); // Викликаємо функцію для обчислення загальної ціни
    });

    // Додаємо обробник натискання кнопки "Clear"
    resetButton.addEventListener('click', function() {
        searchInput.value = ''; // Очищаємо поле вводу
        const currentSortOrder = checkbox.checked ? 'desc' : 'asc'; // Отримуємо поточний порядок сортування
        fetchItems(currentSortOrder, ''); // Оновлюємо елементи без фільтру
        totalPriceSpan.textContent = ''; // Очищаємо загальну ціну
    });
});

// Функція для отримання CSRF-токена
function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
