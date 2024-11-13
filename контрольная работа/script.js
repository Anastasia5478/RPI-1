document.addEventListener('DOMContentLoaded', () => {
    const tripForm = document.getElementById('trip-form');
    const tripList = document.getElementById('trip-list');
    const filterForm = document.getElementById('filter-form');

    let trips = [];
    let editingIndex = null;

    // Обработчик отправки формы для добавления/редактирования поездки
    tripForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const destination = document.getElementById('trip-destination').value;
        const date = document.getElementById('trip-date').value;
        const notes = document.getElementById('trip-notes').value;

        if (editingIndex !== null) {
            // Редактирование существующей поездки
            trips[editingIndex] = { destination, date, notes };
            editingIndex = null;
        } else {
            // Добавление новой поездки
            const newTrip = { destination, date, notes };
            trips.push(newTrip);
        }

        renderTrips();
        tripForm.reset();
    });

    // Функция для отображения списка поездок
    function renderTrips(filteredTrips = trips) {
        tripList.innerHTML = ''; // Очистка текущего списка

        filteredTrips.forEach((trip, index) => {
            const tripItem = document.createElement('li');
            tripItem.className = 'trip-item';

            const tripInfo = document.createElement('span');
            tripInfo.innerHTML = '<strong>' + trip.destination + '</strong> - ' + trip.date + ' - ' + trip.notes;

            const editButton = document.createElement('button');
            editButton.textContent = 'Редактировать';
            editButton.onclick = () => editTrip(index);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => removeTrip(index);

            tripItem.appendChild(tripInfo);
            tripItem.appendChild(editButton);
            tripItem.appendChild(removeButton);
            tripList.appendChild(tripItem);
        });
    }

    // Функция для редактирования поездки
    function editTrip(index) {
        const trip = trips[index];
        document.getElementById('trip-destination').value = trip.destination;
        document.getElementById('trip-date').value = trip.date;
        document.getElementById('trip-notes').value = trip.notes;
        editingIndex = index; // Устанавливаем индекс редактируемой поездки
    }

    // Функция для удаления поездки
    window.removeTrip = function(index) {
        trips.splice(index, 1); // Удаление поездки из массива
        renderTrips(); // Обновление интерфейса
    };

    // Обработчик отправки формы фильтрации
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const startDate = new Date(document.getElementById('filter-start-date').value);
        const endDate = new Date(document.getElementById('filter-end-date').value);
        
        const filteredTrips = trips.filter(trip => {
            const tripDate = new Date(trip.date);
            return tripDate >= startDate && tripDate <= endDate;
        });

        renderTrips(filteredTrips);
    });
});
