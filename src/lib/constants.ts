  const MOCK_BUSES_ROUTE_GW = {
    routeName: "Gandhipuram → Walayar",
    from: "Gandhipuram",
    to: "Walayar",
    path: [
      { lat: 11.0168, lng: 76.9639 }, { lat: 11.0084, lng: 76.9698 }, { lat: 11.0065, lng: 76.9723 },
      { lat: 11.0051, lng: 76.9744 }, { lat: 11.0040, lng: 76.9748 }, { lat: 11.0022, lng: 76.9734 },
      { lat: 10.9997, lng: 76.9680 }, { lat: 10.9975, lng: 76.9650 }, { lat: 10.9940, lng: 76.9585 },
      { lat: 10.9877, lng: 76.9616 }, { lat: 10.9780, lng: 76.9660 }, { lat: 10.9720, lng: 76.9665 },
      { lat: 10.9631, lng: 76.9575 }, { lat: 10.9576, lng: 76.9538 }, { lat: 10.9500, lng: 76.9480 },
      { lat: 10.9450, lng: 76.9450 }, { lat: 10.9380, lng: 76.9420 }, { lat: 10.9300, lng: 76.9380 },
      { lat: 10.9250, lng: 76.9350 }, { lat: 10.9210, lng: 76.9325 }, { lat: 10.9160, lng: 76.9295 },
      { lat: 10.9080, lng: 76.9250 }, { lat: 10.9050, lng: 76.9230 }, { lat: 10.8980, lng: 76.9180 },
      { lat: 10.8930, lng: 76.9150 }, { lat: 10.8880, lng: 76.9120 }, { lat: 10.8750, lng: 76.9050 },
      { lat: 10.8550, lng: 76.8850 }, { lat: 10.8400, lng: 76.8700 }, { lat: 10.8250, lng: 76.8500 }
    ],
    stops: [
      { _id: "gw1", stopName: "Gandhipuram Town Bus Stand", lat: 11.0168, lng: 76.9639, type: 'major' },
      { _id: "gw2", stopName: "Womens Polytechnic", lat: 11.0084, lng: 76.9698, type: 'small' },
      { _id: "gw3", stopName: "R.T.O", lat: 11.0065, lng: 76.9723, type: 'small' },
      { _id: "gw4", stopName: "Stanes School", lat: 11.0051, lng: 76.9744, type: 'small' },
      { _id: "gw5", stopName: "Anna Statue", lat: 11.0040, lng: 76.9748, type: 'small' },
      { _id: "gw6", stopName: "D.S.P Office", lat: 11.0022, lng: 76.9734, type: 'small' },
      { _id: "gw7", stopName: "Collector Office", lat: 10.9997, lng: 76.9680, type: 'small' },
      { _id: "gw8", stopName: "Railway Station", lat: 10.9975, lng: 76.9650, type: 'major' },
      { _id: "gw9", stopName: "Town Hall", lat: 10.9940, lng: 76.9585, type: 'major' },
      { _id: "gw10", stopName: "Ukkadam", lat: 10.9877, lng: 76.9616, type: 'major' },
      { _id: "gw11", stopName: "Karumbukadai", lat: 10.9780, lng: 76.9660, type: 'small' },
      { _id: "gw12", stopName: "Athupalam", lat: 10.9720, lng: 76.9665, type: 'small' },
      { _id: "gw13", stopName: "Kuniyamuthur High School", lat: 10.9631, lng: 76.9575, type: 'small' },
      { _id: "gw14", stopName: "Kuniyamuthur", lat: 10.9576, lng: 76.9538, type: 'major' },
      { _id: "gw15", stopName: "Nehru College", lat: 10.9500, lng: 76.9480, type: 'small' },
      { _id: "gw16", stopName: "Edayarpalayam Pirivu", lat: 10.9450, lng: 76.9450, type: 'small' },
      { _id: "gw17", stopName: "Kuniyamuthur Police Station", lat: 10.9380, lng: 76.9420, type: 'small' },
      { _id: "gw18", stopName: "B.K. Pudur", lat: 10.9300, lng: 76.9380, type: 'small' },
      { _id: "gw19", stopName: "Kovaipudur Pirivu", lat: 10.9250, lng: 76.9350, type: 'small' },
      { _id: "gw20", stopName: "Milekal", lat: 10.9210, lng: 76.9325, type: 'small' },
      { _id: "gw21", stopName: "Gandhi Nagar", lat: 10.9160, lng: 76.9295, type: 'small' },
      { _id: "gw22", stopName: "Madukkarai Police Station", lat: 10.9080, lng: 76.9250, type: 'major' },
      { _id: "gw23", stopName: "Madukkarai Union Office", lat: 10.9050, lng: 76.9230, type: 'small' },
      { _id: "gw24", stopName: "Marappalam", lat: 10.8980, lng: 76.9180, type: 'small' },
      { _id: "gw25", stopName: "Chettipalayam Pirivu", lat: 10.8930, lng: 76.9150, type: 'small' },
      { _id: "gw26", stopName: "Indian Bank", lat: 10.8880, lng: 76.9120, type: 'small' },
      { _id: "gw27", stopName: "Thirumalayampalayam Pirivu", lat: 10.8750, lng: 76.9050, type: 'small' },
      { _id: "gw28", stopName: "K.G. Chavadi", lat: 10.8550, lng: 76.8850, type: 'major' },
      { _id: "gw29", stopName: "Aallamara", lat: 10.8400, lng: 76.8700, type: 'small' },
      { _id: "gw30", stopName: "Walayar (Last Stop)", lat: 10.8250, lng: 76.8500, type: 'major' }
    ]
  };

