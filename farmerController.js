const store = require('./data/store');

exports.getCurrentFarmer = (req, res) => {
  try {
    const data = store.getData();
    res.json(data.farmer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmer profile' });
  }
};

exports.getAllFarmers = (req, res) => {
  try {
    const data = store.getData();
    res.json([data.farmer]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmers list' });
  }
};

exports.updateCurrentFarmer = (req, res) => {
  try {
    const data = store.getData();
    const updates = req.body;
    data.farmer = {
      ...data.farmer,
      ...updates
    };
    store.saveData(data);
    res.json({ message: 'Farmer profile updated successfully', farmer: data.farmer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update farmer profile' });
  }
};
