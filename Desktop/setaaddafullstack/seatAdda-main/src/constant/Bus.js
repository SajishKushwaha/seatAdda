import routesData from "./Route";
const busData = [
  {
    id: 1,
    operatorName: "Ashok Kothari Travels",
    busType: "AC",
    arrivalTime: "9:50",
    departureTime: "10:00",
    totalSeats: 40,
    filledSeats: ["U12", "L5", "L8", "L12", "U3", "l7", "U8"],
    fare: 1200,
    routes: routesData[0], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },
  {
    id: 2,
    operatorName: "Shree Krishna Travels",
    busType: "Non AC",
    arrivalTime: "14:10",
    departureTime: "14:30",
    totalSeats: 40,
    filledSeats: ["U12", "L5", "L8", "L12", "U8"],
    fare: 1500,
    routes: routesData[1], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },

  {
    id: 3,
    operatorName: "Kothari Ji Travels",
    busType: "Seater",
    arrivalTime: "20:15",
    departureTime: "20:30",
    totalSeats: 40,
    filledSeats: [2, 35, 8, 12, 24, 17, 31,29],
    fare: 1000,
    routes: routesData[1], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },

  {
    id: 4,
    operatorName: "Shree Parswanath Ji Travels",
    busType: "Sleeper",
    arrivalTime: "22:15",
    departureTime: "23:30",
    totalSeats: 40,
    filledSeats: ["U12", "L5", "L8", "L12", "U8", "L1", "L9", "U1", "U6"],
    fare: 2000,
    routes: routesData[1], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },

  {
    id: 5,
    operatorName: "Shree Ganesh Travels",
    busType: "Sleeper",
    arrivalTime: "04:15",
    departureTime: "05:30",
    totalSeats: 40,
    filledSeats: ["U12", "L5", "L8", "L12", "U8", "L1", "L9", "U1", "U6"],
    fare: 2400,
    routes: routesData[1], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },
  {
    id: 6,
    operatorName: "ABCD Travels",
    busType: "AC",
    arrivalTime: "10:15",
    departureTime: "11:30",
    totalSeats: 40,
    filledSeats: ["U12", "L5", "L8", "L12", "U8", "L1", "L9", "U1", "U6"],
    fare: 2800,
    routes: routesData[1], // Replace with the desired route object from the routesData array
    liveTracking: 1, // 1 if live tracking is available, 0 if not
    reschedulable: 1, // 1 if the bus is reschedulable, 0 if not
  },
  // Add more sample data objects here
];

export default busData;
