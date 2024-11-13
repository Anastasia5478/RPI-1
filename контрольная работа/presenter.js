class TripPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        
        this.model.subscribe((trips) => this.view.render(trips));

        
        document.getElementById('trip-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const destination = document.getElementById('trip-destination').value;
            const date = document.getElementById('trip-date').value;
            const notes = document.getElementById('trip-notes').value;
            const status = document.querySelector('input[name="trip-status"]:checked').value;

            this.model.addTrip(destination, date, notes, status);
            event.target.reset();
        });
    }

    removeTrip(index) {
        this.model.removeTrip(index);
    }
}
