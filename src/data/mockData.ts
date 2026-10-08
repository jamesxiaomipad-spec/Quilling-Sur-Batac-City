import {
  LocalUpdate,
  Dormitory,
  TransportRoute,
  DriverContact,
  Spot,
  ForumPost,
  EmergencyContact,
  IlocanoPhrase
} from '../types';

export const INITIAL_UPDATES: LocalUpdate[] = [
  {
    id: 'upd-1',
    title: 'Advisory: INEC Scheduled Maintenance - Batac Substation Feeder 2',
    category: 'power',
    urgency: 'high',
    timestamp: '2 hours ago',
    location: 'Quiling Sur, Quiling Norte, MMSU Main Campus',
    summary: 'Temporary power interruption on Saturday from 8:00 AM to 5:00 PM for transformer upgrading and pole replacement.',
    content: 'The Ilocos Norte Electric Cooperative (INEC) informs member-consumer-owners in Quiling Sur, parts of MMSU Main Campus, and neighboring sitios that electricity will be temporarily shut off for line relocation along the bypass road. Students are advised to charge essential devices and flashlights. MMSU Library will operate on standby generator from 9:00 AM to 4:00 PM.',
    source: 'INEC Batac Substation & Bgy. Quiling Sur Council',
    likes: 42,
    isImportant: true,
  },
  {
    id: 'upd-2',
    title: 'MMSU 1st Semester Midterm Exam Week & Study Hub Extended Hours',
    category: 'mmsu',
    urgency: 'info',
    timestamp: '5 hours ago',
    location: 'MMSU CAS & University Library, Quiling Sur',
    summary: 'University Main Library in Batac will be open until 10:00 PM with free high-speed Wi-Fi and airconditioned study lounges.',
    content: 'In preparation for midterm examinations, the MMSU University Library and CAS Reading Pavilions are extending operational hours until 10:00 PM starting this Monday through Friday. Please observe silence and bring your valid MMSU student ID for automated turnstile entry.',
    source: 'Office of Student Affairs and Services (OSAS)',
    likes: 68,
  },
  {
    id: 'upd-3',
    title: 'Typhoon Preparedness: CDRRMO Batac Weather Bulletin #3',
    category: 'emergency',
    urgency: 'medium',
    timestamp: 'Yesterday at 4:30 PM',
    location: 'Batac City & Riverside Corridors',
    summary: 'Southwest monsoon enhanced by LPA brings light to moderate rains. Water level in Quiling River remains normal.',
    content: 'Batac City Disaster Risk Reduction and Management Office (CDRRMO) is continuously monitoring riverways and low-lying puroks in Quiling Sur. Emergency response teams and rescue boats are on standby at the Batac City Hall Operations Center. In case of localized flooding or fallen branches, dial 911 or Batac Rescue at (077) 792-3111.',
    source: 'Batac CDRRMO & PAGASA Laoag Radar',
    likes: 51,
  },
  {
    id: 'upd-4',
    title: 'Barangay Quiling Sur: Free Anti-Rabies Vaccination for Pets',
    category: 'barangay',
    urgency: 'info',
    timestamp: '2 days ago',
    location: 'Quiling Sur Barangay Multipurpose Hall',
    summary: 'Batac City Veterinary Office is conducting free dog and cat vaccination on Thursday starting at 8:30 AM.',
    content: 'All residents, boarding house tenants, and pet owners in Purok 1 to Purok 6 are encouraged to bring their pets for free rabies vaccines. Please ensure dogs are leashed and cats are secured in carriers.',
    source: 'Brgy. Captain Office - Quiling Sur',
    likes: 29,
  },
  {
    id: 'upd-5',
    title: 'Batac Riverside Empanadahan: Weekend Cultural Night & Food Fair',
    category: 'market',
    urgency: 'info',
    timestamp: '3 days ago',
    location: 'Riverside Food Park (5 mins from Quiling Sur)',
    summary: 'Special discounts on authentic Batac Special Empanada, Miki, and live acoustic music by MMSU student bands.',
    content: 'Join the Friday night gathering by the river! Food stalls will stay open until midnight with stalls offering hot Ilocos empanadas with fresh longganisa, egg, and spicy sukang Iloko.',
    source: 'Batac City Tourism Office',
    likes: 85,
  }
];

