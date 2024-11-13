class TripView {
    constructor() {
        this.tripListElement = document.getElementById('trip-list');
        this.dateFilterElement = document.getElementById('date-filter');
        this.completedFilterElement = document.getElementById('completed-filter');
        
        this.dateFilterElement.addEventListener('change', () => this.onFilterChange());
        this.completedFilterElement.addEventListener('change', () => this.onFilterChange());
    }

    render(trips) {
        this.tripListElement.innerHTML = '';

        trips.forEach((trip, index) => {
            const tripItem = document.createElement('li');
            tripItem.className = 'trip-item';
            tripItem.innerHTML = `
                ${trip
.destination} - ${trip.date} - ${trip.notes} - ${trip.status}
                <button onclick="presenter.removeTrip(${index})">Удалить</button>
            `;
            this.tripListElement.appendChild(tripItem);
        });
    }

    onFilterChange() {
        
        presenter.applyFilters(this.dateFilterElement.value, this.completedFilterElement.checked);
    }
}

const tripView = new TripView();