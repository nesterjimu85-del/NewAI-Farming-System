const store = require('./data/store');

exports.getAllActivities = (req, res) => {
  try {
    const data = store.getData();
    res.json(data.calendar || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar activities' });
  }
};

exports.addActivity = (req, res) => {
  try {
    const { crop, date, name, target } = req.body;
    if (!crop || !date || !name) {
      return res.status(400).json({ error: 'Crop, date, and activity name are required' });
    }

    const data = store.getData();
    if (!data.calendar) data.calendar = [];

    const newActivity = {
      id: Date.now(),
      crop: crop.trim(),
      date,
      name: name.trim(),
      target: (target || 'General Farm Care').trim(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    data.calendar.unshift(newActivity);
    store.saveData(data);

    res.status(201).json({
      success: true,
      message: 'Activity scheduled successfully',
      activity: newActivity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save calendar activity' });
  }
};

exports.toggleActivity = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = store.getData();
    if (!data.calendar) data.calendar = [];

    const item = data.calendar.find(a => a.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    item.status = item.status === 'Completed' ? 'Pending' : 'Completed';
    item.updatedAt = new Date().toISOString();

    store.saveData(data);
    res.json({ success: true, activity: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity status' });
  }
};

exports.deleteActivity = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = store.getData();
    if (!data.calendar) data.calendar = [];

    data.calendar = data.calendar.filter(a => a.id !== id);
    store.saveData(data);

    res.json({ success: true, message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