export const MOCK_BUSES = [
  {
    "_id": "bus_cbe001",
    "busNumber": "TN-38-EO-2179",
    "busCode": "CBE001",
    "status": "Running",
    "speed": 41,
    "fare": 15,
    "availableSeats": 9,
    "departureTime": "06:30 AM",
    "arrivalTime": "08:00 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.016464145000432,
      "lng": 77.03068851732301,
      "rotation": 171
    },
    "routeId": {
      "routeName": "Gandhipuram → Singanallur",
      "from": "Gandhipuram",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe001_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe001_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe001_s2",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe002",
    "busNumber": "TN-38-TE-5161",
    "busCode": "CBE002",
    "status": "Running",
    "speed": 35,
    "fare": 25,
    "availableSeats": 10,
    "departureTime": "11:30 AM",
    "arrivalTime": "12:45 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 10.992873831314572,
      "lng": 76.96166089562733,
      "rotation": 351
    },
    "routeId": {
      "routeName": "Gandhipuram → Singanallur",
      "from": "Gandhipuram",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe002_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe002_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe002_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe002_s3",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe003",
    "busNumber": "TN-38-FT-7382",
    "busCode": "CBE003",
    "status": "Running",
    "speed": 52,
    "fare": 25,
    "availableSeats": 8,
    "departureTime": "05:15 PM",
    "arrivalTime": "06:30 PM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 11.016673306953402,
      "lng": 77.00527715933437,
      "rotation": 320
    },
    "routeId": {
      "routeName": "Gandhipuram → Neelambur",
      "from": "Gandhipuram",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe003_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe003_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe003_s2",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe003_s3",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe004",
    "busNumber": "TN-38-ZW-8446",
    "busCode": "CBE004",
    "status": "Running",
    "speed": 53,
    "fare": 25,
    "availableSeats": 29,
    "departureTime": "08:45 AM",
    "arrivalTime": "11:00 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.002228514444687,
      "lng": 76.95959938015459,
      "rotation": 103
    },
    "routeId": {
      "routeName": "Thudiyalur → Singanallur",
      "from": "Thudiyalur",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe004_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe004_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe004_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe004_s3",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe005",
    "busNumber": "TN-38-XV-8095",
    "busCode": "CBE005",
    "status": "Running",
    "speed": 55,
    "fare": 15,
    "availableSeats": 39,
    "departureTime": "08:30 PM",
    "arrivalTime": "11:15 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.01390221655695,
      "lng": 77.01000836117751,
      "rotation": 78
    },
    "routeId": {
      "routeName": "Singanallur → Gandhipuram",
      "from": "Singanallur",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe005_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe005_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe005_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe006",
    "busNumber": "TN-38-LC-1450",
    "busCode": "CBE006",
    "status": "Running",
    "speed": 34,
    "fare": 15,
    "availableSeats": 40,
    "departureTime": "08:15 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.031149418615303,
      "lng": 76.97091425913179,
      "rotation": 2
    },
    "routeId": {
      "routeName": "Gandhipuram → Saravanampatti",
      "from": "Gandhipuram",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe006_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe006_s1",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "small"
        },
        {
          "_id": "cbe006_s2",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe007",
    "busNumber": "TN-38-HM-4000",
    "busCode": "CBE007",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 27,
    "departureTime": "09:45 PM",
    "arrivalTime": "11:15 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 215
    },
    "routeId": {
      "routeName": "Gandhipuram → Saravanampatti",
      "from": "Gandhipuram",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 11.026,
          "lng": 76.945
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe007_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe007_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe007_s2",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe007_s3",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe008",
    "busNumber": "TN-38-HY-7673",
    "busCode": "CBE008",
    "status": "Running",
    "speed": 49,
    "fare": 25,
    "availableSeats": 12,
    "departureTime": "12:00 PM",
    "arrivalTime": "02:00 AM",
    "currentStop": "Neelambur",
    "location": {
      "lat": 11.073086155151758,
      "lng": 76.96099706287205,
      "rotation": 343
    },
    "routeId": {
      "routeName": "Gandhipuram → Neelambur",
      "from": "Gandhipuram",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe008_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe008_s1",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "small"
        },
        {
          "_id": "cbe008_s2",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "small"
        },
        {
          "_id": "cbe008_s3",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe009",
    "busNumber": "TN-38-ZW-6698",
    "busCode": "CBE009",
    "status": "Running",
    "speed": 54,
    "fare": 25,
    "availableSeats": 21,
    "departureTime": "12:30 PM",
    "arrivalTime": "01:45 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.065778015943305,
      "lng": 76.99748336525582,
      "rotation": 215
    },
    "routeId": {
      "routeName": "Thudiyalur → Saravanampatti",
      "from": "Thudiyalur",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.026,
          "lng": 76.945
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe009_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe009_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe009_s2",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe009_s3",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe010",
    "busNumber": "TN-38-BP-8898",
    "busCode": "CBE010",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 38,
    "departureTime": "08:00 PM",
    "arrivalTime": "09:45 PM",
    "currentStop": "Saravanampatti",
    "location": {
      "lat": 11.07,
      "lng": 77,
      "rotation": 282
    },
    "routeId": {
      "routeName": "Saravanampatti → Gandhipuram",
      "from": "Saravanampatti",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe010_s0",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        },
        {
          "_id": "cbe010_s1",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "small"
        },
        {
          "_id": "cbe010_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe011",
    "busNumber": "TN-38-WX-2734",
    "busCode": "CBE011",
    "status": "Running",
    "speed": 54,
    "fare": 25,
    "availableSeats": 44,
    "departureTime": "05:00 PM",
    "arrivalTime": "06:15 PM",
    "currentStop": "Town Hall",
    "location": {
      "lat": 11.008104353736346,
      "lng": 76.96545443247635,
      "rotation": 210
    },
    "routeId": {
      "routeName": "Ukkadam → Vadavalli",
      "from": "Ukkadam",
      "to": "Vadavalli",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.025,
          "lng": 76.9
        }
      ],
      "stops": [
        {
          "_id": "cbe011_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe011_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe011_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe011_s3",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe012",
    "busNumber": "TN-38-JE-6075",
    "busCode": "CBE012",
    "status": "Running",
    "speed": 37,
    "fare": 25,
    "availableSeats": 25,
    "departureTime": "06:30 PM",
    "arrivalTime": "09:00 PM",
    "currentStop": "Vadavalli",
    "location": {
      "lat": 11.024210639381879,
      "lng": 76.89517218557462,
      "rotation": 313
    },
    "routeId": {
      "routeName": "Ukkadam → Vadavalli",
      "from": "Ukkadam",
      "to": "Vadavalli",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 11.025,
          "lng": 76.9
        }
      ],
      "stops": [
        {
          "_id": "cbe012_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe012_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe012_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe012_s3",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe013",
    "busNumber": "TN-38-XJ-4445",
    "busCode": "CBE013",
    "status": "Running",
    "speed": 59,
    "fare": 25,
    "availableSeats": 39,
    "departureTime": "10:00 AM",
    "arrivalTime": "12:00 AM",
    "currentStop": "Neelambur",
    "location": {
      "lat": 11.026567646105114,
      "lng": 76.94728819026462,
      "rotation": 213
    },
    "routeId": {
      "routeName": "Ukkadam → Neelambur",
      "from": "Ukkadam",
      "to": "Neelambur",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe013_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe013_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe013_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe013_s3",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe013_s4",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe014",
    "busNumber": "TN-38-LZ-2273",
    "busCode": "CBE014",
    "status": "Running",
    "speed": 33,
    "fare": 25,
    "availableSeats": 24,
    "departureTime": "04:30 PM",
    "arrivalTime": "06:00 PM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 10.983124190740753,
      "lng": 76.89771004517895,
      "rotation": 256
    },
    "routeId": {
      "routeName": "Thudiyalur → Vadavalli",
      "from": "Thudiyalur",
      "to": "Vadavalli",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 11.025,
          "lng": 76.9
        }
      ],
      "stops": [
        {
          "_id": "cbe014_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe014_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe014_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe014_s3",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe015",
    "busNumber": "TN-38-XO-7359",
    "busCode": "CBE015",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 16,
    "departureTime": "09:45 PM",
    "arrivalTime": "11:15 PM",
    "currentStop": "Vadavalli",
    "location": {
      "lat": 11.025,
      "lng": 76.9,
      "rotation": 123
    },
    "routeId": {
      "routeName": "Vadavalli → Ukkadam",
      "from": "Vadavalli",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe015_s0",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        },
        {
          "_id": "cbe015_s1",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe015_s2",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe015_s3",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe016",
    "busNumber": "TN-38-ES-1628",
    "busCode": "CBE016",
    "status": "Running",
    "speed": 38,
    "fare": 25,
    "availableSeats": 11,
    "departureTime": "04:30 PM",
    "arrivalTime": "07:15 PM",
    "currentStop": "Pollachi",
    "location": {
      "lat": 10.853284206041629,
      "lng": 76.96087543033111,
      "rotation": 237
    },
    "routeId": {
      "routeName": "Gandhipuram → Pollachi",
      "from": "Gandhipuram",
      "to": "Pollachi",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe016_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe016_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe016_s2",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe016_s3",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe017",
    "busNumber": "TN-38-DD-6506",
    "busCode": "CBE017",
    "status": "Running",
    "speed": 52,
    "fare": 25,
    "availableSeats": 23,
    "departureTime": "07:30 PM",
    "arrivalTime": "08:30 PM",
    "currentStop": "Town Hall",
    "location": {
      "lat": 10.846556658350881,
      "lng": 76.96465347145505,
      "rotation": 188
    },
    "routeId": {
      "routeName": "Gandhipuram → Pollachi",
      "from": "Gandhipuram",
      "to": "Pollachi",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe017_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe017_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe017_s2",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe017_s3",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe017_s4",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe018",
    "busNumber": "TN-38-EC-4865",
    "busCode": "CBE018",
    "status": "Running",
    "speed": 30,
    "fare": 25,
    "availableSeats": 22,
    "departureTime": "07:30 AM",
    "arrivalTime": "09:45 AM",
    "currentStop": "Neelambur",
    "location": {
      "lat": 11.050047312479514,
      "lng": 76.96293040997894,
      "rotation": 26
    },
    "routeId": {
      "routeName": "Gandhipuram → Neelambur",
      "from": "Gandhipuram",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe018_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe018_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe018_s2",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe018_s3",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "small"
        },
        {
          "_id": "cbe018_s4",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe019",
    "busNumber": "TN-38-KK-8347",
    "busCode": "CBE019",
    "status": "Running",
    "speed": 51,
    "fare": 25,
    "availableSeats": 45,
    "departureTime": "01:30 PM",
    "arrivalTime": "04:15 PM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 10.665521727399824,
      "lng": 76.96962758556049,
      "rotation": 152
    },
    "routeId": {
      "routeName": "Thudiyalur → Pollachi",
      "from": "Thudiyalur",
      "to": "Pollachi",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe019_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe019_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe019_s2",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe019_s3",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe019_s4",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe020",
    "busNumber": "TN-38-ON-5329",
    "busCode": "CBE020",
    "status": "Running",
    "speed": 36,
    "fare": 25,
    "availableSeats": 20,
    "departureTime": "07:00 AM",
    "arrivalTime": "08:30 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.018907427790019,
      "lng": 77.0054715391447,
      "rotation": 169
    },
    "routeId": {
      "routeName": "Pollachi → Gandhipuram",
      "from": "Pollachi",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe020_s0",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        },
        {
          "_id": "cbe020_s1",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe020_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe020_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe021",
    "busNumber": "TN-38-BP-3287",
    "busCode": "CBE021",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 34,
    "departureTime": "11:30 AM",
    "arrivalTime": "12:45 AM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 11.025,
      "lng": 77.01,
      "rotation": 36
    },
    "routeId": {
      "routeName": "Peelamedu → Airport",
      "from": "Peelamedu",
      "to": "Airport",
      "path": [
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.03,
          "lng": 77.04
        }
      ],
      "stops": [
        {
          "_id": "cbe021_s0",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "major"
        },
        {
          "_id": "cbe021_s1",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe022",
    "busNumber": "TN-38-AD-4772",
    "busCode": "CBE022",
    "status": "Running",
    "speed": 49,
    "fare": 15,
    "availableSeats": 35,
    "departureTime": "10:30 PM",
    "arrivalTime": "11:30 PM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 10.991975921738264,
      "lng": 76.9582845646238,
      "rotation": 206
    },
    "routeId": {
      "routeName": "Peelamedu → Airport",
      "from": "Peelamedu",
      "to": "Airport",
      "path": [
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 11.03,
          "lng": 77.04
        }
      ],
      "stops": [
        {
          "_id": "cbe022_s0",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "major"
        },
        {
          "_id": "cbe022_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe022_s2",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe023",
    "busNumber": "TN-38-MO-2991",
    "busCode": "CBE023",
    "status": "Running",
    "speed": 52,
    "fare": 15,
    "availableSeats": 33,
    "departureTime": "08:00 AM",
    "arrivalTime": "10:30 AM",
    "currentStop": "Airport",
    "location": {
      "lat": 11.025204030427375,
      "lng": 77.03723561322532,
      "rotation": 47
    },
    "routeId": {
      "routeName": "Peelamedu → Neelambur",
      "from": "Peelamedu",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe023_s0",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "major"
        },
        {
          "_id": "cbe023_s1",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "small"
        },
        {
          "_id": "cbe023_s2",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe024",
    "busNumber": "TN-38-RL-4499",
    "busCode": "CBE024",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 29,
    "departureTime": "07:00 AM",
    "arrivalTime": "08:30 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.07,
      "lng": 76.94,
      "rotation": 350
    },
    "routeId": {
      "routeName": "Thudiyalur → Airport",
      "from": "Thudiyalur",
      "to": "Airport",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.03,
          "lng": 77.04
        }
      ],
      "stops": [
        {
          "_id": "cbe024_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe024_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe024_s2",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe025",
    "busNumber": "TN-38-RK-7080",
    "busCode": "CBE025",
    "status": "Running",
    "speed": 36,
    "fare": 15,
    "availableSeats": 14,
    "departureTime": "08:30 AM",
    "arrivalTime": "11:15 AM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 11.021693269286386,
      "lng": 77.03649587406285,
      "rotation": 322
    },
    "routeId": {
      "routeName": "Airport → Peelamedu",
      "from": "Airport",
      "to": "Peelamedu",
      "path": [
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11.025,
          "lng": 77.01
        }
      ],
      "stops": [
        {
          "_id": "cbe025_s0",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        },
        {
          "_id": "cbe025_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe026",
    "busNumber": "TN-38-QR-2484",
    "busCode": "CBE026",
    "status": "Running",
    "speed": 54,
    "fare": 25,
    "availableSeats": 19,
    "departureTime": "03:00 PM",
    "arrivalTime": "04:15 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.297055554301215,
      "lng": 76.9682200707521,
      "rotation": 263
    },
    "routeId": {
      "routeName": "Mettupalayam → Gandhipuram",
      "from": "Mettupalayam",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.3,
          "lng": 76.936
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe026_s0",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        },
        {
          "_id": "cbe026_s1",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe026_s2",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe026_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe027",
    "busNumber": "TN-38-BF-8548",
    "busCode": "CBE027",
    "status": "Running",
    "speed": 30,
    "fare": 25,
    "availableSeats": 12,
    "departureTime": "07:00 AM",
    "arrivalTime": "09:30 AM",
    "currentStop": "Karumathampatti",
    "location": {
      "lat": 11.000870421524969,
      "lng": 77.03281359744263,
      "rotation": 243
    },
    "routeId": {
      "routeName": "Karumathampatti → Singanallur",
      "from": "Karumathampatti",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.1,
          "lng": 77.15
        },
        {
          "lat": 11.05,
          "lng": 77.1
        },
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe027_s0",
          "stopName": "Karumathampatti",
          "lat": 11.1,
          "lng": 77.15,
          "type": "major"
        },
        {
          "_id": "cbe027_s1",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "small"
        },
        {
          "_id": "cbe027_s2",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "small"
        },
        {
          "_id": "cbe027_s3",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe028",
    "busNumber": "TN-38-ZH-9299",
    "busCode": "CBE028",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 5,
    "departureTime": "07:00 PM",
    "arrivalTime": "08:00 PM",
    "currentStop": "Kavundampalayam",
    "location": {
      "lat": 11.045,
      "lng": 76.945,
      "rotation": 224
    },
    "routeId": {
      "routeName": "Kavundampalayam → Gandhipuram",
      "from": "Kavundampalayam",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.026,
          "lng": 76.945
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe028_s0",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe028_s1",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe028_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe029",
    "busNumber": "TN-38-OM-3030",
    "busCode": "CBE029",
    "status": "Running",
    "speed": 32,
    "fare": 15,
    "availableSeats": 40,
    "departureTime": "07:00 PM",
    "arrivalTime": "09:45 PM",
    "currentStop": "Kuniyamuthur",
    "location": {
      "lat": 10.953836532494723,
      "lng": 76.9253647492998,
      "rotation": 69
    },
    "routeId": {
      "routeName": "Kovaipudur → Sundarapuram",
      "from": "Kovaipudur",
      "to": "Sundarapuram",
      "path": [
        {
          "lat": 10.93,
          "lng": 76.93
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        }
      ],
      "stops": [
        {
          "_id": "cbe029_s0",
          "stopName": "Kovaipudur",
          "lat": 10.93,
          "lng": 76.93,
          "type": "major"
        },
        {
          "_id": "cbe029_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe029_s2",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe030",
    "busNumber": "TN-38-JY-5057",
    "busCode": "CBE030",
    "status": "Running",
    "speed": 59,
    "fare": 15,
    "availableSeats": 35,
    "departureTime": "10:30 AM",
    "arrivalTime": "12:15 AM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.992699135680745,
      "lng": 76.96405829401544,
      "rotation": 67
    },
    "routeId": {
      "routeName": "Ukkadam → Kuniyamuthur",
      "from": "Ukkadam",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe030_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe030_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe031",
    "busNumber": "TN-38-DB-5350",
    "busCode": "CBE031",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 7,
    "departureTime": "07:30 AM",
    "arrivalTime": "09:30 AM",
    "currentStop": "Sundarapuram",
    "location": {
      "lat": 10.95,
      "lng": 76.97,
      "rotation": 53
    },
    "routeId": {
      "routeName": "Sundarapuram → Kuniyamuthur",
      "from": "Sundarapuram",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe031_s0",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        },
        {
          "_id": "cbe031_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe032",
    "busNumber": "TN-38-RO-7299",
    "busCode": "CBE032",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 34,
    "departureTime": "04:00 PM",
    "arrivalTime": "05:00 PM",
    "currentStop": "Sundarapuram",
    "location": {
      "lat": 10.95,
      "lng": 76.97,
      "rotation": 110
    },
    "routeId": {
      "routeName": "Sundarapuram → Kovaipudur",
      "from": "Sundarapuram",
      "to": "Kovaipudur",
      "path": [
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.93,
          "lng": 76.93
        }
      ],
      "stops": [
        {
          "_id": "cbe032_s0",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        },
        {
          "_id": "cbe032_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe032_s2",
          "stopName": "Kovaipudur",
          "lat": 10.93,
          "lng": 76.93,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe033",
    "busNumber": "TN-38-IH-4388",
    "busCode": "CBE033",
    "status": "Running",
    "speed": 53,
    "fare": 15,
    "availableSeats": 16,
    "departureTime": "10:30 AM",
    "arrivalTime": "11:30 AM",
    "currentStop": "Mettupalayam",
    "location": {
      "lat": 11.069568541649437,
      "lng": 76.93582529690747,
      "rotation": 53
    },
    "routeId": {
      "routeName": "Thudiyalur → Mettupalayam",
      "from": "Thudiyalur",
      "to": "Mettupalayam",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.3,
          "lng": 76.936
        }
      ],
      "stops": [
        {
          "_id": "cbe033_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe033_s1",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe034",
    "busNumber": "TN-38-AX-6498",
    "busCode": "CBE034",
    "status": "Running",
    "speed": 39,
    "fare": 15,
    "availableSeats": 23,
    "departureTime": "01:00 PM",
    "arrivalTime": "02:45 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.020121030915508,
      "lng": 76.96834439284623,
      "rotation": 67
    },
    "routeId": {
      "routeName": "Thudiyalur → Gandhipuram",
      "from": "Thudiyalur",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe034_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe034_s1",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe034_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe035",
    "busNumber": "TN-38-WX-3077",
    "busCode": "CBE035",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 39,
    "departureTime": "07:30 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Perur",
    "location": {
      "lat": 10.98,
      "lng": 76.92,
      "rotation": 322
    },
    "routeId": {
      "routeName": "Perur → Ukkadam",
      "from": "Perur",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 10.98,
          "lng": 76.92
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe035_s0",
          "stopName": "Perur",
          "lat": 10.98,
          "lng": 76.92,
          "type": "major"
        },
        {
          "_id": "cbe035_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe036",
    "busNumber": "TN-38-NM-7585",
    "busCode": "CBE036",
    "status": "Running",
    "speed": 40,
    "fare": 15,
    "availableSeats": 40,
    "departureTime": "06:30 PM",
    "arrivalTime": "09:15 PM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.995937292882768,
      "lng": 76.9663022916553,
      "rotation": 156
    },
    "routeId": {
      "routeName": "Ukkadam → Town Hall",
      "from": "Ukkadam",
      "to": "Town Hall",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        }
      ],
      "stops": [
        {
          "_id": "cbe036_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe036_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe037",
    "busNumber": "TN-38-NJ-5607",
    "busCode": "CBE037",
    "status": "Running",
    "speed": 41,
    "fare": 15,
    "availableSeats": 9,
    "departureTime": "08:45 AM",
    "arrivalTime": "11:15 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.01229654859416,
      "lng": 76.96357662315968,
      "rotation": 299
    },
    "routeId": {
      "routeName": "Thudiyalur → Singanallur",
      "from": "Thudiyalur",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe037_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe037_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe037_s2",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe038",
    "busNumber": "TN-38-UN-4371",
    "busCode": "CBE038",
    "status": "Running",
    "speed": 59,
    "fare": 15,
    "availableSeats": 23,
    "departureTime": "06:00 PM",
    "arrivalTime": "07:15 PM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 10.99834910024578,
      "lng": 76.9576539929151,
      "rotation": 336
    },
    "routeId": {
      "routeName": "Railway Station → Ukkadam",
      "from": "Railway Station",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe038_s0",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        },
        {
          "_id": "cbe038_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe038_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe039",
    "busNumber": "TN-38-GV-4796",
    "busCode": "CBE039",
    "status": "Running",
    "speed": 30,
    "fare": 15,
    "availableSeats": 36,
    "departureTime": "10:30 PM",
    "arrivalTime": "12:00 PM",
    "currentStop": "Narasimhanaickenpalayam",
    "location": {
      "lat": 11.303897788607525,
      "lng": 76.93644929446397,
      "rotation": 302
    },
    "routeId": {
      "routeName": "Narasimhanaickenpalayam → Mettupalayam",
      "from": "Narasimhanaickenpalayam",
      "to": "Mettupalayam",
      "path": [
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.3,
          "lng": 76.936
        }
      ],
      "stops": [
        {
          "_id": "cbe039_s0",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "major"
        },
        {
          "_id": "cbe039_s1",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe040",
    "busNumber": "TN-38-LN-7241",
    "busCode": "CBE040",
    "status": "Running",
    "speed": 43,
    "fare": 15,
    "availableSeats": 20,
    "departureTime": "07:00 PM",
    "arrivalTime": "08:15 PM",
    "currentStop": "Singanallur",
    "location": {
      "lat": 10.995983988362418,
      "lng": 77.28453430960181,
      "rotation": 153
    },
    "routeId": {
      "routeName": "Palladam → Singanallur",
      "from": "Palladam",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11,
          "lng": 77.288
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe040_s0",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        },
        {
          "_id": "cbe040_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe041",
    "busNumber": "TN-38-FT-6203",
    "busCode": "CBE041",
    "status": "Running",
    "speed": 38,
    "fare": 40,
    "availableSeats": 16,
    "departureTime": "08:15 AM",
    "arrivalTime": "11:00 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.136807368816966,
      "lng": 76.93476819633072,
      "rotation": 156
    },
    "routeId": {
      "routeName": "Saibaba Colony → Mettupalayam",
      "from": "Saibaba Colony",
      "to": "Mettupalayam",
      "path": [
        {
          "lat": 11.026,
          "lng": 76.945
        },
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.14,
          "lng": 76.935
        },
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.3,
          "lng": 76.936
        }
      ],
      "stops": [
        {
          "_id": "cbe041_s0",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe041_s1",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe041_s2",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe041_s3",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "small"
        },
        {
          "_id": "cbe041_s4",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "small"
        },
        {
          "_id": "cbe041_s5",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe042",
    "busNumber": "TN-38-NI-6098",
    "busCode": "CBE042",
    "status": "Running",
    "speed": 49,
    "fare": 15,
    "availableSeats": 34,
    "departureTime": "05:00 PM",
    "arrivalTime": "06:00 PM",
    "currentStop": "Sundarapuram",
    "location": {
      "lat": 10.962094679232962,
      "lng": 76.95606938025576,
      "rotation": 62
    },
    "routeId": {
      "routeName": "Sundarapuram → Ukkadam",
      "from": "Sundarapuram",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe042_s0",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        },
        {
          "_id": "cbe042_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe042_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe043",
    "busNumber": "TN-38-AU-4736",
    "busCode": "CBE043",
    "status": "Running",
    "speed": 50,
    "fare": 15,
    "availableSeats": 7,
    "departureTime": "11:00 AM",
    "arrivalTime": "12:45 AM",
    "currentStop": "Airport",
    "location": {
      "lat": 10.998992238809235,
      "lng": 77.03415964642522,
      "rotation": 358
    },
    "routeId": {
      "routeName": "Airport → Singanallur",
      "from": "Airport",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe043_s0",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        },
        {
          "_id": "cbe043_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe044",
    "busNumber": "TN-38-FI-5519",
    "busCode": "CBE044",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 21,
    "departureTime": "01:00 PM",
    "arrivalTime": "02:30 PM",
    "currentStop": "Marudhamalai",
    "location": {
      "lat": 11.045,
      "lng": 76.88,
      "rotation": 208
    },
    "routeId": {
      "routeName": "Marudhamalai → Vadavalli",
      "from": "Marudhamalai",
      "to": "Vadavalli",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.88
        },
        {
          "lat": 11.025,
          "lng": 76.9
        }
      ],
      "stops": [
        {
          "_id": "cbe044_s0",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        },
        {
          "_id": "cbe044_s1",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe045",
    "busNumber": "TN-38-WJ-3189",
    "busCode": "CBE045",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 22,
    "departureTime": "10:30 AM",
    "arrivalTime": "12:00 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 219
    },
    "routeId": {
      "routeName": "Gandhipuram → Sundarapuram",
      "from": "Gandhipuram",
      "to": "Sundarapuram",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        }
      ],
      "stops": [
        {
          "_id": "cbe045_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe045_s1",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe045_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe045_s3",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe045_s4",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe046",
    "busNumber": "TN-38-DK-9505",
    "busCode": "CBE046",
    "status": "Running",
    "speed": 47,
    "fare": 15,
    "availableSeats": 39,
    "departureTime": "05:45 PM",
    "arrivalTime": "07:30 PM",
    "currentStop": "Kuniyamuthur",
    "location": {
      "lat": 10.958465389903422,
      "lng": 76.96010327614819,
      "rotation": 108
    },
    "routeId": {
      "routeName": "Kuniyamuthur → Railway Station",
      "from": "Kuniyamuthur",
      "to": "Railway Station",
      "path": [
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        }
      ],
      "stops": [
        {
          "_id": "cbe046_s0",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        },
        {
          "_id": "cbe046_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe046_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe047",
    "busNumber": "TN-38-UT-7518",
    "busCode": "CBE047",
    "status": "Running",
    "speed": 36,
    "fare": 40,
    "availableSeats": 26,
    "departureTime": "03:30 PM",
    "arrivalTime": "05:45 PM",
    "currentStop": "Vadavalli",
    "location": {
      "lat": 11.020146272778032,
      "lng": 76.87618716388631,
      "rotation": 0
    },
    "routeId": {
      "routeName": "Marudhamalai → Neelambur",
      "from": "Marudhamalai",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.88
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe047_s0",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        },
        {
          "_id": "cbe047_s1",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe047_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe047_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe047_s4",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe047_s5",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "small"
        },
        {
          "_id": "cbe047_s6",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe048",
    "busNumber": "TN-38-DL-6092",
    "busCode": "CBE048",
    "status": "Running",
    "speed": 58,
    "fare": 15,
    "availableSeats": 35,
    "departureTime": "05:45 PM",
    "arrivalTime": "07:45 PM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.986238688982924,
      "lng": 76.96203267598872,
      "rotation": 84
    },
    "routeId": {
      "routeName": "Ukkadam → Sundarapuram",
      "from": "Ukkadam",
      "to": "Sundarapuram",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        }
      ],
      "stops": [
        {
          "_id": "cbe048_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe048_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe048_s2",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe049",
    "busNumber": "TN-38-YD-2921",
    "busCode": "CBE049",
    "status": "Running",
    "speed": 40,
    "fare": 15,
    "availableSeats": 36,
    "departureTime": "11:30 AM",
    "arrivalTime": "02:15 PM",
    "currentStop": "KGISL",
    "location": {
      "lat": 11.067204037300387,
      "lng": 77.00422511996865,
      "rotation": 163
    },
    "routeId": {
      "routeName": "Keeranatham → Saravanampatti",
      "from": "Keeranatham",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.1,
          "lng": 77.01
        },
        {
          "lat": 11.085,
          "lng": 77.002
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe049_s0",
          "stopName": "Keeranatham",
          "lat": 11.1,
          "lng": 77.01,
          "type": "major"
        },
        {
          "_id": "cbe049_s1",
          "stopName": "KGISL",
          "lat": 11.085,
          "lng": 77.002,
          "type": "small"
        },
        {
          "_id": "cbe049_s2",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe050",
    "busNumber": "TN-38-NS-8033",
    "busCode": "CBE050",
    "status": "Running",
    "speed": 55,
    "fare": 15,
    "availableSeats": 17,
    "departureTime": "12:00 PM",
    "arrivalTime": "02:45 AM",
    "currentStop": "Sundarapuram",
    "location": {
      "lat": 10.912069756522401,
      "lng": 76.92620031848425,
      "rotation": 247
    },
    "routeId": {
      "routeName": "Madukkarai → Sundarapuram",
      "from": "Madukkarai",
      "to": "Sundarapuram",
      "path": [
        {
          "lat": 10.908,
          "lng": 76.925
        },
        {
          "lat": 10.95,
          "lng": 76.97
        }
      ],
      "stops": [
        {
          "_id": "cbe050_s0",
          "stopName": "Madukkarai",
          "lat": 10.908,
          "lng": 76.925,
          "type": "major"
        },
        {
          "_id": "cbe050_s1",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe051",
    "busNumber": "TN-38-WR-8732",
    "busCode": "CBE051",
    "status": "Running",
    "speed": 53,
    "fare": 15,
    "availableSeats": 37,
    "departureTime": "04:00 PM",
    "arrivalTime": "05:30 PM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.99946907519577,
      "lng": 76.96265140856504,
      "rotation": 356
    },
    "routeId": {
      "routeName": "Singanallur → Pollachi",
      "from": "Singanallur",
      "to": "Pollachi",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe051_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe051_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe051_s2",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe052",
    "busNumber": "TN-38-EW-7590",
    "busCode": "CBE052",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 22,
    "departureTime": "03:30 PM",
    "arrivalTime": "05:30 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 66
    },
    "routeId": {
      "routeName": "Gandhipuram → Railway Station",
      "from": "Gandhipuram",
      "to": "Railway Station",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        }
      ],
      "stops": [
        {
          "_id": "cbe052_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe052_s1",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe053",
    "busNumber": "TN-38-KE-9495",
    "busCode": "CBE053",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 44,
    "departureTime": "06:00 PM",
    "arrivalTime": "07:15 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 177
    },
    "routeId": {
      "routeName": "Gandhipuram → Marudhamalai",
      "from": "Gandhipuram",
      "to": "Marudhamalai",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.045,
          "lng": 76.88
        }
      ],
      "stops": [
        {
          "_id": "cbe053_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe053_s1",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe053_s2",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe053_s3",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe054",
    "busNumber": "TN-38-NA-3366",
    "busCode": "CBE054",
    "status": "Running",
    "speed": 46,
    "fare": 25,
    "availableSeats": 8,
    "departureTime": "11:15 PM",
    "arrivalTime": "12:30 PM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 10.951579798534759,
      "lng": 76.95495105477247,
      "rotation": 323
    },
    "routeId": {
      "routeName": "Railway Station → Madukkarai",
      "from": "Railway Station",
      "to": "Madukkarai",
      "path": [
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.908,
          "lng": 76.925
        }
      ],
      "stops": [
        {
          "_id": "cbe054_s0",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        },
        {
          "_id": "cbe054_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe054_s2",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe054_s3",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe054_s4",
          "stopName": "Madukkarai",
          "lat": 10.908,
          "lng": 76.925,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe055",
    "busNumber": "TN-38-PL-9949",
    "busCode": "CBE055",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 8,
    "departureTime": "11:00 AM",
    "arrivalTime": "01:00 PM",
    "currentStop": "Pollachi",
    "location": {
      "lat": 10.662,
      "lng": 77.006,
      "rotation": 68
    },
    "routeId": {
      "routeName": "Pollachi → Valparai",
      "from": "Pollachi",
      "to": "Valparai",
      "path": [
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 10.32,
          "lng": 76.95
        }
      ],
      "stops": [
        {
          "_id": "cbe055_s0",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        },
        {
          "_id": "cbe055_s1",
          "stopName": "Valparai",
          "lat": 10.32,
          "lng": 76.95,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe056",
    "busNumber": "TN-38-UC-9107",
    "busCode": "CBE056",
    "status": "Running",
    "speed": 55,
    "fare": 25,
    "availableSeats": 29,
    "departureTime": "09:45 PM",
    "arrivalTime": "11:30 PM",
    "currentStop": "Kovaipudur",
    "location": {
      "lat": 10.960847340495325,
      "lng": 76.95304769390404,
      "rotation": 263
    },
    "routeId": {
      "routeName": "Kovaipudur → Singanallur",
      "from": "Kovaipudur",
      "to": "Singanallur",
      "path": [
        {
          "lat": 10.93,
          "lng": 76.93
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe056_s0",
          "stopName": "Kovaipudur",
          "lat": 10.93,
          "lng": 76.93,
          "type": "major"
        },
        {
          "_id": "cbe056_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe056_s2",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe056_s3",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe057",
    "busNumber": "TN-38-GP-2659",
    "busCode": "CBE057",
    "status": "Running",
    "speed": 32,
    "fare": 15,
    "availableSeats": 17,
    "departureTime": "07:30 PM",
    "arrivalTime": "09:30 PM",
    "currentStop": "RS Puram",
    "location": {
      "lat": 11.02701044574983,
      "lng": 76.96661562527258,
      "rotation": 76
    },
    "routeId": {
      "routeName": "Vadavalli → Gandhipuram",
      "from": "Vadavalli",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe057_s0",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "major"
        },
        {
          "_id": "cbe057_s1",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe057_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe058",
    "busNumber": "TN-38-NV-4833",
    "busCode": "CBE058",
    "status": "Running",
    "speed": 44,
    "fare": 25,
    "availableSeats": 26,
    "departureTime": "07:30 AM",
    "arrivalTime": "09:00 AM",
    "currentStop": "Vadavalli",
    "location": {
      "lat": 11.004122486385581,
      "lng": 76.96692951589569,
      "rotation": 211
    },
    "routeId": {
      "routeName": "Marudhamalai → Gandhipuram",
      "from": "Marudhamalai",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.88
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe058_s0",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        },
        {
          "_id": "cbe058_s1",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe058_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe058_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe059",
    "busNumber": "TN-38-PI-8881",
    "busCode": "CBE059",
    "status": "Running",
    "speed": 59,
    "fare": 15,
    "availableSeats": 16,
    "departureTime": "05:45 PM",
    "arrivalTime": "08:00 PM",
    "currentStop": "Kavundampalayam",
    "location": {
      "lat": 11.017325589366708,
      "lng": 76.94262373657739,
      "rotation": 354
    },
    "routeId": {
      "routeName": "Kavundampalayam → Gandhipuram",
      "from": "Kavundampalayam",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe059_s0",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe059_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe060",
    "busNumber": "TN-38-HY-7666",
    "busCode": "CBE060",
    "status": "Running",
    "speed": 41,
    "fare": 15,
    "availableSeats": 6,
    "departureTime": "06:30 AM",
    "arrivalTime": "08:00 AM",
    "currentStop": "Kovaipudur",
    "location": {
      "lat": 10.928639314370015,
      "lng": 76.9546596425387,
      "rotation": 130
    },
    "routeId": {
      "routeName": "Kovaipudur → Kuniyamuthur",
      "from": "Kovaipudur",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 10.93,
          "lng": 76.93
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe060_s0",
          "stopName": "Kovaipudur",
          "lat": 10.93,
          "lng": 76.93,
          "type": "major"
        },
        {
          "_id": "cbe060_s1",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe061",
    "busNumber": "TN-38-SV-6677",
    "busCode": "CBE061",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 15,
    "departureTime": "02:30 PM",
    "arrivalTime": "04:00 PM",
    "currentStop": "Kinathukadavu",
    "location": {
      "lat": 10.85,
      "lng": 76.98,
      "rotation": 203
    },
    "routeId": {
      "routeName": "Kinathukadavu → Gandhipuram",
      "from": "Kinathukadavu",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe061_s0",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "major"
        },
        {
          "_id": "cbe061_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe061_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe062",
    "busNumber": "TN-38-BJ-8003",
    "busCode": "CBE062",
    "status": "Running",
    "speed": 46,
    "fare": 25,
    "availableSeats": 9,
    "departureTime": "08:00 PM",
    "arrivalTime": "10:15 PM",
    "currentStop": "Neelambur",
    "location": {
      "lat": 11.095205418346044,
      "lng": 77.0991661934676,
      "rotation": 240
    },
    "routeId": {
      "routeName": "Neelambur → Tiruppur",
      "from": "Neelambur",
      "to": "Tiruppur",
      "path": [
        {
          "lat": 11.05,
          "lng": 77.1
        },
        {
          "lat": 11.1,
          "lng": 77.15
        },
        {
          "lat": 11.193,
          "lng": 77.268
        },
        {
          "lat": 11.1085,
          "lng": 77.3411
        }
      ],
      "stops": [
        {
          "_id": "cbe062_s0",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        },
        {
          "_id": "cbe062_s1",
          "stopName": "Karumathampatti",
          "lat": 11.1,
          "lng": 77.15,
          "type": "small"
        },
        {
          "_id": "cbe062_s2",
          "stopName": "Avinashi",
          "lat": 11.193,
          "lng": 77.268,
          "type": "small"
        },
        {
          "_id": "cbe062_s3",
          "stopName": "Tiruppur",
          "lat": 11.1085,
          "lng": 77.3411,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe063",
    "busNumber": "TN-38-CT-8270",
    "busCode": "CBE063",
    "status": "Running",
    "speed": 41,
    "fare": 25,
    "availableSeats": 6,
    "departureTime": "08:45 AM",
    "arrivalTime": "09:45 AM",
    "currentStop": "Saravanampatti",
    "location": {
      "lat": 11.028931600284007,
      "lng": 76.9675296453064,
      "rotation": 191
    },
    "routeId": {
      "routeName": "Keeranatham → Gandhipuram",
      "from": "Keeranatham",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.1,
          "lng": 77.01
        },
        {
          "lat": 11.085,
          "lng": 77.002
        },
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe063_s0",
          "stopName": "Keeranatham",
          "lat": 11.1,
          "lng": 77.01,
          "type": "major"
        },
        {
          "_id": "cbe063_s1",
          "stopName": "KGISL",
          "lat": 11.085,
          "lng": 77.002,
          "type": "small"
        },
        {
          "_id": "cbe063_s2",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "small"
        },
        {
          "_id": "cbe063_s3",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "small"
        },
        {
          "_id": "cbe063_s4",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe064",
    "busNumber": "TN-38-WV-7089",
    "busCode": "CBE064",
    "status": "Running",
    "speed": 31,
    "fare": 15,
    "availableSeats": 5,
    "departureTime": "05:30 PM",
    "arrivalTime": "08:15 PM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.658247924432741,
      "lng": 76.95731423677923,
      "rotation": 67
    },
    "routeId": {
      "routeName": "Ukkadam → Pollachi",
      "from": "Ukkadam",
      "to": "Pollachi",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe064_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe064_s1",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe065",
    "busNumber": "TN-38-XL-8564",
    "busCode": "CBE065",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 20,
    "departureTime": "03:30 PM",
    "arrivalTime": "06:15 PM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.9877,
      "lng": 76.9616,
      "rotation": 272
    },
    "routeId": {
      "routeName": "Ukkadam → Singanallur",
      "from": "Ukkadam",
      "to": "Singanallur",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe065_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe065_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe066",
    "busNumber": "TN-38-OH-5598",
    "busCode": "CBE066",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 43,
    "departureTime": "05:45 PM",
    "arrivalTime": "07:15 PM",
    "currentStop": "Ganapathy",
    "location": {
      "lat": 11.033,
      "lng": 76.974,
      "rotation": 55
    },
    "routeId": {
      "routeName": "Ganapathy → Gandhipuram",
      "from": "Ganapathy",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe066_s0",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "major"
        },
        {
          "_id": "cbe066_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe067",
    "busNumber": "TN-38-YM-3816",
    "busCode": "CBE067",
    "status": "Running",
    "speed": 60,
    "fare": 40,
    "availableSeats": 37,
    "departureTime": "09:30 AM",
    "arrivalTime": "11:30 AM",
    "currentStop": "Saibaba Colony",
    "location": {
      "lat": 11.023025998992694,
      "lng": 76.94211673706566,
      "rotation": 24
    },
    "routeId": {
      "routeName": "Mettupalayam → Saibaba Colony",
      "from": "Mettupalayam",
      "to": "Saibaba Colony",
      "path": [
        {
          "lat": 11.3,
          "lng": 76.936
        },
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.14,
          "lng": 76.935
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.026,
          "lng": 76.945
        }
      ],
      "stops": [
        {
          "_id": "cbe067_s0",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        },
        {
          "_id": "cbe067_s1",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "small"
        },
        {
          "_id": "cbe067_s2",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "small"
        },
        {
          "_id": "cbe067_s3",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe067_s4",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "small"
        },
        {
          "_id": "cbe067_s5",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe068",
    "busNumber": "TN-38-HY-3487",
    "busCode": "CBE068",
    "status": "Running",
    "speed": 36,
    "fare": 15,
    "availableSeats": 31,
    "departureTime": "08:45 AM",
    "arrivalTime": "10:00 AM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 11.028720426557605,
      "lng": 76.96338939429259,
      "rotation": 219
    },
    "routeId": {
      "routeName": "Gandhipuram → Peelamedu",
      "from": "Gandhipuram",
      "to": "Peelamedu",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.025,
          "lng": 77.01
        }
      ],
      "stops": [
        {
          "_id": "cbe068_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe068_s1",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe069",
    "busNumber": "TN-38-JN-4434",
    "busCode": "CBE069",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 28,
    "departureTime": "05:30 PM",
    "arrivalTime": "07:00 PM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.07,
      "lng": 76.94,
      "rotation": 242
    },
    "routeId": {
      "routeName": "Thudiyalur → Palladam",
      "from": "Thudiyalur",
      "to": "Palladam",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11,
          "lng": 77.288
        }
      ],
      "stops": [
        {
          "_id": "cbe069_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe069_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe069_s2",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe069_s3",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe070",
    "busNumber": "TN-38-ZT-5295",
    "busCode": "CBE070",
    "status": "Running",
    "speed": 49,
    "fare": 15,
    "availableSeats": 43,
    "departureTime": "09:30 AM",
    "arrivalTime": "11:15 AM",
    "currentStop": "Airport",
    "location": {
      "lat": 11.029589147879907,
      "lng": 77.04111073950065,
      "rotation": 343
    },
    "routeId": {
      "routeName": "Airport → Neelambur",
      "from": "Airport",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe070_s0",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        },
        {
          "_id": "cbe070_s1",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe071",
    "busNumber": "TN-38-SB-7479",
    "busCode": "CBE071",
    "status": "Running",
    "speed": 41,
    "fare": 40,
    "availableSeats": 22,
    "departureTime": "07:00 AM",
    "arrivalTime": "08:30 AM",
    "currentStop": "Peelamedu",
    "location": {
      "lat": 11.034056591829577,
      "lng": 76.96413960323568,
      "rotation": 116
    },
    "routeId": {
      "routeName": "Marudhamalai → Airport",
      "from": "Marudhamalai",
      "to": "Airport",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.88
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.03,
          "lng": 77.04
        }
      ],
      "stops": [
        {
          "_id": "cbe071_s0",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        },
        {
          "_id": "cbe071_s1",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe071_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe071_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe071_s4",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe071_s5",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe072",
    "busNumber": "TN-38-IQ-2709",
    "busCode": "CBE072",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 35,
    "departureTime": "10:00 AM",
    "arrivalTime": "11:15 AM",
    "currentStop": "Ukkadam",
    "location": {
      "lat": 10.9877,
      "lng": 76.9616,
      "rotation": 301
    },
    "routeId": {
      "routeName": "Ukkadam → Pollachi",
      "from": "Ukkadam",
      "to": "Pollachi",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.85,
          "lng": 76.98
        },
        {
          "lat": 10.662,
          "lng": 77.006
        }
      ],
      "stops": [
        {
          "_id": "cbe072_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe072_s1",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "small"
        },
        {
          "_id": "cbe072_s2",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe073",
    "busNumber": "TN-38-QH-9927",
    "busCode": "CBE073",
    "status": "Running",
    "speed": 33,
    "fare": 15,
    "availableSeats": 23,
    "departureTime": "01:30 PM",
    "arrivalTime": "02:30 PM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.071293112722435,
      "lng": 76.94307647904738,
      "rotation": 110
    },
    "routeId": {
      "routeName": "Kavundampalayam → Periyanaickenpalayam",
      "from": "Kavundampalayam",
      "to": "Periyanaickenpalayam",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.14,
          "lng": 76.935
        }
      ],
      "stops": [
        {
          "_id": "cbe073_s0",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe073_s1",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe073_s2",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe074",
    "busNumber": "TN-38-GR-7582",
    "busCode": "CBE074",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 26,
    "departureTime": "08:30 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Marudhamalai",
    "location": {
      "lat": 11.045,
      "lng": 76.88,
      "rotation": 243
    },
    "routeId": {
      "routeName": "Marudhamalai → RS Puram",
      "from": "Marudhamalai",
      "to": "RS Puram",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.88
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.008,
          "lng": 76.948
        }
      ],
      "stops": [
        {
          "_id": "cbe074_s0",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        },
        {
          "_id": "cbe074_s1",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe074_s2",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe075",
    "busNumber": "TN-38-PO-8330",
    "busCode": "CBE075",
    "status": "Running",
    "speed": 54,
    "fare": 15,
    "availableSeats": 14,
    "departureTime": "08:15 AM",
    "arrivalTime": "10:00 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.004147347415328,
      "lng": 76.96063265703184,
      "rotation": 27
    },
    "routeId": {
      "routeName": "Singanallur → Gandhipuram",
      "from": "Singanallur",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe075_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe075_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe076",
    "busNumber": "TN-38-CW-2785",
    "busCode": "CBE076",
    "status": "Running",
    "speed": 60,
    "fare": 15,
    "availableSeats": 11,
    "departureTime": "12:30 PM",
    "arrivalTime": "02:00 AM",
    "currentStop": "Annur",
    "location": {
      "lat": 11.028029077183545,
      "lng": 77.00231111066043,
      "rotation": 231
    },
    "routeId": {
      "routeName": "Ganapathy → Annur",
      "from": "Ganapathy",
      "to": "Annur",
      "path": [
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.233,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe076_s0",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "major"
        },
        {
          "_id": "cbe076_s1",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "small"
        },
        {
          "_id": "cbe076_s2",
          "stopName": "Annur",
          "lat": 11.233,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe077",
    "busNumber": "TN-38-OP-5853",
    "busCode": "CBE077",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 32,
    "departureTime": "07:30 AM",
    "arrivalTime": "09:30 AM",
    "currentStop": "Karumathampatti",
    "location": {
      "lat": 11.1,
      "lng": 77.15,
      "rotation": 245
    },
    "routeId": {
      "routeName": "Karumathampatti → Neelambur",
      "from": "Karumathampatti",
      "to": "Neelambur",
      "path": [
        {
          "lat": 11.1,
          "lng": 77.15
        },
        {
          "lat": 11.05,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe077_s0",
          "stopName": "Karumathampatti",
          "lat": 11.1,
          "lng": 77.15,
          "type": "major"
        },
        {
          "_id": "cbe077_s1",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe078",
    "busNumber": "TN-38-NP-9914",
    "busCode": "CBE078",
    "status": "Running",
    "speed": 41,
    "fare": 25,
    "availableSeats": 41,
    "departureTime": "08:15 AM",
    "arrivalTime": "11:00 AM",
    "currentStop": "Singanallur",
    "location": {
      "lat": 11.004429807478777,
      "lng": 76.94276896830243,
      "rotation": 338
    },
    "routeId": {
      "routeName": "Palladam → Mettupalayam",
      "from": "Palladam",
      "to": "Mettupalayam",
      "path": [
        {
          "lat": 11,
          "lng": 77.288
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.3,
          "lng": 76.936
        }
      ],
      "stops": [
        {
          "_id": "cbe078_s0",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        },
        {
          "_id": "cbe078_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe078_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe078_s3",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe078_s4",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe079",
    "busNumber": "TN-38-SG-1459",
    "busCode": "CBE079",
    "status": "Running",
    "speed": 43,
    "fare": 15,
    "availableSeats": 28,
    "departureTime": "02:00 PM",
    "arrivalTime": "03:15 PM",
    "currentStop": "Town Hall",
    "location": {
      "lat": 10.988826842215294,
      "lng": 76.96977586111075,
      "rotation": 45
    },
    "routeId": {
      "routeName": "Ukkadam → Railway Station",
      "from": "Ukkadam",
      "to": "Railway Station",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        }
      ],
      "stops": [
        {
          "_id": "cbe079_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe079_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "small"
        },
        {
          "_id": "cbe079_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe080",
    "busNumber": "TN-38-IF-6475",
    "busCode": "CBE080",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 33,
    "departureTime": "10:30 AM",
    "arrivalTime": "12:30 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 356
    },
    "routeId": {
      "routeName": "Gandhipuram → RS Puram",
      "from": "Gandhipuram",
      "to": "RS Puram",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.008,
          "lng": 76.948
        }
      ],
      "stops": [
        {
          "_id": "cbe080_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe080_s1",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe081",
    "busNumber": "TN-38-LU-3382",
    "busCode": "CBE081",
    "status": "Running",
    "speed": 55,
    "fare": 15,
    "availableSeats": 12,
    "departureTime": "07:30 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Perur",
    "location": {
      "lat": 10.975224744114158,
      "lng": 76.96318111316033,
      "rotation": 16
    },
    "routeId": {
      "routeName": "Ukkadam → Perur",
      "from": "Ukkadam",
      "to": "Perur",
      "path": [
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.98,
          "lng": 76.92
        }
      ],
      "stops": [
        {
          "_id": "cbe081_s0",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        },
        {
          "_id": "cbe081_s1",
          "stopName": "Perur",
          "lat": 10.98,
          "lng": 76.92,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe082",
    "busNumber": "TN-38-HT-3312",
    "busCode": "CBE082",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 15,
    "departureTime": "08:15 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Pollachi",
    "location": {
      "lat": 10.662,
      "lng": 77.006,
      "rotation": 240
    },
    "routeId": {
      "routeName": "Pollachi → Ukkadam",
      "from": "Pollachi",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe082_s0",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        },
        {
          "_id": "cbe082_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe083",
    "busNumber": "TN-38-CL-8257",
    "busCode": "CBE083",
    "status": "Running",
    "speed": 33,
    "fare": 15,
    "availableSeats": 12,
    "departureTime": "12:00 PM",
    "arrivalTime": "02:30 AM",
    "currentStop": "KGISL",
    "location": {
      "lat": 11.089273822203848,
      "lng": 77.00231840083786,
      "rotation": 84
    },
    "routeId": {
      "routeName": "Saravanampatti → Keeranatham",
      "from": "Saravanampatti",
      "to": "Keeranatham",
      "path": [
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.085,
          "lng": 77.002
        },
        {
          "lat": 11.1,
          "lng": 77.01
        }
      ],
      "stops": [
        {
          "_id": "cbe083_s0",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        },
        {
          "_id": "cbe083_s1",
          "stopName": "KGISL",
          "lat": 11.085,
          "lng": 77.002,
          "type": "small"
        },
        {
          "_id": "cbe083_s2",
          "stopName": "Keeranatham",
          "lat": 11.1,
          "lng": 77.01,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe084",
    "busNumber": "TN-38-FV-6562",
    "busCode": "CBE084",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 38,
    "departureTime": "10:00 AM",
    "arrivalTime": "12:00 AM",
    "currentStop": "Pollachi",
    "location": {
      "lat": 10.662,
      "lng": 77.006,
      "rotation": 338
    },
    "routeId": {
      "routeName": "Pollachi → Singanallur",
      "from": "Pollachi",
      "to": "Singanallur",
      "path": [
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe084_s0",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        },
        {
          "_id": "cbe084_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe084_s2",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe085",
    "busNumber": "TN-38-AC-6574",
    "busCode": "CBE085",
    "status": "Running",
    "speed": 50,
    "fare": 15,
    "availableSeats": 10,
    "departureTime": "08:00 AM",
    "arrivalTime": "09:00 AM",
    "currentStop": "KGISL",
    "location": {
      "lat": 11.080056157144638,
      "lng": 76.99511190121292,
      "rotation": 155
    },
    "routeId": {
      "routeName": "KGISL → Saravanampatti",
      "from": "KGISL",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.085,
          "lng": 77.002
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe085_s0",
          "stopName": "KGISL",
          "lat": 11.085,
          "lng": 77.002,
          "type": "major"
        },
        {
          "_id": "cbe085_s1",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe086",
    "busNumber": "TN-38-WB-6731",
    "busCode": "CBE086",
    "status": "Running",
    "speed": 39,
    "fare": 15,
    "availableSeats": 11,
    "departureTime": "03:30 PM",
    "arrivalTime": "06:00 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.042371461046287,
      "lng": 76.94952790572621,
      "rotation": 1
    },
    "routeId": {
      "routeName": "Kavundampalayam → Railway Station",
      "from": "Kavundampalayam",
      "to": "Railway Station",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        }
      ],
      "stops": [
        {
          "_id": "cbe086_s0",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe086_s1",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe086_s2",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe087",
    "busNumber": "TN-38-FZ-4107",
    "busCode": "CBE087",
    "status": "Running",
    "speed": 56,
    "fare": 15,
    "availableSeats": 31,
    "departureTime": "11:15 PM",
    "arrivalTime": "01:30 AM",
    "currentStop": "Narasimhanaickenpalayam",
    "location": {
      "lat": 11.107882551106231,
      "lng": 76.93693608697818,
      "rotation": 342
    },
    "routeId": {
      "routeName": "Narasimhanaickenpalayam → Periyanaickenpalayam",
      "from": "Narasimhanaickenpalayam",
      "to": "Periyanaickenpalayam",
      "path": [
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.14,
          "lng": 76.935
        }
      ],
      "stops": [
        {
          "_id": "cbe087_s0",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "major"
        },
        {
          "_id": "cbe087_s1",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe088",
    "busNumber": "TN-38-HW-1495",
    "busCode": "CBE088",
    "status": "Running",
    "speed": 44,
    "fare": 15,
    "availableSeats": 29,
    "departureTime": "04:30 PM",
    "arrivalTime": "06:30 PM",
    "currentStop": "Airport",
    "location": {
      "lat": 11.03274620831208,
      "lng": 77.09706834394905,
      "rotation": 164
    },
    "routeId": {
      "routeName": "Neelambur → Airport",
      "from": "Neelambur",
      "to": "Airport",
      "path": [
        {
          "lat": 11.05,
          "lng": 77.1
        },
        {
          "lat": 11.03,
          "lng": 77.04
        }
      ],
      "stops": [
        {
          "_id": "cbe088_s0",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        },
        {
          "_id": "cbe088_s1",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe089",
    "busNumber": "TN-38-GI-6387",
    "busCode": "CBE089",
    "status": "Running",
    "speed": 50,
    "fare": 15,
    "availableSeats": 9,
    "departureTime": "02:30 PM",
    "arrivalTime": "05:00 PM",
    "currentStop": "Saravanampatti",
    "location": {
      "lat": 11.071886016070627,
      "lng": 76.97178942147627,
      "rotation": 30
    },
    "routeId": {
      "routeName": "Saravanampatti → Ganapathy",
      "from": "Saravanampatti",
      "to": "Ganapathy",
      "path": [
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.033,
          "lng": 76.974
        }
      ],
      "stops": [
        {
          "_id": "cbe089_s0",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        },
        {
          "_id": "cbe089_s1",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe090",
    "busNumber": "TN-38-LL-2568",
    "busCode": "CBE090",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 27,
    "departureTime": "09:30 AM",
    "arrivalTime": "11:15 AM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 340
    },
    "routeId": {
      "routeName": "Gandhipuram → Ukkadam",
      "from": "Gandhipuram",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe090_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe090_s1",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe090_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe091",
    "busNumber": "TN-38-AV-7155",
    "busCode": "CBE091",
    "status": "Running",
    "speed": 59,
    "fare": 15,
    "availableSeats": 36,
    "departureTime": "07:00 AM",
    "arrivalTime": "08:45 AM",
    "currentStop": "Kavundampalayam",
    "location": {
      "lat": 11.030392089111999,
      "lng": 76.94783500177435,
      "rotation": 141
    },
    "routeId": {
      "routeName": "Saibaba Colony → Kavundampalayam",
      "from": "Saibaba Colony",
      "to": "Kavundampalayam",
      "path": [
        {
          "lat": 11.026,
          "lng": 76.945
        },
        {
          "lat": 11.045,
          "lng": 76.945
        }
      ],
      "stops": [
        {
          "_id": "cbe091_s0",
          "stopName": "Saibaba Colony",
          "lat": 11.026,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe091_s1",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe092",
    "busNumber": "TN-38-EB-1392",
    "busCode": "CBE092",
    "status": "Boarding",
    "speed": 0,
    "fare": 40,
    "availableSeats": 37,
    "departureTime": "08:15 AM",
    "arrivalTime": "09:15 AM",
    "currentStop": "Neelambur",
    "location": {
      "lat": 11.05,
      "lng": 77.1,
      "rotation": 191
    },
    "routeId": {
      "routeName": "Neelambur → Marudhamalai",
      "from": "Neelambur",
      "to": "Marudhamalai",
      "path": [
        {
          "lat": 11.05,
          "lng": 77.1
        },
        {
          "lat": 11.03,
          "lng": 77.04
        },
        {
          "lat": 11.025,
          "lng": 77.01
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.008,
          "lng": 76.948
        },
        {
          "lat": 11.025,
          "lng": 76.9
        },
        {
          "lat": 11.045,
          "lng": 76.88
        }
      ],
      "stops": [
        {
          "_id": "cbe092_s0",
          "stopName": "Neelambur",
          "lat": 11.05,
          "lng": 77.1,
          "type": "major"
        },
        {
          "_id": "cbe092_s1",
          "stopName": "Airport",
          "lat": 11.03,
          "lng": 77.04,
          "type": "small"
        },
        {
          "_id": "cbe092_s2",
          "stopName": "Peelamedu",
          "lat": 11.025,
          "lng": 77.01,
          "type": "small"
        },
        {
          "_id": "cbe092_s3",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe092_s4",
          "stopName": "RS Puram",
          "lat": 11.008,
          "lng": 76.948,
          "type": "small"
        },
        {
          "_id": "cbe092_s5",
          "stopName": "Vadavalli",
          "lat": 11.025,
          "lng": 76.9,
          "type": "small"
        },
        {
          "_id": "cbe092_s6",
          "stopName": "Marudhamalai",
          "lat": 11.045,
          "lng": 76.88,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe093",
    "busNumber": "TN-38-YX-2834",
    "busCode": "CBE093",
    "status": "Running",
    "speed": 37,
    "fare": 25,
    "availableSeats": 10,
    "departureTime": "04:30 PM",
    "arrivalTime": "07:00 PM",
    "currentStop": "Periyanaickenpalayam",
    "location": {
      "lat": 11.1108227193276,
      "lng": 76.93693862591167,
      "rotation": 149
    },
    "routeId": {
      "routeName": "Narasimhanaickenpalayam → Kavundampalayam",
      "from": "Narasimhanaickenpalayam",
      "to": "Kavundampalayam",
      "path": [
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.14,
          "lng": 76.935
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.045,
          "lng": 76.945
        }
      ],
      "stops": [
        {
          "_id": "cbe093_s0",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "major"
        },
        {
          "_id": "cbe093_s1",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "small"
        },
        {
          "_id": "cbe093_s2",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe093_s3",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe094",
    "busNumber": "TN-38-ET-1434",
    "busCode": "CBE094",
    "status": "Running",
    "speed": 39,
    "fare": 15,
    "availableSeats": 26,
    "departureTime": "10:00 AM",
    "arrivalTime": "12:30 AM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 11.000289306611657,
      "lng": 76.96294210602322,
      "rotation": 15
    },
    "routeId": {
      "routeName": "Town Hall → Railway Station",
      "from": "Town Hall",
      "to": "Railway Station",
      "path": [
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        }
      ],
      "stops": [
        {
          "_id": "cbe094_s0",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "major"
        },
        {
          "_id": "cbe094_s1",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe095",
    "busNumber": "TN-38-JN-4982",
    "busCode": "CBE095",
    "status": "Running",
    "speed": 58,
    "fare": 15,
    "availableSeats": 41,
    "departureTime": "08:00 PM",
    "arrivalTime": "09:00 PM",
    "currentStop": "Karumathampatti",
    "location": {
      "lat": 11.194321822946998,
      "lng": 77.15090544968858,
      "rotation": 120
    },
    "routeId": {
      "routeName": "Karumathampatti → Avinashi",
      "from": "Karumathampatti",
      "to": "Avinashi",
      "path": [
        {
          "lat": 11.1,
          "lng": 77.15
        },
        {
          "lat": 11.193,
          "lng": 77.268
        }
      ],
      "stops": [
        {
          "_id": "cbe095_s0",
          "stopName": "Karumathampatti",
          "lat": 11.1,
          "lng": 77.15,
          "type": "major"
        },
        {
          "_id": "cbe095_s1",
          "stopName": "Avinashi",
          "lat": 11.193,
          "lng": 77.268,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe096",
    "busNumber": "TN-38-OS-9517",
    "busCode": "CBE096",
    "status": "Running",
    "speed": 34,
    "fare": 25,
    "availableSeats": 17,
    "departureTime": "05:00 PM",
    "arrivalTime": "06:30 PM",
    "currentStop": "Kavundampalayam",
    "location": {
      "lat": 11.106981398998967,
      "lng": 76.93743829520064,
      "rotation": 89
    },
    "routeId": {
      "routeName": "Kavundampalayam → Narasimhanaickenpalayam",
      "from": "Kavundampalayam",
      "to": "Narasimhanaickenpalayam",
      "path": [
        {
          "lat": 11.045,
          "lng": 76.945
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.14,
          "lng": 76.935
        },
        {
          "lat": 11.11,
          "lng": 76.938
        }
      ],
      "stops": [
        {
          "_id": "cbe096_s0",
          "stopName": "Kavundampalayam",
          "lat": 11.045,
          "lng": 76.945,
          "type": "major"
        },
        {
          "_id": "cbe096_s1",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe096_s2",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "small"
        },
        {
          "_id": "cbe096_s3",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe097",
    "busNumber": "TN-38-BI-1971",
    "busCode": "CBE097",
    "status": "Running",
    "speed": 40,
    "fare": 15,
    "availableSeats": 19,
    "departureTime": "01:30 PM",
    "arrivalTime": "03:30 PM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 11.001399966152716,
      "lng": 76.96576052483957,
      "rotation": 300
    },
    "routeId": {
      "routeName": "Railway Station → Town Hall",
      "from": "Railway Station",
      "to": "Town Hall",
      "path": [
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.994,
          "lng": 76.9585
        }
      ],
      "stops": [
        {
          "_id": "cbe097_s0",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        },
        {
          "_id": "cbe097_s1",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe098",
    "busNumber": "TN-38-LI-9535",
    "busCode": "CBE098",
    "status": "Running",
    "speed": 41,
    "fare": 25,
    "availableSeats": 19,
    "departureTime": "07:00 PM",
    "arrivalTime": "09:45 PM",
    "currentStop": "Mettupalayam",
    "location": {
      "lat": 11.013788175341881,
      "lng": 77.2886104269943,
      "rotation": 216
    },
    "routeId": {
      "routeName": "Mettupalayam → Palladam",
      "from": "Mettupalayam",
      "to": "Palladam",
      "path": [
        {
          "lat": 11.3,
          "lng": 76.936
        },
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11,
          "lng": 77.288
        }
      ],
      "stops": [
        {
          "_id": "cbe098_s0",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        },
        {
          "_id": "cbe098_s1",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "small"
        },
        {
          "_id": "cbe098_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe098_s3",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe098_s4",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe099",
    "busNumber": "TN-38-BX-5328",
    "busCode": "CBE099",
    "status": "Running",
    "speed": 48,
    "fare": 15,
    "availableSeats": 12,
    "departureTime": "01:30 PM",
    "arrivalTime": "04:00 PM",
    "currentStop": "Madukkarai",
    "location": {
      "lat": 10.909564392660036,
      "lng": 76.95622050890104,
      "rotation": 269
    },
    "routeId": {
      "routeName": "Kuniyamuthur → Madukkarai",
      "from": "Kuniyamuthur",
      "to": "Madukkarai",
      "path": [
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.908,
          "lng": 76.925
        }
      ],
      "stops": [
        {
          "_id": "cbe099_s0",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        },
        {
          "_id": "cbe099_s1",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe099_s2",
          "stopName": "Madukkarai",
          "lat": 10.908,
          "lng": 76.925,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe100",
    "busNumber": "TN-38-JI-6326",
    "busCode": "CBE100",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 28,
    "departureTime": "04:00 PM",
    "arrivalTime": "06:00 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 209
    },
    "routeId": {
      "routeName": "Gandhipuram → Annur",
      "from": "Gandhipuram",
      "to": "Annur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.233,
          "lng": 77.1
        }
      ],
      "stops": [
        {
          "_id": "cbe100_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe100_s1",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "small"
        },
        {
          "_id": "cbe100_s2",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "small"
        },
        {
          "_id": "cbe100_s3",
          "stopName": "Annur",
          "lat": 11.233,
          "lng": 77.1,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe101",
    "busNumber": "TN-38-NW-6951",
    "busCode": "CBE101",
    "status": "Running",
    "speed": 51,
    "fare": 15,
    "availableSeats": 18,
    "departureTime": "01:00 PM",
    "arrivalTime": "03:00 PM",
    "currentStop": "Saravanampatti",
    "location": {
      "lat": 11.029599896748161,
      "lng": 76.97175684890202,
      "rotation": 180
    },
    "routeId": {
      "routeName": "Ganapathy → Saravanampatti",
      "from": "Ganapathy",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.033,
          "lng": 76.974
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe101_s0",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "major"
        },
        {
          "_id": "cbe101_s1",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe102",
    "busNumber": "TN-38-QN-4547",
    "busCode": "CBE102",
    "status": "Running",
    "speed": 52,
    "fare": 15,
    "availableSeats": 37,
    "departureTime": "12:30 PM",
    "arrivalTime": "03:00 AM",
    "currentStop": "Annur",
    "location": {
      "lat": 11.071405899737055,
      "lng": 77.00221056210101,
      "rotation": 115
    },
    "routeId": {
      "routeName": "Annur → Saravanampatti",
      "from": "Annur",
      "to": "Saravanampatti",
      "path": [
        {
          "lat": 11.233,
          "lng": 77.1
        },
        {
          "lat": 11.07,
          "lng": 77
        }
      ],
      "stops": [
        {
          "_id": "cbe102_s0",
          "stopName": "Annur",
          "lat": 11.233,
          "lng": 77.1,
          "type": "major"
        },
        {
          "_id": "cbe102_s1",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe103",
    "busNumber": "TN-38-VK-2244",
    "busCode": "CBE103",
    "status": "Running",
    "speed": 42,
    "fare": 15,
    "availableSeats": 5,
    "departureTime": "12:00 PM",
    "arrivalTime": "01:00 AM",
    "currentStop": "Ganapathy",
    "location": {
      "lat": 11.236633639981502,
      "lng": 76.99834178905138,
      "rotation": 311
    },
    "routeId": {
      "routeName": "Annur → Ganapathy",
      "from": "Annur",
      "to": "Ganapathy",
      "path": [
        {
          "lat": 11.233,
          "lng": 77.1
        },
        {
          "lat": 11.07,
          "lng": 77
        },
        {
          "lat": 11.033,
          "lng": 76.974
        }
      ],
      "stops": [
        {
          "_id": "cbe103_s0",
          "stopName": "Annur",
          "lat": 11.233,
          "lng": 77.1,
          "type": "major"
        },
        {
          "_id": "cbe103_s1",
          "stopName": "Saravanampatti",
          "lat": 11.07,
          "lng": 77,
          "type": "small"
        },
        {
          "_id": "cbe103_s2",
          "stopName": "Ganapathy",
          "lat": 11.033,
          "lng": 76.974,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe104",
    "busNumber": "TN-38-UQ-7499",
    "busCode": "CBE104",
    "status": "Running",
    "speed": 53,
    "fare": 15,
    "availableSeats": 20,
    "departureTime": "10:30 AM",
    "arrivalTime": "12:45 AM",
    "currentStop": "Palladam",
    "location": {
      "lat": 11.012344904208648,
      "lng": 77.28401277729864,
      "rotation": 117
    },
    "routeId": {
      "routeName": "Palladam → Gandhipuram",
      "from": "Palladam",
      "to": "Gandhipuram",
      "path": [
        {
          "lat": 11,
          "lng": 77.288
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        }
      ],
      "stops": [
        {
          "_id": "cbe104_s0",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        },
        {
          "_id": "cbe104_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe104_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe105",
    "busNumber": "TN-38-GT-1427",
    "busCode": "CBE105",
    "status": "Running",
    "speed": 38,
    "fare": 15,
    "availableSeats": 19,
    "departureTime": "02:30 PM",
    "arrivalTime": "04:00 PM",
    "currentStop": "Sundarapuram",
    "location": {
      "lat": 11.000713965532036,
      "lng": 77.02610758366832,
      "rotation": 308
    },
    "routeId": {
      "routeName": "Singanallur → Kuniyamuthur",
      "from": "Singanallur",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe105_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe105_s1",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe105_s2",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe106",
    "busNumber": "TN-38-SS-7118",
    "busCode": "CBE106",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 33,
    "departureTime": "04:00 PM",
    "arrivalTime": "05:15 PM",
    "currentStop": "Singanallur",
    "location": {
      "lat": 11,
      "lng": 77.03,
      "rotation": 182
    },
    "routeId": {
      "routeName": "Singanallur → Tiruppur",
      "from": "Singanallur",
      "to": "Tiruppur",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11,
          "lng": 77.288
        },
        {
          "lat": 11.1085,
          "lng": 77.3411
        }
      ],
      "stops": [
        {
          "_id": "cbe106_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe106_s1",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "small"
        },
        {
          "_id": "cbe106_s2",
          "stopName": "Tiruppur",
          "lat": 11.1085,
          "lng": 77.3411,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe107",
    "busNumber": "TN-38-AF-4729",
    "busCode": "CBE107",
    "status": "Running",
    "speed": 41,
    "fare": 25,
    "availableSeats": 6,
    "departureTime": "08:30 AM",
    "arrivalTime": "09:45 AM",
    "currentStop": "Thudiyalur",
    "location": {
      "lat": 11.108433315688922,
      "lng": 76.94390659762729,
      "rotation": 327
    },
    "routeId": {
      "routeName": "Thudiyalur → Mettupalayam",
      "from": "Thudiyalur",
      "to": "Mettupalayam",
      "path": [
        {
          "lat": 11.07,
          "lng": 76.94
        },
        {
          "lat": 11.14,
          "lng": 76.935
        },
        {
          "lat": 11.11,
          "lng": 76.938
        },
        {
          "lat": 11.3,
          "lng": 76.936
        }
      ],
      "stops": [
        {
          "_id": "cbe107_s0",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        },
        {
          "_id": "cbe107_s1",
          "stopName": "Periyanaickenpalayam",
          "lat": 11.14,
          "lng": 76.935,
          "type": "small"
        },
        {
          "_id": "cbe107_s2",
          "stopName": "Narasimhanaickenpalayam",
          "lat": 11.11,
          "lng": 76.938,
          "type": "small"
        },
        {
          "_id": "cbe107_s3",
          "stopName": "Mettupalayam",
          "lat": 11.3,
          "lng": 76.936,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe108",
    "busNumber": "TN-38-NL-4081",
    "busCode": "CBE108",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 12,
    "departureTime": "01:00 PM",
    "arrivalTime": "02:45 PM",
    "currentStop": "Palladam",
    "location": {
      "lat": 11,
      "lng": 77.288,
      "rotation": 345
    },
    "routeId": {
      "routeName": "Palladam → Thudiyalur",
      "from": "Palladam",
      "to": "Thudiyalur",
      "path": [
        {
          "lat": 11,
          "lng": 77.288
        },
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11.07,
          "lng": 76.94
        }
      ],
      "stops": [
        {
          "_id": "cbe108_s0",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        },
        {
          "_id": "cbe108_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "small"
        },
        {
          "_id": "cbe108_s2",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "small"
        },
        {
          "_id": "cbe108_s3",
          "stopName": "Thudiyalur",
          "lat": 11.07,
          "lng": 76.94,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe109",
    "busNumber": "TN-38-ON-7006",
    "busCode": "CBE109",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 29,
    "departureTime": "08:30 AM",
    "arrivalTime": "10:15 AM",
    "currentStop": "Madukkarai",
    "location": {
      "lat": 10.908,
      "lng": 76.925,
      "rotation": 303
    },
    "routeId": {
      "routeName": "Madukkarai → Kuniyamuthur",
      "from": "Madukkarai",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 10.908,
          "lng": 76.925
        },
        {
          "lat": 10.95,
          "lng": 76.97
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe109_s0",
          "stopName": "Madukkarai",
          "lat": 10.908,
          "lng": 76.925,
          "type": "major"
        },
        {
          "_id": "cbe109_s1",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "small"
        },
        {
          "_id": "cbe109_s2",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe110",
    "busNumber": "TN-38-ST-7838",
    "busCode": "CBE110",
    "status": "Running",
    "speed": 59,
    "fare": 15,
    "availableSeats": 40,
    "departureTime": "07:00 PM",
    "arrivalTime": "09:15 PM",
    "currentStop": "Town Hall",
    "location": {
      "lat": 10.990327630123616,
      "lng": 76.96025055915295,
      "rotation": 332
    },
    "routeId": {
      "routeName": "Town Hall → Ukkadam",
      "from": "Town Hall",
      "to": "Ukkadam",
      "path": [
        {
          "lat": 10.994,
          "lng": 76.9585
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        }
      ],
      "stops": [
        {
          "_id": "cbe110_s0",
          "stopName": "Town Hall",
          "lat": 10.994,
          "lng": 76.9585,
          "type": "major"
        },
        {
          "_id": "cbe110_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe111",
    "busNumber": "TN-38-DR-5381",
    "busCode": "CBE111",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 36,
    "departureTime": "10:30 PM",
    "arrivalTime": "12:00 PM",
    "currentStop": "Singanallur",
    "location": {
      "lat": 11,
      "lng": 77.03,
      "rotation": 178
    },
    "routeId": {
      "routeName": "Singanallur → Palladam",
      "from": "Singanallur",
      "to": "Palladam",
      "path": [
        {
          "lat": 11,
          "lng": 77.03
        },
        {
          "lat": 11,
          "lng": 77.288
        }
      ],
      "stops": [
        {
          "_id": "cbe111_s0",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        },
        {
          "_id": "cbe111_s1",
          "stopName": "Palladam",
          "lat": 11,
          "lng": 77.288,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe112",
    "busNumber": "TN-38-OK-1188",
    "busCode": "CBE112",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 15,
    "departureTime": "11:15 PM",
    "arrivalTime": "01:00 AM",
    "currentStop": "Railway Station",
    "location": {
      "lat": 10.9975,
      "lng": 76.965,
      "rotation": 203
    },
    "routeId": {
      "routeName": "Railway Station → Sundarapuram",
      "from": "Railway Station",
      "to": "Sundarapuram",
      "path": [
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        },
        {
          "lat": 10.95,
          "lng": 76.97
        }
      ],
      "stops": [
        {
          "_id": "cbe112_s0",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "major"
        },
        {
          "_id": "cbe112_s1",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe112_s2",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "small"
        },
        {
          "_id": "cbe112_s3",
          "stopName": "Sundarapuram",
          "lat": 10.95,
          "lng": 76.97,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe113",
    "busNumber": "TN-38-LI-2607",
    "busCode": "CBE113",
    "status": "Running",
    "speed": 43,
    "fare": 15,
    "availableSeats": 5,
    "departureTime": "04:00 PM",
    "arrivalTime": "05:15 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.013382466665954,
      "lng": 76.96385599404654,
      "rotation": 5
    },
    "routeId": {
      "routeName": "Gandhipuram → Singanallur",
      "from": "Gandhipuram",
      "to": "Singanallur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 11,
          "lng": 77.03
        }
      ],
      "stops": [
        {
          "_id": "cbe113_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe113_s1",
          "stopName": "Singanallur",
          "lat": 11,
          "lng": 77.03,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe114",
    "busNumber": "TN-38-VS-4522",
    "busCode": "CBE114",
    "status": "Boarding",
    "speed": 0,
    "fare": 25,
    "availableSeats": 16,
    "departureTime": "10:30 PM",
    "arrivalTime": "12:30 PM",
    "currentStop": "Gandhipuram",
    "location": {
      "lat": 11.0168,
      "lng": 76.9639,
      "rotation": 21
    },
    "routeId": {
      "routeName": "Gandhipuram → Kuniyamuthur",
      "from": "Gandhipuram",
      "to": "Kuniyamuthur",
      "path": [
        {
          "lat": 11.0168,
          "lng": 76.9639
        },
        {
          "lat": 10.9975,
          "lng": 76.965
        },
        {
          "lat": 10.9877,
          "lng": 76.9616
        },
        {
          "lat": 10.9576,
          "lng": 76.9538
        }
      ],
      "stops": [
        {
          "_id": "cbe114_s0",
          "stopName": "Gandhipuram",
          "lat": 11.0168,
          "lng": 76.9639,
          "type": "major"
        },
        {
          "_id": "cbe114_s1",
          "stopName": "Railway Station",
          "lat": 10.9975,
          "lng": 76.965,
          "type": "small"
        },
        {
          "_id": "cbe114_s2",
          "stopName": "Ukkadam",
          "lat": 10.9877,
          "lng": 76.9616,
          "type": "small"
        },
        {
          "_id": "cbe114_s3",
          "stopName": "Kuniyamuthur",
          "lat": 10.9576,
          "lng": 76.9538,
          "type": "major"
        }
      ]
    }
  },
  {
    "_id": "bus_cbe115",
    "busNumber": "TN-38-BM-8093",
    "busCode": "CBE115",
    "status": "Boarding",
    "speed": 0,
    "fare": 15,
    "availableSeats": 16,
    "departureTime": "10:30 AM",
    "arrivalTime": "11:30 AM",
    "currentStop": "Pollachi",
    "location": {
      "lat": 10.662,
      "lng": 77.006,
      "rotation": 132
    },
    "routeId": {
      "routeName": "Pollachi → Kinathukadavu",
      "from": "Pollachi",
      "to": "Kinathukadavu",
      "path": [
        {
          "lat": 10.662,
          "lng": 77.006
        },
        {
          "lat": 10.85,
          "lng": 76.98
        }
      ],
      "stops": [
        {
          "_id": "cbe115_s0",
          "stopName": "Pollachi",
          "lat": 10.662,
          "lng": 77.006,
          "type": "major"
        },
        {
          "_id": "cbe115_s1",
          "stopName": "Kinathukadavu",
          "lat": 10.85,
          "lng": 76.98,
          "type": "major"
        }
      ]
    }
  }
];
