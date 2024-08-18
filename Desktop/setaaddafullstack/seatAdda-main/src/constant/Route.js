const routesData = [
  {
    _id: "1",
    departureLocation: {
      name: "Delhi",
      subLocations: [
        "Sublocation B1",
        "Sublocation A1",
        "Sublocation B2",
        "Sublocation A2",
        "Sublocation B3",
        "Sublocation C3",
        "Sublocation C4",
        "Sublocation B5",
      ],
    },
    arrivalLocation: {
      name: "Mumbai",
      subLocations: [
        "Sublocation B1",
        "Sublocation C1",
        "Sublocation B2",
        "Sublocation C2",
        "Sublocation B4",
        "Sublocation B5",
        "Sublocation C3",
        "Sublocation B3",
      ],
    },
    duration: 60,
  },
  {
    _id: "2",
    departureLocation: {
      name: "Delhi",
      subLocations: [
        "Sublocation B1",
        "Sublocation B2",
        "Sublocation A3",
        "Sublocation B4",
        "Sublocation A5",
        "Sublocation B6",
        "Sublocation A6",
        "Sublocation C7",
        "Sublocation B8",
      ],
    },
    arrivalLocation: {
      name: "Mumbai",
      subLocations: [
        "Sublocation B2",
        "Sublocation C1",
        "Sublocation A2",
        "Sublocation E2",
        "Sublocation C2",
        "Sublocation B3",
        "Sublocation C3",
        "Sublocation B4",
      ],
    },
    duration: 120,
  },
  // Add more sample route objects here
];

export default routesData;