export const INITIAL_DORMS: Dormitory[] = [
  {
    id: 'dorm-1',
    name: 'Villa Mariano Green Residences',
    landlord: 'Auntie Corazon Valdez',
    phone: '0917-542-8819',
    purok: 'Purok 2',
    address: 'Don Mariano Marcos Ave, Quiling Sur (Opposite MMSU CAS Gate 2)',
    distanceToMMSU: '150 meters',
    nearestCollege: 'College of Arts and Sciences (CAS) & COE',
    walkingMinutes: 3,
    genderPolicy: 'coed',
    lat: 18.0610,
    lng: 120.5489,
    minPrice: 1500,
    maxPrice: 4500,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 1500,
        slotsAvailable: 4,
        inclusions: 'Bed with foam, study desk, cabinet, free high-speed fiber Wi-Fi'
      },
      {
        type: 'Solo Room',
        priceMonthly: 3800,
        slotsAvailable: 1,
        inclusions: 'Private room, wall fan, submetered AC outlet, study area'
      },
      {
        type: 'Studio Unit',
        priceMonthly: 4500,
        slotsAvailable: 2,
        inclusions: 'Inverter Aircon, private toilet & bath, induction cooker space'
      }
    ],
    amenities: ['100 Mbps Converge Fiber', '24/7 CCTV & RFID Gate', 'Generator Backup', 'Drinking Water Refill', 'Kitchen Area', 'Laundry Drying Area'],
    curfew: '10:30 PM (Exceptions for late labs/thesis with pass)',
    cookingAllowed: true,
    airconAvailable: true,
    generatorBackup: true,
    hasWifi: true,
    submeteredPower: true,
    rating: 4.8,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premier student boarding house located right across MMSU Gate 2. Equipped with solar-assisted inverter generator so you can study even during scheduled INEC power interruptions. Very friendly landlady who also runs an affordable carinderia nearby.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Bea Ramos',
        role: 'BS Biology 3rd Year',
        rating: 5,
        comment: 'Super peaceful environment! The Wi-Fi never drops even when streaming recorded lectures, and Auntie Corazon treats us like her own kids.',
        date: '2 weeks ago'
      },
      {
        id: 'rev-2',
        author: 'Mark Lester',
        role: 'BS Civil Engineering',
        rating: 4.6,
        comment: 'Very close to COE and CAS. Generator worked flawlessly during the last typhoon.',
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'dorm-2',
    name: 'St. Therese Ladies Dormitory',
    landlord: 'Mrs. Milagros Agcaoili',
    phone: '0928-319-4450',
    purok: 'Purok 1',
    address: 'Near MMSU Canopy Walkway, Quiling Sur, Batac City',
    distanceToMMSU: '80 meters',
    nearestCollege: 'College of Arts and Sciences (CAS)',
    walkingMinutes: 2,
    genderPolicy: 'female',
    lat: 18.0604,
    lng: 120.5474,
    minPrice: 1200,
    maxPrice: 3200,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 1200,
        slotsAvailable: 6,
        inclusions: 'Bunk bed with Uratex mattress, personal locker, water included'
      },
      {
        type: '2-Person Room',
        priceMonthly: 2400,
        slotsAvailable: 2,
        inclusions: 'Shared between 2 roommates, 2 study desks, window ventilation'
      },
      {
        type: 'Solo Room',
        priceMonthly: 3200,
        slotsAvailable: 1,
        inclusions: 'Private room with ceiling fan, wall cabinet, wide window'
      }
    ],
    amenities: ['Strict All-Female Security', 'PLDT Home Fiber', 'Lobby Study Tables', 'Purified Mineral Water Dispenser', 'Common Refrigerator & Microwave'],
    curfew: '10:00 PM strict (Guard on duty)',
    cookingAllowed: true,
    airconAvailable: false,
    generatorBackup: false,
    hasWifi: true,
    submeteredPower: false,
    rating: 4.7,
    reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Trusted all-ladies boarding house favored by freshmen and nursing/allied health students. Located along the well-lit walkway directly connecting to MMSU CAS and the University Library.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Krizza Joy',
        role: 'Freshman - BS Nursing',
        rating: 5,
        comment: 'My parents love that it is all-girls with a strict gatekeeper. It feels so safe and clean.',
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'dorm-3',
    name: 'Pine Tree Quiling Men’s Hall',
    landlord: 'Sir Jojo Castillo',
    phone: '0908-771-6202',
    purok: 'Purok 4',
    address: 'Riverside Road, Quiling Sur (behind CAFSD demo farm)',
    distanceToMMSU: '350 meters',
    nearestCollege: 'College of Agriculture, Food & Sustainable Dev. (CAFSD) / COE',
    walkingMinutes: 6,
    genderPolicy: 'male',
    lat: 18.0625,
    lng: 120.5505,
    minPrice: 1100,
    maxPrice: 2800,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 1100,
        slotsAvailable: 8,
        inclusions: 'Spacious bunk bed, shoe rack, shared CR, ceiling fan'
      },
      {
        type: 'Solo Room',
        priceMonthly: 2800,
        slotsAvailable: 2,
        inclusions: 'Personal solo room, wooden closet, wide desk for drafting/plates'
      }
    ],
    amenities: ['High Speed Wi-Fi', 'Drafting Table Area for Engineering', 'Motorcycle / Bike Parking', 'Outdoor Calisthenics Bar', 'Free Water'],
    curfew: 'No Curfew (Independent key card)',
    cookingAllowed: true,
    airconAvailable: false,
    generatorBackup: false,
    hasWifi: true,
    submeteredPower: true,
    rating: 4.5,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Quiet, breezy dormitory designed for engineering and agriculture male students. Dedicated plate-making and drafting benches on the 2nd-floor terrace.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-4',
        author: 'Arjay Santos',
        role: 'BS Agricultural Engineering',
        rating: 4.8,
        comment: 'Great camaraderie among boarders. Lots of drafting space for our engineering plates.',
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'dorm-4',
    name: 'The Scholar Haven Modern Studio Suites',
    landlord: 'Engr. Ryan Pasion',
    phone: '0917-882-9901',
    purok: 'Purok 3',
    address: 'National Highway, Quiling Sur (near 7-Eleven & MMMH&MC bypass)',
    distanceToMMSU: '400 meters',
    nearestCollege: 'College of Health Sciences (CHS) & MMSU Admin',
    walkingMinutes: 7,
    genderPolicy: 'coed',
    lat: 18.0580,
    lng: 120.5510,
    minPrice: 3500,
    maxPrice: 6500,
    roomOptions: [
      {
        type: 'Solo Room',
        priceMonthly: 3500,
        slotsAvailable: 2,
        inclusions: 'Aircon ready, private shower, study nook with ergonomic chair'
      },
      {
        type: 'Studio Unit',
        priceMonthly: 5500,
        slotsAvailable: 3,
        inclusions: 'Carrier Inverter AC, personal kitchenette, private balcony, Smart TV'
      }
    ],
    amenities: ['150 Mbps Dual ISP (Globe & PLDT)', 'Full Inverter Generator Backup', 'Individual Electric & Water Submeter', 'Roofdeck Cafe & Study Room', 'Digital Smart Door Locks'],
    curfew: 'No Curfew (Biometric Access)',
    cookingAllowed: true,
    airconAvailable: true,
    generatorBackup: true,
    hasWifi: true,
    submeteredPower: true,
    rating: 4.9,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Modern condominium-style student housing for MMSU med/nursing students, graduate students, and young professionals. Features top-tier fiber speeds and uninterrupted power backup.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-5',
        author: 'Dr. Camille Tan',
        role: 'Postgraduate Intern - MMMH&MC',
        rating: 5,
        comment: 'Hands down the best place to sleep after a 24-hour hospital duty. Silent, cold AC, and 100% reliable power.',
        date: '5 days ago'
      }
    ]
  },
  {
    id: 'dorm-5',
    name: 'Sampaguita Budget Boarding House',
    landlord: 'Tatay Noli Manuel',
    phone: '0939-441-1192',
    purok: 'Purok 5',
    address: 'Interior Purok 5, Quiling Sur (near Quiling Sur Daycare)',
    distanceToMMSU: '500 meters',
    nearestCollege: 'CBEA & MMSU Main Oval',
    walkingMinutes: 8,
    genderPolicy: 'coed',
    lat: 18.0632,
    lng: 120.5470,
    minPrice: 900,
    maxPrice: 2000,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 900,
        slotsAvailable: 5,
        inclusions: 'Double deck bed, electric fan included in rent, shared kitchen'
      },
      {
        type: '2-Person Room',
        priceMonthly: 1800,
        slotsAvailable: 1,
        inclusions: 'Shared between 2 persons, inclusive of water bill'
      }
    ],
    amenities: ['Community Wi-Fi', 'Free Potable Water', 'Gas Stove Cooking Area', 'Spacious Backyard for laundry', 'Pet friendly'],
    curfew: '11:00 PM',
    cookingAllowed: true,
    airconAvailable: false,
    generatorBackup: false,
    hasWifi: true,
    submeteredPower: false,
    rating: 4.3,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Most affordable student lodging in Quiling Sur. Ideal for budget-conscious provincial scholars. Homely provincial setting with mango trees and garden.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Jerome D.',
        role: 'BS Forestry 2nd Year',
        rating: 4.4,
        comment: 'Very friendly owner. Rent is super affordable and water is always strong.',
        date: '2 months ago'
      }
    ]
  },
  {
    id: 'dorm-6',
    name: 'University Heights Stallion Residence',
    landlord: 'Engr. Ferdinand Ramos',
    phone: '0917-339-1120',
    purok: 'Purok 2',
    address: 'Purok 2 Highway, Quiling Sur (2 mins to COE Gate)',
    distanceToMMSU: '200 meters',
    nearestCollege: 'College of Engineering (COE)',
    walkingMinutes: 3,
    genderPolicy: 'coed',
    lat: 18.0588,
    lng: 120.5460,
    minPrice: 1800,
    maxPrice: 4200,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 1800,
        slotsAvailable: 6,
        inclusions: 'Aircon room bedspace, foam mattress, study cubicle with lamp'
      },
      {
        type: 'Solo Room',
        priceMonthly: 4200,
        slotsAvailable: 2,
        inclusions: 'Solo room with aircon submeter, private window, study desk'
      }
    ],
    amenities: ['Solar Generator Backup', 'Fiber Wi-Fi', 'Engineering Drafting Tables', 'Water Dispenser', 'Gated RFID Access'],
    curfew: '11:00 PM',
    cookingAllowed: true,
    airconAvailable: true,
    generatorBackup: true,
    hasWifi: true,
    submeteredPower: true,
    rating: 4.8,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Purpose-built for engineering, architecture, and science students. Features well-lit drafting benches and reliable solar backup during power outages.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'Kevin T.',
        role: 'BS Mechanical Engineering',
        rating: 5,
        comment: 'Great study atmosphere and walking to COE takes only 3 minutes!',
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'dorm-7',
    name: 'Green Valley Quiling Ladies Haven',
    landlord: 'Nanay Beth Corpuz',
    phone: '0920-449-8172',
    purok: 'Purok 1',
    address: 'Purok 1 near CAS Canopy, Quiling Sur',
    distanceToMMSU: '120 meters',
    nearestCollege: 'College of Arts and Sciences (CAS)',
    walkingMinutes: 2,
    genderPolicy: 'female',
    lat: 18.0612,
    lng: 120.5472,
    minPrice: 1400,
    maxPrice: 2900,
    roomOptions: [
      {
        type: 'Bedspace',
        priceMonthly: 1400,
        slotsAvailable: 5,
        inclusions: 'Shared room (2 per room), ceiling fan, study corner'
      },
      {
        type: 'Solo Room',
        priceMonthly: 2900,
        slotsAvailable: 1,
        inclusions: 'Private room with closet and wall mirror, window view'
      }
    ],
    amenities: ['High Speed Wi-Fi', '24/7 Gate Guard', 'Purified Drinking Water', 'Common Refrigerator', 'Outdoor Laundry Area'],
    curfew: '10:00 PM',
    cookingAllowed: true,
    airconAvailable: false,
    generatorBackup: false,
    hasWifi: true,
    submeteredPower: false,
    rating: 4.6,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cozy and very secure all-female boarding house right beside the CAS canopy walkway. Well-lit and quiet.',
    verifiedLandlord: true,
    reviews: [
      {
        id: 'rev-8',
        author: 'Grace Ann',
        role: 'BS Applied Mathematics',
        rating: 4.8,
        comment: 'Super peaceful, feels like home. Nanay Beth is very caring.',
        date: '1 month ago'
      }
    ]
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'tr-1',
    origin: 'Batac City Public Market / Riverside',
    destination: 'MMSU CAS Gate & Quiling Sur',
    vehicleType: 'Tricycle',
    regularFare: 20,
    studentFare: 16,
    seniorFare: 16,
    travelTimeMinutes: 6,
    operatingHours: '5:00 AM - 9:30 PM (Special trip on late hours)',
    description: 'Standard Batac TODA tricycle trip from the town center / Riverside Empanadahan to Quiling Sur MMSU gate.',
    terminalLocation: 'Batac Public Market TODA Terminal'
  },
  {
    id: 'tr-2',
    origin: 'Quiling Sur (MMSU Gate 2)',
    destination: 'Mariano Marcos Memorial Hospital (MMMH&MC)',
    vehicleType: 'Tricycle',
    regularFare: 25,
    studentFare: 20,
    seniorFare: 20,
    travelTimeMinutes: 7,
    operatingHours: '24 Hours (Hospital line active)',
    description: 'Direct route to Batac Regional Hospital emergency room & outpatient clinic.',
    terminalLocation: 'Quiling Sur Gate 2 Tricycle Stand'
  },
  {
    id: 'tr-3',
    origin: 'Batac City (Quiling Sur Junction)',
    destination: 'Laoag City (Rizal Park / Terminal)',
    vehicleType: 'Jeepney',
    regularFare: 40,
    studentFare: 32,
    seniorFare: 32,
    travelTimeMinutes: 35,
    operatingHours: '5:30 AM - 7:30 PM (Leaves every 15 mins)',
    description: 'Batac-San Nicolas-Laoag traditional and modernized jeepneys. Fast commute to provincial capital.',
    terminalLocation: 'Batac Junction Waiting Shed along National Highway'
  },
  {
    id: 'tr-4',
    origin: 'Batac City (Quiling Sur)',
    destination: 'Paoay UNESCO Church & Paoay Sand Dunes',
    vehicleType: 'Jeepney',
    regularFare: 25,
    studentFare: 20,
    seniorFare: 20,
    travelTimeMinutes: 18,
    operatingHours: '6:00 AM - 6:00 PM',
    description: 'Batac-Paoay line passing Malacañang of the North and Paoay Lake scenic highway.',
    terminalLocation: 'Batac-Paoay Terminal near Batac Church'
  },
  {
    id: 'tr-5',
    origin: 'MMSU Batac Campus',
    destination: 'MMSU Laoag Campus (CTE - Teacher Education)',
    vehicleType: 'Jeepney',
    regularFare: 40,
    studentFare: 32,
    seniorFare: 32,
    travelTimeMinutes: 38,
    operatingHours: '6:00 AM - 7:00 PM',
    description: 'Inter-campus student commute directly dropping off at MMSU CTE Laoag.',
    terminalLocation: 'Highway waiting shed or Laoag jeep terminal'
  },
  {
    id: 'tr-6',
    origin: 'Batac City (National Highway)',
    destination: 'Manila (Cubao / Sampaloc / Pasay)',
    vehicleType: 'Bus',
    regularFare: 950,
    studentFare: 760,
    seniorFare: 760,
    travelTimeMinutes: 510,
    operatingHours: 'Partas / Farinas / Florida departure trips daily (morning & night)',
    description: 'Airconditioned executive sleeper and regular deluxe provincial buses to Metro Manila.',
    terminalLocation: 'Partas Bus Terminal Batac & Farinas Booking Office'
  }
];

