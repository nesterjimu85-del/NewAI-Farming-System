const store = require('./data/store');

exports.getCurrentWeather = (req, res) => {
  try {
    const data = store.getData();
    const weather = data.weather;
    
    // Add real-time advisory evaluation
    let sprayStatus = 'Optimal';
    let sprayRec = 'Favorable conditions for morning chemical spraying (low wind, moderate temperature).';

    if (weather.rainProbability > 50) {
      sprayStatus = 'Avoid Spraying';
      sprayRec = 'High chance of rainfall. Risk of chemical wash-off. Postpone application.';
    } else if (weather.windSpeed > 15) {
      sprayStatus = 'Caution (Drift Risk)';
      sprayRec = 'High wind speeds detected. Spray drift hazard to non-target crops and nearby water bodies.';
    } else if (weather.temperature > 30) {
      sprayStatus = 'Caution (High Heat)';
      sprayRec = 'High temperature. High evaporation rate; apply chemicals early morning or late afternoon.';
    }

    res.json({
      location: weather.location,
      district: weather.district,
      coordinates: weather.coordinates,
      temperature: weather.temperature,
      condition: weather.condition,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      rainProbability: weather.rainProbability,
      sprayAdvisory: {
        status: sprayStatus,
        recommendation: sprayRec
      },
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getForecast = (req, res) => {
  try {
    const data = store.getData();
    res.json(data.weather.forecast || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
};

exports.updateWeather = (req, res) => {
  try {
    const data = store.getData();
    data.weather = {
      ...data.weather,
      ...req.body
    };
    store.saveData(data);
    res.json({ message: 'Weather data updated successfully', weather: data.weather });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update weather' });
  }
};
