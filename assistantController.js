/**
 * AI Farming Assistant Controller
 * Provides multilingual agronomic guidance for Zimbabwean farmers in English, ChiShona, and isiNdebele.
 * Supports optional Gemini API when GEMINI_API_KEY is configured in .env.
 */

async function queryGemini(userText, language) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const systemPrompt = `You are an expert Zimbabwean agricultural assistant specialized in smallholder farming, Pfumvudza/Intwasa conservation agriculture, AGRITEX extension guidance, pest/disease control, and regional weather/soil in Zimbabwe. Respond helpfully and concisely in ${language === 'sn' ? 'ChiShona' : language === 'nr' ? 'isiNdebele' : 'English'}. Keep responses practical for farmers.`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nFarmer question: ${userText}` }] }
        ]
      })
    });

    if (!response.ok) return null;
    const json = await response.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (err) {
    console.error('Gemini query failed, falling back to local agronomy engine:', err.message);
    return null;
  }
}

function getLocalAgronomyResponse(message, lang) {
  const text = (message || '').toLowerCase();

  // Shona responses
  if (lang === 'sn' || text.includes('chishona') || text.includes('mbeu') || text.includes('chibage') || text.includes('mupfudze') || text.includes('kurima')) {
    if (text.includes('fetereza') || text.includes('mupfudze') || text.includes('compound') || text.includes('an')) {
      return "Panyaya yefetereza yechibage muZimbabwe (Region II & III): Isai Compound D (kapu imwe pachiguri chimwe chePfumvudza) panguva yekudyara. Kana chibage chava pamabvi (4-6 weeks mushure mekumera), isai Ammonium Nitrate (AN) semupfudze wepamushure.";
    }
    if (text.includes('armyworm') || text.includes('zvipfukuto') || text.includes('makonye') || text.includes('mhesvi')) {
      return "Kuti mudzore gonye re Fall Armyworm, pfuhirai mushonga we Emamectin Benzoate 5% SG kana Belt Expert (Flubendiamide) mumwoyo wechibage kachingotanga kumera. Unogona zvakare kuisa jecha rakachena kana dota remuti mumwoyo wechibage.";
    }
    if (text.includes('mbeu') || text.includes('kudyara') || text.includes('rinhi') || text.includes('mvura')) {
      return "Mudunhu reMashonaland East neCentral (Region II), mbeu dzinokurudzirwa nde dzerudzi rwe SC 637, SC 719, kana PAN 53. Dyarai panongonaya mvura inokwana 25-30mm pakati paMbudzi naZvita.";
    }
    if (text.includes('mutengo') || text.includes('musika') || text.includes('mbare')) {
      return "PaMbare Musika nhasi, chibage chichena chiri kutengeswa pakati pe $210 ne $220 patani. Nyemba dzeSugar beans dziri pa $900 patani, madomasi ari $7.50 bhokisi.";
    }
    return "Mhoro! Semurimi weZimbabwe, unogona kubvunza pamusoro pe: mhando dzembeu, nguva yekudyara, kudzora Fall Armyworm, kushandisa fetereza yePfumvudza, kana mitengo yezvirimwa pamisika.";
  }

  // Ndebele responses
  if (lang === 'nr' || text.includes('isilimo') || text.includes('umumbu') || text.includes('umvundiso')) {
    if (text.includes('umvundiso') || text.includes('fertilizer') || text.includes('compound')) {
      return "Ekulimeni umumbu ngaphansi kwe-Intwasa/Pfumvudza: Faka i-Compound D (isivalo sebhodlela emgodini ngamunye) lapho uhlanyela. Nxa umumbu usufika emadolweni, faka i-Ammonium Nitrate (AN) ukuze ukhule kuhle.";
    }
    if (text.includes('isibungu') || text.includes('armyworm') || text.includes('inwabu')) {
      return "Ukuxosha isibungu se-Fall Armyworm: Fafaza umuthi we-Belt Expert kumbe Emamectin Benzoate embotsheni yomumbu. Ungafaka njalo umlotha wesihlahla kumbe itshebetshebe embotsheni.";
    }
    if (text.includes('intengo') || text.includes('imakethe') || text.includes('renkini')) {
      return "EMakethe yeRenkini (Bulawayo) leMbare Musika: Umumbu uthengwa nge $220 ngethoni, amantongomane asezulwini nge $900 ngethoni. Amakhomane lamathanga athengwa ngokufaneleyo.";
    }
    return "Salibonani! Ngingumsizi wenu we-AI wezolimo. Buza mayelana lezikhathi zokuhlanyela eMatabeleland leMashonaland, ukulawula izibungu, lemithi yezilimo.";
  }

  // English responses
  if (text.includes('fertilizer') || text.includes('compound d') || text.includes('an') || text.includes('top dressing') || text.includes('pfumvudza')) {
    return "For maize in Zimbabwe (Natural Regions II & III): Apply Compound D basal fertilizer at planting (300-350 kg/ha or 1 bottle-cap per Pfumvudza planting basin). Top dress with Ammonium Nitrate (AN) at 200-250 kg/ha when maize is knee-high (4-6 weeks after emergence), ideally in moist soil.";
  }

  if (text.includes('armyworm') || text.includes('pest') || text.includes('worm') || text.includes('spodoptera')) {
    return "Fall Armyworm (Spodoptera frugiperda) Management: 1) Spray Emamectin Benzoate 5% SG, Ampligo, or Belt Expert directly into the whorl at early vegetative stage. 2) Eco-friendly method: Apply fine dry sand or clean wood ash into the whorl to suffocate larvae. 3) Scout crops twice weekly for egg batches and windowpaning.";
  }

  if (text.includes('plant') || text.includes('variety') || text.includes('hybrid') || text.includes('seed')) {
    return "For Natural Region II (e.g. Marondera, Mazowe), medium-to-late maturity hybrids like Seed Co SC 637, SC 719, or PAN 53 offer high yield potential (7-10 t/ha). Plant after receiving at least 25-30mm of effective rainfall in late November or early December.";
  }

  if (text.includes('tomato') || text.includes('blight') || text.includes('rot')) {
    return "For tomatoes: Early and Late Blight can be controlled by preventive spraying of Copper Oxychloride 85% WP or Mancozeb 80% WP every 7-10 days during cloudy/humid weather. Ensure staked trellising, prune bottom suckers up to 30cm to prevent soil-splash infections.";
  }

  if (text.includes('price') || text.includes('market') || text.includes('mbare') || text.includes('gmb')) {
    return "Current Market Intelligence: White Maize grain is trading at $220/ton at Mbare Musika; Statutory GMB price floor is $335/ton for grain deliveries. Tomatoes are $7.50/box at Mbare, and Sugar Beans stand strong at $900/ton.";
  }

  if (text.includes('weather') || text.includes('rain') || text.includes('spray')) {
    return "When planning pesticide spraying in Marondera: Spray early morning (06:00 - 09:00) or late afternoon when wind is below 15 km/h and rain probability is under 40% to prevent wash-off and chemical drift.";
  }

  return "I am your AI Agricultural Assistant. You can ask me about: 1) Recommended planting dates and Seed Co/Pannar hybrids in Zimbabwe, 2) Compound D & AN fertilizer application rates, 3) Fall Armyworm and Blight control, 4) Spraying weather conditions, or 5) Commodity market prices.";
}

exports.chat = async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const selectedLang = language || 'en';

    // Try Gemini if API key is provided
    let aiResponse = await queryGemini(message, selectedLang);

    // Fallback to local expert agronomic engine
    if (!aiResponse) {
      aiResponse = getLocalAgronomyResponse(message, selectedLang);
    }

    res.json({
      success: true,
      language: selectedLang,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat assistant error:', error);
    res.status(500).json({ error: 'AI Assistant failed to generate response' });
  }
};