export const DRIVER_CONTACTS: DriverContact[] = [
  {
    id: 'drv-1',
    name: 'Manong Nestor Agtarap',
    todaUnit: 'Quiling Sur TODA #042',
    plateNo: 'IL-4291',
    phone: '0921-884-2190',
    standLocation: 'MMSU CAS Gate 2 Stand',
    rating: 4.9,
    availableHours: '6:00 AM - 8:00 PM',
    isOnline: true
  },
  {
    id: 'drv-2',
    name: 'Kuya Bryan Pascual',
    todaUnit: 'Batac Riverside TODA #118',
    plateNo: 'IL-8802',
    phone: '0930-112-9441',
    standLocation: 'Batac Public Market & 7-Eleven Quiling',
    rating: 4.8,
    availableHours: '24 Hours (Night Special Call)',
    isOnline: true
  },
  {
    id: 'drv-3',
    name: 'Manong Dante Coloma',
    todaUnit: 'Quiling Sur TODA #077',
    plateNo: 'IL-1934',
    phone: '0919-654-7023',
    standLocation: 'Barangay Quiling Sur Multipurpose Hall',
    rating: 4.9,
    availableHours: '5:30 AM - 6:30 PM',
    isOnline: false
  },
  {
    id: 'drv-4',
    name: 'Kuya Jefferson Ruiz',
    todaUnit: 'MMSU Student Line TODA #093',
    plateNo: 'IL-6210',
    phone: '0945-330-1849',
    standLocation: 'MMSU Main Oval & COE Gate',
    rating: 5.0,
    availableHours: '7:00 AM - 9:00 PM',
    isOnline: true
  }
];

