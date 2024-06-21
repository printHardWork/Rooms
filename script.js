class Room {
    constructor(Roomnumber, Floornumber) {
        this.Roomnumber = Roomnumber;
        this.Floornumber = Floornumber;
        this.Roomtype = "Standard";
        this.isOccupied = false;
        this.capacity = 2;
        this.pricePerNight = Math.random() * 200;
        this.Customername = new Array(2);

        if (Roomnumber > 101 && Roomnumber < 110) {
            this.Floornumber = 1;
        } else if (Roomnumber > 201 && Roomnumber < 210) {
            this.Floornumber = 2;
        } else if (Roomnumber > 301 && Roomnumber < 310) {
            this.Floornumber = 3;
        } else if (Roomnumber > 401 && Roomnumber < 410) {
            this.Floornumber = 4;
        } else if (Roomnumber > 501 && Roomnumber < 510) {
            this.Floornumber = 5;
        }
    }

    toString() {
        return `Room number: ${this.Roomnumber}, Floor number: ${this.Floornumber}, Room type: ${this.Roomtype}, isOccupied: ${this.isOccupied}, Customer: ${this.Customername[0]} ${this.Customername[1]}, Capacity: ${this.capacity}, Price per Night: ${this.pricePerNight.toFixed(2)}`;
    }
}

class RoomManagement {
    constructor() {
        this.rooms = [];
        this.initializeRooms();
    }

    initializeRooms() {
        let roomNumber = 101;
        let floorNumber = 1;

        for (let i = 0; i < 50; i++) {
            let room = new Room(roomNumber, floorNumber);
            if (floorNumber === 1 || floorNumber === 2) {
                room.Roomtype = "Standard";
            } else if (floorNumber === 3 || floorNumber === 4) {
                room.Roomtype = "Family";
            } else if (floorNumber === 5) {
                room.Roomtype = "Suite";
            }
            this.rooms.push(room);
            roomNumber++;

            if (roomNumber % 100 == 11) {
                roomNumber += 90;
                floorNumber++;
            }
        }
    }

    showAllRooms() {
        return this.rooms.map(room => room.toString()).join('\n');
    }

    showAvailableRooms() {
        return this.rooms.filter(room => !room.isOccupied).map(room => room.toString()).join('\n');
    }

    changeRoomDetails(roomNumber, roomType, isOccupied, capacity, pricePerNight) {
        let room = this.rooms.find(room => room.Roomnumber == roomNumber);
        if (room) {
            room.Roomtype = roomType;
            room.isOccupied = isOccupied;
            room.capacity = capacity;
            room.pricePerNight = pricePerNight;
            return "Room details updated successfully.";
        }
        return "Room not found.";
    }

    searchByRoomType(roomType) {
        return this.rooms.filter(room => room.Roomtype.toLowerCase() == roomType.toLowerCase()).map(room => room.toString()).join('\n');
    }

    searchByCapacity(capacity) {
        return this.rooms.filter(room => room.capacity == capacity).map(room => room.toString()).join('\n');
    }

    sortRoomsByPrice() {
        return this.rooms.sort((a, b) => a.pricePerNight - b.pricePerNight).map(room => room.toString()).join('\n');
    }

    reserveSpecificRoom(Roomnumber, Firstname, Lastname) {
        let room = this.rooms.find(room => room.Roomnumber == Roomnumber);
        if (room) {
            room.isOccupied = true;
            room.Customername[0] = Firstname;
            room.Customername[1] = Lastname;
            return `Room ${Roomnumber} has been reserved by ${Firstname} ${Lastname}.`;
        }
        return `Room ${Roomnumber} does not exist.`;
    }
}

const roomanage = new RoomManagement();

function showAllRooms() {
    document.getElementById('output').innerText = roomanage.showAllRooms();
}

function showAvailableRooms() {
    document.getElementById('output').innerText = roomanage.showAvailableRooms();
}

function changeRoomDetails() {
    let roomNumber = prompt("Enter room number:");
    let roomType = prompt("Enter room type (Standard, Family, Suite):");
    let isOccupied = prompt("Enter isOccupied status (true or false):") === 'true';
    let capacity = parseInt(prompt("Enter capacity (1 - 10):"));
    let pricePerNight = parseFloat(prompt("Enter price per night:"));
    let message = roomanage.changeRoomDetails(roomNumber, roomType, isOccupied, capacity, pricePerNight);
    document.getElementById('output').innerText = message;
}

function searchByRoomType() {
    let roomType = prompt("Enter room type (Standard, Family, Suite):");
    document.getElementById('output').innerText = roomanage.searchByRoomType(roomType);
}

function searchByCapacity() {
    let capacity = parseInt(prompt("Enter capacity:"));
    document.getElementById('output').innerText = roomanage.searchByCapacity(capacity);
}

function sortRoomsByPrice() {
    document.getElementById('output').innerText = roomanage.sortRoomsByPrice();
}

function reserveSpecificRoom() {
    let roomNumber = parseInt(prompt("Enter room number:"));
    let firstName = prompt("Enter customer first name:");
    let lastName = prompt("Enter customer last name:");
    let message = roomanage.reserveSpecificRoom(roomNumber, firstName, lastName);
    document.getElementById('output').innerText = message;
}
