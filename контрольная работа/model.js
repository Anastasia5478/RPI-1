class TripModel {
    constructor() {
        this.trips = [];
    }

    addTrip(destination, date, notes, status) {
        const trip = { destination, date, notes, status };
        this.trips.push(trip);
        this.notify();
    }

    removeTrip(index) {
        this.trips.splice(index, 1);
        this.notify();
    }

    getTrips() {
        return this.trips;
    }

    subscribe(callback) {
        this.callback = callback;
    }

    notify() {
        if (this.callback) {
            this.callback(this.trips);
        }
    }
}

const tripModel = new TripModel();