export const TOURISM_SPOTS: Spot[] = [
  {
    id: 'spot-1',
    name: 'Batac Riverside Empanadahan (Glory’s & Evelyn’s)',
    category: 'empanada_food',
    address: 'Batac Riverside Promenade, Washington St, Batac City',
    distanceFromMMSU: '1.2 km (5 mins by tricycle)',
    priceLevel: '₱',
    operatingHours: '9:00 AM - 11:30 PM daily',
    description: 'The world-famous heart of Ilocano culinary tradition! Batac orange empanada made with rice flour dough stuffed with freshly grated green papaya, native Batac garlic longganisa, and fresh egg, fried to perfection and eaten with spicy Ilocano vinegar (sukang Iloko).',
    mustTryOrTip: 'Order the "Special Double-Egg Double-Longganisa" (₱70-80). Pair with authentic Batac Miki noodles with annatto broth and crushed chicharon.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    tags: ['Batac Empanada', 'Iconic Food', 'Miki', 'Night Market'],
    googleMapsQuery: 'Batac Riverside Empanada Batac City'
  },
  {
    id: 'spot-2',
    name: 'Mariano Marcos State University (MMSU) Main Campus Landmark',
    category: 'mmsu_landmark',
    address: 'Brgy. Quiling Sur, Batac City, Ilocos Norte',
    distanceFromMMSU: 'Located right in Quiling Sur',
    priceLevel: 'Free',
    operatingHours: 'Open campus grounds: 6:00 AM - 7:00 PM',
    description: 'A premier state university in Northern Luzon spanning lush green rolling acres in Quiling Sur. Features the MMSU Canopy, the National Bioenergy Research Center, university dragon fruit demo farm, and expansive agro-tourism trail.',
    mustTryOrTip: 'Drop by the MMSU Food Processing and Innovation Center at CAFSD for authentic MMSU Sweet Corn, Kamangeg delicacies, and Dragon fruit ice cream.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    tags: ['MMSU Campus', 'Agritourism', 'Academic Hub', 'Green Spaces'],
    googleMapsQuery: 'Mariano Marcos State University Batac'
  },
  {
    id: 'spot-3',
    name: 'Marcos Museum, Mausoleum & World Peace Center',
    category: 'heritage',
    address: 'Lacaba St, Batac Poblacion (near Batac Catholic Church)',
    distanceFromMMSU: '1.4 km (6 mins by tricycle)',
    priceLevel: '₱',
    operatingHours: '8:00 AM - 5:00 PM (Tuesday to Sunday)',
    description: 'Historic Spanish-colonial ancestral mansion showcasing the extensive memorabilia, personal artifacts, and political journey of the 10th President Ferdinand E. Marcos, born in Batac.',
    mustTryOrTip: 'Tour guides offer detailed local historical commentary. Great heritage photography spot with surrounding vintage streetlamps.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    tags: ['Heritage', 'Museum', 'History', 'Landmark'],
    googleMapsQuery: 'Marcos Museum and Mausoleum Batac'
  },
  {
    id: 'spot-4',
    name: 'Mariano Marcos Memorial Hospital & Medical Center (MMMH&MC)',
    category: 'health_essential',
    address: 'Brgy. 6 San Julian, Batac City (connected to Quiling bypass)',
    distanceFromMMSU: '1.1 km from Quiling Sur',
    priceLevel: '₱₱',
    operatingHours: '24/7 Emergency & Tertiary Care',
    description: 'The premier tertiary government training hospital in Ilocos Norte. Full emergency trauma center, specialized outpatient clinics, hemodialysis unit, and pharmacy.',
    mustTryOrTip: 'For students needing medical clearances, physical exams, or emergency care, present MMSU Student ID for priority assistance.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    tags: ['Tertiary Hospital', '24/7 Emergency', 'Pharmacy', 'Health'],
    googleMapsQuery: 'Mariano Marcos Memorial Hospital and Medical Center Batac'
  },
  {
    id: 'spot-5',
    name: 'Paoay Lake & Malacañang of the North (Near Batac Border)',
    category: 'heritage',
    address: 'Suba, Paoay (boundary of Batac & Paoay)',
    distanceFromMMSU: '6 km (15 mins by trike/jeep from Quiling Sur)',
    priceLevel: '₱',
    operatingHours: '8:30 AM - 5:00 PM',
    description: 'A serene freshwater lake wrapped in local mythology, accompanied by the stately two-storey mansion overlooking the tranquil waters. Cool breeze and scenic mountain backdrops.',
    mustTryOrTip: 'Perfect weekend afternoon study escape or bike ride from MMSU Quiling Sur. Bring a camera for lake sunset views.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['Nature', 'Paoay Lake', 'Weekend Getaway', 'Scenic'],
    googleMapsQuery: 'Malacanang of the North Paoay Lake'
  },
  {
    id: 'spot-6',
    name: 'Quiling Sur Student Food Strip & Study Nooks',
    category: 'student_hub',
    address: 'Don Mariano Marcos Ave strip along Quiling Sur',
    distanceFromMMSU: '50-200 meters from CAS Gates',
    priceLevel: '₱',
    operatingHours: '6:30 AM - 10:00 PM',
    description: 'Bustling student row filled with budget carinderias (Nanay Gina, Ate Mayeth), milk tea bars, 24/7 7-Eleven, fast photocopying/thesis ring-binding shops, and automated laundry shops.',
    mustTryOrTip: 'Try the ₱50 "Silog with free sabaw" combos and iced Spanish Latte at Kape Quiling across Gate 2.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tags: ['Carinderia', 'Budget Meals', 'Milk Tea', 'Print Shops', 'Laundry'],
    googleMapsQuery: 'MMSU Quiling Sur Batac restaurants'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Alyssa Marie',
    authorRole: 'MMSU Student',
    avatarColor: 'bg-emerald-500',
    title: 'PASALO: Solo Room with AC outlet in Quiling Sur (near CAS Gate 2)',
    content: 'Hi fellow Stallions! Looking for someone to take over my solo room at Villa Mariano Green Residences starting next month. Rent is ₱3,500/month, inclusive of Converge fiber Wi-Fi. Quiet floor, friendly landlady, with backup generator! Graduating this semester so passing it over. DM or comment below if interested!',
    category: 'pasalo',
    tags: ['SoloRoom', 'Pasalo', 'QuilingSur', 'WiFi'],
    timestamp: '3 hours ago',
    likes: 18,
    contactHint: 'Call/Text 0917-542-8819 (mention Alyssa room 204)',
    comments: [
      {
        id: 'comm-1',
        author: 'Jericho V.',
        authorRole: 'Freshman',
        avatarColor: 'bg-teal-500',
        content: 'Is cooking allowed inside or is there a shared kitchen area?',
        timestamp: '2 hours ago',
        likes: 3
      },
      {
        id: 'comm-2',
        author: 'Alyssa Marie',
        authorRole: 'MMSU Student',
        avatarColor: 'bg-emerald-500',
        content: '@Jericho Yes! There is a shared gas stove and cooking area on the 1st floor, plus you can use rice cookers and airfryers in the room.',
        timestamp: '1 hour ago',
        likes: 5
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Manong Nestor',
    authorRole: 'Quiling Sur Local',
    avatarColor: 'bg-amber-600',
    title: 'Reminder on Tricycle Student Fare: Always present valid MMSU ID!',
    content: 'Naimbag a bigat kadakayo amin! As member of Quiling Sur TODA, we remind student commuters that the 20% discount applies on regular route trips (₱16 instead of ₱20). Please ready your student ID or MMSU Portal e-ID upon riding so there will be no misunderstanding with drivers. Let’s keep Batac commuting safe and pleasant!',
    category: 'safety',
    tags: ['Transport', 'TODA', 'StudentDiscount', 'Advisory'],
    timestamp: '1 day ago',
    likes: 47,
    comments: [
      {
        id: 'comm-3',
        author: 'Carlo D.',
        authorRole: 'MMSU Student',
        avatarColor: 'bg-blue-500',
        content: 'Agyamanak Manong! Saludo kami sa mga tapat na Toda drivers ng Quiling Sur.',
        timestamp: '18 hours ago',
        likes: 8
      }
    ]
  },
  {
    id: 'post-3',
    author: 'Patricia Jane',
    authorRole: 'MMSU Student',
    avatarColor: 'bg-rose-500',
    title: 'LOST & FOUND: Green MMSU Lanyard with CAS ID & USB Flash Drive',
    content: 'Dropped near the tricycle shed at Quiling Sur Barangay Hall yesterday around 5:30 PM. The USB flash drive contains our team’s capstone software documentation. Willing to give reward to whoever found it. Please comment if you spotted it!',
    category: 'lost_found',
    tags: ['LostFound', 'MMSUID', 'USB', 'BrgyHall'],
    timestamp: '1 day ago',
    likes: 32,
    contactHint: 'Contact Patricia: 0927-402-9981',
    comments: [
      {
        id: 'comm-4',
        author: 'Barangay Desk Officer',
        authorRole: 'Quiling Sur Local',
        avatarColor: 'bg-slate-700',
        content: 'A student surrendered a green MMSU lanyard at the Tanod outpost this morning! Please proceed to the Barangay Hall to claim it.',
        timestamp: '12 hours ago',
        likes: 19
      }
    ]
  },
  {
    id: 'post-4',
    author: 'Engr. Dan',
    authorRole: 'Faculty/Staff',
    avatarColor: 'bg-indigo-600',
    title: 'Engineering Drafting Table & Drawing Tubes for Sale / Pasalo',
    content: 'Alumni moving out. Selling A1 rotring drafting table board with parallel ruler and T-square for only ₱1,200 (original ₱2,800). Perfect for 1st and 2nd year COE students residing around Quiling Sur.',
    category: 'buy_sell',
    tags: ['COE', 'DraftingBoard', 'Secondhand', 'Affordable'],
    timestamp: '2 days ago',
    likes: 15,
    comments: []
  },
  {
    id: 'post-5',
    author: 'Bgy. Secretary Quiling Sur',
    authorRole: 'Quiling Sur Local',
    avatarColor: 'bg-green-700',
    title: 'Clean-Up Drive & Drainage Clearing along Purok 2 and 3 this Saturday',
    content: 'We request all boarding house owners and student tenants to help clean frontages and dispose of stagnant water containers to prevent dengue during rainy days. Garbage trucks will pass by at 8:00 AM.',
    category: 'barangay',
    tags: ['Community', 'BarangayQuilingSur', 'CleanUp', 'AntiDengue'],
    timestamp: '3 days ago',
    likes: 26,
    comments: []
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    agency: 'Batac CDRRMO (Disaster & Rescue Operations)',
    phone: '(077) 792-3111',
    alternatePhone: '0917-822-2911',
    address: 'Batac City Hall Complex, Batac City',
    badge: '24/7 Hotline',
    available: 'Flood, storm rescue, emergency ambulance'
  },
  {
    id: 'em-2',
    agency: 'Mariano Marcos Memorial Hospital (MMMH&MC) Emergency Room',
    phone: '(077) 600-8000',
    alternatePhone: '0917-505-6642',
    address: 'Brgy. 6 San Julian, Batac City',
    badge: 'Tertiary Trauma ER',
    available: 'Emergency medicine, ambulance transfer'
  },
  {
    id: 'em-3',
    agency: 'Batac City Police Station (PNP)',
    phone: '(077) 792-3120',
    alternatePhone: '0998-598-5088',
    address: 'Washington St., Poblacion, Batac City',
    badge: 'Public Safety',
    available: 'Patrol, crime report, assistance'
  },
  {
    id: 'em-4',
    agency: 'Bureau of Fire Protection (BFP) Batac',
    phone: '(077) 792-3130',
    alternatePhone: '0915-602-4119',
    address: 'Batac City Hall Compound',
    badge: 'Fire & Hazmat',
    available: 'Fire suppression, rescue operations'
  },
  {
    id: 'em-5',
    agency: 'Barangay Quiling Sur Barangay Hall & Tanod Hotline',
    phone: '0928-540-1922',
    alternatePhone: '0917-310-8451',
    address: 'Purok 2, Quiling Sur, Batac City',
    badge: 'Local Barangay Support',
    available: 'Barangay clearances, peace & order, dispute resolution'
  },
  {
    id: 'em-6',
    agency: 'INEC Batac Substation (Electric Emergency)',
    phone: '(077) 792-3222',
    alternatePhone: '0917-570-4632',
    address: 'Batac Electric Substation',
    badge: 'Power & Grid',
    available: 'Power line repairs, emergency blackout reports'
  },
  {
    id: 'em-7',
    agency: 'MMSU Security and Safety Force (Main Gate)',
    phone: '(077) 600-0459',
    alternatePhone: '0920-911-6678',
    address: 'MMSU Gate 1 & 2 Administration, Quiling Sur',
    badge: 'Campus Security',
    available: 'University grounds safety, lost IDs, campus emergency'
  }
];

export const ILOCANO_PHRASES: IlocanoPhrase[] = [
  {
    id: 'ph-1',
    ilocano: 'Mano ti plete aginggana dita MMSU Gate 2?',
    tagalog: 'Magkano ang pamasahe hanggang sa MMSU Gate 2?',
    english: 'How much is the fare to MMSU Gate 2?',
    category: 'commute',
    pronunciation: 'MAH-no tee PLEH-teh ah-GEENG-gah-nah DEE-tah MMSU Gate 2?'
  },
  {
    id: 'ph-2',
    ilocano: 'Pakibabaak dita agsubli iti CAS canopy, apo.',
    tagalog: 'Pakibaba po ako dyan sa tapat ng CAS canopy.',
    english: 'Please drop me off in front of the CAS canopy.',
    category: 'commute',
    pronunciation: 'Pah-kee-bah-BAH-ahk DEE-tah ahg-SOOB-lee EE-tee CAS cah-noh-pee, AH-poh.'
  },
  {
    id: 'ph-3',
    ilocano: 'Estudianteak apo, adda diskwento?',
    tagalog: 'Estudyante po ako, may diskwento po ba?',
    english: 'I am a student, is there a discount?',
    category: 'commute',
    pronunciation: 'Ehs-tood-YAHN-teh-ahk AH-poh, AHD-dah dees-KWEHN-toh?'
  },
  {
    id: 'ph-4',
    ilocano: 'Agyamanak unay!',
    tagalog: 'Maraming salamat po!',
    english: 'Thank you very much!',
    category: 'greeting',
    pronunciation: 'Ahg-yah-MAH-nahk OO-nigh!'
  },
  {
    id: 'ph-5',
    ilocano: 'Naimbag a bigat / malem / rabii.',
    tagalog: 'Magandang umaga / hapon / gabi.',
    english: 'Good morning / afternoon / evening.',
    category: 'greeting',
    pronunciation: 'Nah-eem-BAHG ah BEE-gaht / MAH-lehm / RAH-bee-ee.'
  },
  {
    id: 'ph-6',
    ilocano: 'Mano ti maysa a Special Empanada nga adda itlog na?',
    tagalog: 'Magkano ang isang Special Empanada na may itlog?',
    english: 'How much is one Special Empanada with egg?',
    category: 'market',
    pronunciation: 'MAH-no tee MY-sah ah Special Empanada ngah AHD-dah eet-LOHG nah?'
  },
  {
    id: 'ph-7',
    ilocano: 'Ayanna ti pinakasideg a botika wenno ospital?',
    tagalog: 'Saan ang pinakamalapit na botika o ospital?',
    english: 'Where is the nearest pharmacy or hospital?',
    category: 'school',
    pronunciation: 'Ah-YAHN-nah tee pee-nah-kah-SEE-dehg ah boh-TEE-kah WEHN-noh ohs-pee-TAHL?'
  },
  {
    id: 'ph-8',
    ilocano: 'Adda pay bakante a kwarto wenno bedspace ditoy?',
    tagalog: 'May bakante pa po bang kwarto o bedspace dito?',
    english: 'Are there still vacant rooms or bedspaces here?',
    category: 'school',
    pronunciation: 'AHD-dah pie bah-KAHN-teh ah KWAHR-toh WEHN-noh bedspace dee-TOY?'
  }
];
