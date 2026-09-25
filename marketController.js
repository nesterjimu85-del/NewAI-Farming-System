const store = require('./data/store');

exports.getMarketPrices = (req, res) => {
  try {
    const data = store.getData();
    let prices = data.market || [];
    const { market, search } = req.query;

    if (market && market !== 'All') {
      prices = prices.filter(item => item.market.toLowerCase().includes(market.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      prices = prices.filter(item => 
        item.commodity.toLowerCase().includes(q) ||
        item.market.toLowerCase().includes(q)
      );
    }

    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
};

exports.getMarketSummary = (req, res) => {
  try {
    const data = store.getData();
    const prices = data.market || [];
    const maize = prices.find(p => p.commodity.toLowerCase().includes('maize'));

    res.json({
      maizePrice: maize ? `$${maize.price} / ${maize.unit}` : '$220 / Ton',
      maizeTrend: maize ? maize.trend : '+2.5%',
      activeMarkets: ['Mbare Musika (Harare)', 'Sakubva (Mutare)', 'Renkini (Bulawayo)', 'GMB Depot'],
      totalTracked: prices.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market summary' });
  }
};
