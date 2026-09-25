const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'farming_data.json');

const defaultData = {
  farmer: {
    id: 1,
    name: "Tendai Moyo",
    location: "Marondera",
    province: "Mashonaland East",
    country: "Zimbabwe",
    agroEcologicalRegion: "Natural Region IIb",
    crops: ["Maize", "Soybeans", "Tomatoes"],
    farmSizeHa: 4.5,
    assignedAdvisor: {
      id: 101,
      name: "Clement Mutasa",
      title: "AGRITEX Extension Officer",
      district: "Marondera District",
      phone: "+263 77 123 4567"
    }
  },
  weather: {
    location: "Marondera",
    district: "Marondera (Mashonaland East)",
    coordinates: { lat: -18.1853, lon: 31.5519 },
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    rainProbability: 30,
    sprayAdvisory: {
      status: "Optimal",
      recommendation: "Favorable conditions for morning chemical spraying (low wind, moderate temperature)."
    },
    forecast: [
      {
        day: "Today",
        condition: "Sunny",
        icon: "fa-sun",
        iconColor: "text-warning",
        temp: "25°C",
        rain: "10%",
        sprayAdvisory: "Optimal",
        badgeClass: "bg-success"
      },
      {
        day: "Tomorrow",
        condition: "Rain Showers",
        icon: "fa-cloud-rain",
        iconColor: "text-primary",
        temp: "21°C",
        rain: "75%",
        sprayAdvisory: "Avoid Spraying",
        badgeClass: "bg-danger"
      },
      {
        day: "Wednesday",
        condition: "Partly Cloudy",
        icon: "fa-cloud-sun",
        iconColor: "text-warning",
        temp: "23°C",
        rain: "20%",
        sprayAdvisory: "Optimal (Afternoon)",
        badgeClass: "bg-success"
      },
      {
        day: "Thursday",
        condition: "Clear",
        icon: "fa-sun",
        iconColor: "text-warning",
        temp: "26°C",
        rain: "0%",
        sprayAdvisory: "Optimal",
        badgeClass: "bg-success"
      },
      {
        day: "Friday",
        condition: "Windy",
        icon: "fa-wind",
        iconColor: "text-secondary",
        temp: "22°C",
        rain: "15%",
        sprayAdvisory: "Caution (Drift Risk)",
        badgeClass: "bg-warning text-dark"
      }
    ]
  },
  diagnoses: [
    {
      id: "diag-1",
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
      crop: "Maize",
      diseaseName: "Northern Corn Leaf Blight (Exserohilum turcicum)",
      confidence: 92,
      description: "Cigar-shaped elliptical necrotic lesions on lower leaves, starting grayish-green then turning tan.",
      treatments: [
        "Spray Azoxystrobin + Difenoconazole (Amistar Top) at early lesion appearance.",
        "Practice crop rotation with legumes (Soybeans/Groundnuts) to break disease cycle.",
        "Plant resistant maize hybrids certified for Highveld/Middleveld."
      ],
      safety: "Wear PPE. Respect 21-day pre-harvest interval."
    },
    {
      id: "diag-2",
      timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
      crop: "Tomato",
      diseaseName: "Tomato Early Blight (Alternaria solani)",
      confidence: 88,
      description: "Concentric dark 'bullseye' target rings on older bottom foliage following high humidity.",
      treatments: [
        "Spray Copper Oxychloride or Mancozeb every 7-10 days.",
        "Prune lower infected canopy branches to improve air ventilation.",
        "Mulch beds with dry grass to prevent fungal spore splash."
      ],
      safety: "Spray in early morning before bees and pollinators are active."
    }
  ],
  calendar: [
    {
      id: 1,
      date: "2026-09-22",
      crop: "Tomatoes",
      name: "Copper Oxychloride Spray",
      target: "Early Blight Prevention",
      status: "Pending"
    },
    {
      id: 2,
      date: "2026-09-25",
      crop: "Maize",
      name: "AN (Ammonium Nitrate) Top Dressing",
      target: "Vegetative Growth Boost",
      status: "Pending"
    },
    {
      id: 3,
      date: "2026-09-18",
      crop: "Tobacco",
      name: "Confidor Drenching",
      target: "Aphid Control",
      status: "Completed"
    }
  ],
  market: [
    {
      id: 1,
      commodity: "Maize (White Grain)",
      market: "Mbare Musika (Harare)",
      price: 220.00,
      unit: "Ton",
      demand: "High Demand",
      demandBadge: "bg-success",
      trend: "+2.5%",
      date: "21 Sep 2026",
      source: "eMKAMBA"
    },
    {
      id: 2,
      commodity: "Tomatoes (Box)",
      market: "Mbare Musika (Harare)",
      price: 7.50,
      unit: "Box",
      demand: "Moderate",
      demandBadge: "bg-warning text-dark",
      trend: "-5.0%",
      date: "21 Sep 2026",
      source: "Field Agent"
    },
    {
      id: 3,
      commodity: "Sugar Beans",
      market: "Renkini (Bulawayo)",
      price: 900.00,
      unit: "Ton",
      demand: "Very High",
      demandBadge: "bg-success",
      trend: "+4.1%",
      date: "20 Sep 2026",
      source: "ZINU"
    },
    {
      id: 4,
      commodity: "Soybeans",
      market: "GMB Depot",
      price: 480.00,
      unit: "Ton",
      demand: "Stable Statutory",
      demandBadge: "bg-info text-dark",
      trend: "0.0%",
      date: "18 Sep 2026",
      source: "GMB Gazetted"
    },
    {
      id: 5,
      commodity: "Potatoes (Pocket 15kg)",
      market: "Sakubva (Mutare)",
      price: 8.00,
      unit: "Pocket",
      demand: "High Demand",
      demandBadge: "bg-success",
      trend: "+1.8%",
      date: "21 Sep 2026",
      source: "Sakubva Desk"
    },
    {
      id: 6,
      commodity: "Cabbage (Head)",
      market: "Mbare Musika (Harare)",
      price: 0.65,
      unit: "Head",
      demand: "High Demand",
      demandBadge: "bg-success",
      trend: "+3.2%",
      date: "21 Sep 2026",
      source: "eMKAMBA"
    }
  ],
  advisors: [
    {
      id: 101,
      name: "Clement Mutasa",
      role: "AGRITEX Officer - Marondera District",
      expertise: "Maize & Horticulture",
      phone: "+263 77 123 4567",
      email: "c.mutasa@agritex.gov.zw",
      location: "Marondera Rural",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 102,
      name: "Grace Nkomo",
      role: "Livestock & Pasture Specialist",
      expertise: "Cattle & Poultry",
      phone: "+263 77 987 6543",
      email: "g.nkomo@agritex.gov.zw",
      location: "Mashonaland East",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 103,
      name: "Dr. T. Sithole",
      role: "Plant Pathologist (DR&SS)",
      expertise: "Crop Diseases & Diagnostics",
      phone: "+263 71 200 0111",
      email: "t.sithole@drss.gov.zw",
      location: "National Research Labs",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ],
  advisorRequests: []
};

function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading data from file, using fallback defaults:', err.message);
    return defaultData;
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving data to file:', err.message);
    return false;
  }
}

module.exports = {
  getData: loadData,
  saveData
};
