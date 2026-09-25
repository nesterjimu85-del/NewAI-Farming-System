const store = require('./data/store');

exports.getAllAdvisors = (req, res) => {
  try {
    const data = store.getData();
    res.json(data.advisors || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advisors list' });
  }
};

exports.requestSupport = (req, res) => {
  try {
    const { advisorId, type, crop, notes, farmerName } = req.body;
    const data = store.getData();

    const advisor = (data.advisors || []).find(a => a.id === parseInt(advisorId, 10)) || {
      name: 'District AGRITEX Office',
      phone: '+263 77 123 4567'
    };

    const newRequest = {
      id: 'REQ-' + Math.floor(100000 + Math.random() * 900000),
      advisorId: advisor.id || 101,
      advisorName: advisor.name,
      advisorPhone: advisor.phone,
      farmerName: farmerName || (data.farmer ? data.farmer.name : 'Tendai Moyo'),
      type: type || 'Farm Visit',
      crop: crop || 'Maize',
      notes: notes || '',
      dateSubmitted: new Date().toISOString(),
      status: 'Assigned',
      expectedContact: 'Within 24 Hours'
    };

    if (!data.advisorRequests) data.advisorRequests = [];
    data.advisorRequests.unshift(newRequest);
    store.saveData(data);

    res.status(201).json({
      success: true,
      message: `Assistance request #${newRequest.id} dispatched to ${advisor.name}.`,
      request: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit advisor request' });
  }
};

exports.getRequests = (req, res) => {
  try {
    const data = store.getData();
    res.json(data.advisorRequests || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advisor requests' });
  }
};
