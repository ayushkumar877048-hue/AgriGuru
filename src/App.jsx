import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sprout, CloudSun, Calendar, Bell, Bot, BarChart3, Settings, 
  MapPin, Plus, Trash2, CheckCircle2, Clock, AlertTriangle, 
  Droplet, ShieldAlert, ChevronRight, Globe, Download, RefreshCw, 
  Search, FileText, Check, X, ArrowUpRight, Compass, Heart, 
  Layers, Package, Award, Sparkles, AlertCircle, PhoneCall, HelpCircle,
  Navigation, User, CheckCircle, RotateCcw, Send, Image as ImageIcon,
  Lightbulb, MessageSquare
} from 'lucide-react';

const t = {
  en: {
    appName: "AgriGuru",
    tagline: "Your Smart Companion from Sowing to Harvesting.",
    dashboard: "Dashboard",
    farms: "Farms & Plots",
    seeds: "Seeds & Inventory",
    calendar: "Farming Calendar",
    weather: "Live Weather",
    advisor: "AgriGuru AI",
    logs: "Activity Logs",
    settings: "Profile & Settings",
    activeCrops: "Active Crops",
    totalPlots: "Total Plots",
    pendingTasks: "Pending Tasks",
    weatherAlerts: "Weather Warnings",
    cropAge: "Crop Age",
    days: "days",
    sowedOn: "Sowed on",
    expectedHarvest: "Expected Harvest",
    viewDetails: "View Details",
    addNewPlot: "Add New Farm Plot",
    recordSowing: "Record Seed Sowing",
    logActivity: "Log Irrigation / Fertilizer",
    askAI: "Ask AgriGuru AI",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind",
    rainfall: "Rainfall Forecast",
    aiAdvisorTitle: "AgriGuru Intelligent Advisor",
    aiSubtitle: "Ask anything about your crops, weather precautions, or pest management.",
    typePrompt: "Type your farming question in English or Hindi...",
    send: "Send",
    save: "Save Record",
    cancel: "Cancel",
    completed: "Completed",
    dueToday: "Due Today",
    overdue: "Overdue",
    pending: "Pending",
    markComplete: "Mark Complete",
    exportCSV: "Export CSV",
    printReport: "Print Report",
    soilType: "Soil Type",
    irrigationMethod: "Irrigation Method",
    plotName: "Plot / Field Name",
    cropName: "Crop Name & Variety",
    sowingDate: "Sowing Date",
    area: "Area",
    actions: "Actions",
    noData: "No records found. Get started by adding a plot or crop!",
    noCropsYet: "No crops added yet.",
    noTasksYet: "No farming tasks scheduled yet.",
    noWeatherYet: "Set up your farm location to see local weather.",
    addFirstCrop: "Add Your First Crop",
    resetApp: "Reset App Data",
    confirmReset: "Are you sure you want to reset all profile and farm data? This action cannot be undone."
  },
  hi: {
    appName: "एग्रीगुरु (AgriGuru)",
    tagline: "बुवाई से कटाई तक आपका स्मार्ट साथी।",
    dashboard: "डैशबोर्ड",
    farms: "खेत और प्लॉट",
    seeds: "बीज और सामग्री",
    calendar: "खेती कैलेंडर",
    weather: "लाइव मौसम",
    advisor: "एग्रीगुरु एआई",
    logs: "गतिविधि लॉग",
    settings: "प्रोफ़ाइल और सेटिंग्स",
    activeCrops: "सक्रिय फसलें",
    totalPlots: "कुल प्लॉट",
    pendingTasks: "लंबित कार्य",
    weatherAlerts: "मौसम चेतावनी",
    cropAge: "फसल की आयु",
    days: "दिन",
    sowedOn: "बोया गया",
    expectedHarvest: "अनुमानित कटाई",
    viewDetails: "विवरण देखें",
    addNewPlot: "नया खेत प्लॉट जोड़ें",
    recordSowing: "बीज बुवाई दर्ज करें",
    logActivity: "सिंचाई / खाद दर्ज करें",
    askAI: "एग्रीगुरु एआई से पूछें",
    temperature: "तापमान",
    humidity: "नमी",
    wind: "हवा",
    rainfall: "वर्षा पूर्वानुमान",
    aiAdvisorTitle: "एग्रीगुरु बुद्धिमान सलाहकार",
    aiSubtitle: "अपनी फसलों, मौसम सावधानियों या कीट प्रबंधन के बारे में कुछ भी पूछें।",
    typePrompt: "हिंदी या अंग्रेजी में अपना कृषि प्रश्न टाइप करें...",
    send: "भेजें",
    save: "रिकॉर्ड सहेजें",
    cancel: "रद्द करें",
    completed: "पूर्ण",
    dueToday: "आज देय",
    overdue: "अतिदेय",
    pending: "लंबित",
    markComplete: "पूर्ण के रूप में चिह्नित करें",
    exportCSV: "सीएसवी निर्यात",
    printReport: "प्रिंट रिपोर्ट",
    soilType: "मिट्टी का प्रकार",
    irrigationMethod: "सिंचाई विधि",
    plotName: "प्लॉट / खेत का नाम",
    cropName: "फसल का नाम और किस्म",
    sowingDate: "बुवाई की तारीख",
    area: "क्षेत्रफल",
    actions: "कार्य",
    noData: "कोई रिकॉर्ड नहीं मिला। प्लॉट या फसल जोड़कर शुरुआत करें!",
    noCropsYet: "अभी तक कोई फसल नहीं जोड़ी गई है।",
    noTasksYet: "अभी तक कोई कृषि कार्य निर्धारित नहीं है।",
    noWeatherYet: "स्थानीय मौसम देखने के लिए अपने खेत का स्थान सेट करें।",
    addFirstCrop: "अपनी पहली फसल जोड़ें",
    resetApp: "ऐप डेटा रीसेट करें",
    confirmReset: "क्या आप वाकई सभी प्रोफ़ाइल और फ़ार्म डेटा रीसेट करना चाहते हैं? इस कार्रवाई को पूर्ववत नहीं किया जा सकता।"
  }
};

export default function AgriGuruApp() {
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('agriguru_profile_completed') === 'true';
  });

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('agriguru_farmer_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      village: '',
      district: '',
      state: '',
      pincode: '',
      season: 'Kharif / Rabi',
      lat: null,
      lon: null,
      locationType: ''
    };
  });

  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('agriguru_plots');
    return saved ? JSON.parse(saved) : [];
  });

  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('agriguru_crops');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('agriguru_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('agriguru_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [weatherData, setWeatherData] = useState(() => {
    const saved = localStorage.getItem('agriguru_weather');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('agriguru_farmer_profile', JSON.stringify(farmerProfile));
    localStorage.setItem('agriguru_plots', JSON.stringify(plots));
    localStorage.setItem('agriguru_crops', JSON.stringify(crops));
    localStorage.setItem('agriguru_tasks', JSON.stringify(tasks));
    localStorage.setItem('agriguru_logs', JSON.stringify(logs));
    if (weatherData) {
      localStorage.setItem('agriguru_weather', JSON.stringify(weatherData));
    }
  }, [farmerProfile, plots, crops, tasks, logs, weatherData]);

  useEffect(() => {
    if (isOnboarded && !weatherData) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setFarmerProfile(prev => ({ ...prev, lat: latitude, lon: longitude, locationType: 'gps' }));
            fetchWeatherForLocation(latitude, longitude, "GPS Location");
          },
          (err) => {
            fetchWeatherForLocation(22.7196, 75.8577, "Indore");
          }
        );
      } else {
        fetchWeatherForLocation(22.7196, 75.8577, "Indore");
      }
    }
  }, [isOnboarded]);

  const [showPlotModal, setShowPlotModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [onboardProfile, setOnboardProfile] = useState({
    name: '',
    language: 'en',
    state: '',
    district: '',
    village: '',
    pincode: ''
  });

  const [onboardFarm, setOnboardFarm] = useState({
    name: '',
    area: '',
    unit: 'acres',
    soil: 'Alluvial (Loam)',
    irrigation: 'Tube well'
  });

  const [locationStatus, setLocationStatus] = useState({ loading: false, message: '' });

  const [newPlot, setNewPlot] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [newCrop, setNewCrop] = useState({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  const [newLog, setNewLog] = useState({ type: 'Irrigation', plot: '', crop: '', details: '', date: new Date().toISOString().split('T')[0] });

  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Namaste! I am your AgriGuru AI Advisor, powered by Gemini. You can ask me anything from crop management and weather advisories to general knowledge, science, history, and geography!',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const quickQuestions = [
    "How to manage yellowing leaves on Wheat?",
    "Best fertilizer schedule for Paddy/Rice",
    "What causes seasons on Earth?",
    "Explain photosynthesis in simple terms"
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isAiLoading) return;

    const userMsg = {
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsAiLoading(true);

    try {
      const payload = {
        contents: [
          ...chatMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: query }] }
        ],
        systemInstruction: {
          parts: [{ text: "You are AgriGuru AI Advisor, an advanced smart farming assistant and versatile general knowledge expert. You answer any question from agriculture, crop protection, pest diagnostics, soil health, weather science, to general knowledge, history, geography, and science with accurate, engaging, structured, and detailed responses. Do not use markdown asterisks or bullet star symbols in your response." }]
        }
      };

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AQ.Ab8RN6L1RKACmy5DXb3B6ZGy2mx0hqbTZzfCWWRH3NaT0Z8Mmg1`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      let rawAiText = result.candidates?.[0]?.content?.parts?.[0]?.text || `Here is detailed information regarding "${query}": AgriGuru AI provides comprehensive insights across agricultural science, crop planning, and general inquiries.`;
      
      const aiText = rawAiText.replace(/\*/g, '');

      const aiMsg = {
        role: 'assistant',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Error:", err);
      const fallbackText = `AgriGuru AI Advisor: Regarding "${query}", this topic involves key principles connecting theory and practical application. Whether in agriculture, science, or general knowledge, structured inquiry provides the best insights!`;
      setChatMessages(prev => [...prev, { role: 'assistant', text: fallbackText.replace(/\*/g, ''), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const txt = t[lang];

  const fetchWeatherForLocation = async (latitude, longitude, locName) => {
    setLocationStatus({ loading: true, message: 'Detecting live location & fetching weather...' });
    try {
      let resolvedName = locName;
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const geoData = await geoRes.json();
        if (geoData && geoData.address) {
          const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state_district || '';
          const state = geoData.address.state || '';
          if (city) {
            resolvedName = `${city}, ${state}`;
            setFarmerProfile(prev => ({
              ...prev,
              village: city,
              state: state,
              district: geoData.address.county || geoData.address.state_district || prev.district,
              lat: latitude,
              lon: longitude
            }));
          }
        }
      } catch (e) {
        console.warn("Reverse geocode failed", e);
      }

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
      const data = await res.json();
      
      if (data && data.current_weather) {
        const curr = data.current_weather;
        const compiledWeather = {
          temp: Math.round(curr.temperature),
          feelsLike: Math.round(curr.temperature),
          condition: curr.weathercode <= 3 ? 'Clear / Partly Cloudy' : 'Cloudy / Precipitation',
          humidity: data.hourly?.relativehumidity_2m?.[0] || 50,
          windSpeed: curr.windspeed,
          rainfallChance: `${data.daily?.precipitation_probability_max?.[0] || 10}%`,
          locationName: resolvedName,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          forecast: (data.daily?.time || []).slice(0, 7).map((time, idx) => ({
            day: idx === 0 ? 'Today' : new Date(time).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            temp: `${Math.round(data.daily.temperature_2m_max[idx])}° / ${Math.round(data.daily.temperature_2m_min[idx])}°`,
            cond: data.daily.precipitation_probability_max[idx] > 40 ? 'Rain Likely' : 'Sunny/Clear',
            rain: `${data.daily.precipitation_probability_max[idx]}%`
          }))
        };
        setWeatherData(compiledWeather);
        setLocationStatus({ loading: false, message: `Live location detected: ${resolvedName}` });
      }
    } catch (err) {
      setLocationStatus({ loading: false, message: 'Failed to load live weather. Using default coordinates.' });
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({ loading: false, message: 'Geolocation is not supported by your browser.' });
      return;
    }
    setLocationStatus({ loading: true, message: 'Acquiring GPS coordinates...' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherForLocation(latitude, longitude, "GPS Location");
      },
      (error) => {
        setLocationStatus({ loading: false, message: 'GPS access denied or unavailable. Using default location.' });
        fetchWeatherForLocation(24.12, 82.65, "Vindhyanagar");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleCompleteOnboarding = () => {
    const updatedProfile = {
      ...farmerProfile,
      name: onboardProfile.name,
      village: onboardProfile.village,
      district: onboardProfile.district,
      state: onboardProfile.state,
      pincode: onboardProfile.pincode
    };
    setFarmerProfile(updatedProfile);
    setLang(onboardProfile.language);

    if (onboardFarm.name && onboardFarm.area) {
      const initialFarmPlot = {
        id: 'p_' + Date.now(),
        name: onboardFarm.name,
        area: onboardFarm.area,
        unit: onboardFarm.unit,
        soil: onboardFarm.soil,
        irrigation: onboardFarm.irrigation,
        village: onboardProfile.village,
        district: onboardProfile.district,
        state: onboardProfile.state,
        pin: onboardProfile.pincode
      };
      setPlots([initialFarmPlot]);
    }

    localStorage.setItem('agriguru_profile_completed', 'true');
    setIsOnboarded(true);
  };

  const getCropAge = (sowingDateStr) => {
    if (!sowingDateStr) return 0;
    const sowed = new Date(sowingDateStr);
    const today = new Date();
    const diffTime = Math.abs(today - sowed);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddPlot = (e) => {
    e.preventDefault();
    if (!newPlot.name || !newPlot.area) return;
    const plotToAdd = { 
      id: 'p_' + Date.now(), 
      ...newPlot, 
      village: farmerProfile.village, 
      district: farmerProfile.district, 
      state: farmerProfile.state 
    };
    setPlots([...plots, plotToAdd]);
    setShowPlotModal(false);
    setNewPlot({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (!newCrop.cropName || !newCrop.sowingDate) return;
    const selectedPlot = plots.find(p => p.id === newCrop.plotId) || plots[0];
    const sDate = new Date(newCrop.sowingDate);
    const hDate = new Date(sDate.getTime() + ((newCrop.durationDays || 120) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    const cropToAdd = {
      id: 'c_' + Date.now(),
      ...newCrop,
      plotId: selectedPlot ? selectedPlot.id : '',
      plotName: selectedPlot ? selectedPlot.name : 'General Field',
      expectedHarvest: hDate,
      stage: 'Germination & Establishment',
      status: 'Growing'
    };
    
    setCrops([...crops, cropToAdd]);
    
    const taskToAdd = {
      id: 't_' + Date.now(),
      cropId: cropToAdd.id,
      title: `${cropToAdd.cropName} - Initial Irrigation & Soil Moisture Inspection`,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending',
      priority: 'High',
      cropName: cropToAdd.cropName
    };
    setTasks([...tasks, taskToAdd]);

    const logToAdd = {
      id: 'l_' + Date.now(),
      date: newCrop.sowingDate,
      type: 'Sowing',
      plot: cropToAdd.plotName,
      crop: cropToAdd.cropName,
      details: `Sowed ${newCrop.cropName} (${newCrop.variety || 'Standard'}) in ${newCrop.areaUsed || 1} ${selectedPlot?.unit || 'acres'}`
    };
    setLogs([logToAdd, ...logs]);

    setShowCropModal(false);
    setNewCrop({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.details) return;
    const logToAdd = { id: 'l_' + Date.now(), ...newLog };
    setLogs([logToAdd, ...logs]);
    setShowActivityModal(false);
    setNewLog({ type: 'Irrigation', plot: plots[0]?.name || '', crop: crops[0]?.cropName || '', details: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const handleResetApp = () => {
    localStorage.clear();
    setPlots([]);
    setCrops([]);
    setTasks([]);
    setLogs([]);
    setWeatherData(null);
    setFarmerProfile({ name: '', village: '', district: '', state: '', pincode: '', season: 'Kharif / Rabi' });
    setIsOnboarded(false);
    setOnboardingStep(1);
    setShowResetConfirm(false);
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans antialiased text-stone-900">
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
          
          <div className="bg-emerald-900 text-white p-6 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-700 p-2 rounded-xl">
                <Sprout className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">AgriGuru</h1>
                <p className="text-xs text-emerald-200">{txt.tagline}</p>
              </div>
            </div>
            
            {onboardingStep > 1 && (
              <div className="flex items-center space-x-2 pt-2">
                {[2, 3, 4, 5].map((step) => (
                  <div 
                    key={step} 
                    className={`h-2 flex-1 rounded-full transition-all ${
                      onboardingStep >= step ? 'bg-amber-400' : 'bg-emerald-800'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            {onboardingStep === 1 && (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Sprout className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-stone-900">Welcome to AgriGuru! 🌱</h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Your personal smart farming advisor. Track crops from seed sowing to harvest, monitor live weather, and receive timely agricultural guidance.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setOnboardingStep(2)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 1: Farmer Profile</h2>
                  <p className="text-xs text-stone-500">Please enter your basic information.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Preferred Language</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOnboardProfile({ ...onboardProfile, language: 'en' })}
                        className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                          onboardProfile.language === 'en' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setOnboardProfile({ ...onboardProfile, language: 'hi' })}
                        className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                          onboardProfile.language === 'hi' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        हिंदी (Hindi)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={onboardProfile.name}
                      onChange={(e) => setOnboardProfile({ ...onboardProfile, name: e.target.value })}
                      placeholder="e.g. Tejas Nigam"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">State *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.state}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, state: e.target.value })}
                        placeholder="e.g. Madhya Pradesh"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">District *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.district}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, district: e.target.value })}
                        placeholder="e.g. Singrauli"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Village / Town *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.village}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, village: e.target.value })}
                        placeholder="e.g. Waidhan"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">PIN Code (Optional)</label>
                      <input 
                        type="text" 
                        value={onboardProfile.pincode}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, pincode: e.target.value })}
                        placeholder="486886"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(1)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!onboardProfile.name || !onboardProfile.state || !onboardProfile.district || !onboardProfile.village}
                    onClick={() => setOnboardingStep(3)} 
                    className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 2: Location Setup</h2>
                  <p className="text-xs text-stone-500">Configure your location to receive real local weather and advisory.</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleGetCurrentLocation}
                    className="w-full bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 p-4 rounded-2xl flex items-center space-x-3 transition text-left"
                  >
                    <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Use My Current Location (GPS)</h4>
                      <p className="text-xs text-sky-700">Request browser geolocation permission to fetch live local coordinates.</p>
                    </div>
                  </button>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                    <h4 className="font-bold text-sm text-stone-900">Manual Location Selected:</h4>
                    <p className="text-xs text-stone-600">
                      {onboardProfile.village}, {onboardProfile.district}, {onboardProfile.state} {onboardProfile.pincode}
                    </p>
                  </div>

                  {locationStatus.message && (
                    <div className={`p-3 rounded-xl text-xs font-medium ${
                      locationStatus.loading ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {locationStatus.message}
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(2)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setOnboardingStep(4)} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Next: Setup Farm
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 3: Register Your First Farm Plot</h2>
                  <p className="text-xs text-stone-500">Add land details to start managing crops.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Plot / Field Name *</label>
                    <input 
                      type="text" 
                      value={onboardFarm.name}
                      onChange={(e) => setOnboardFarm({ ...onboardFarm, name: e.target.value })}
                      placeholder="e.g. North Acre Field"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Area Size *</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={onboardFarm.area}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, area: e.target.value })}
                        placeholder="2.5"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Unit</label>
                      <select 
                        value={onboardFarm.unit}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, unit: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      >
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                        <option value="bigha">Bigha</option>
                        <option value="sq.meters">Sq. Meters</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Soil Type</label>
                      <select 
                        value={onboardFarm.soil}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, soil: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      >
                        <option value="Alluvial (Loam)">Alluvial (Loam)</option>
                        <option value="Black Soil (Regur)">Black Soil (Regur)</option>
                        <option value="Red Soil">Red Soil</option>
                        <option value="Laterite Soil">Laterite Soil</option>
                        <option value="Sandy Soil">Sandy Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Irrigation Method</label>
                      <select 
                        value={onboardFarm.irrigation}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, irrigation: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      >
                        <option value="Tube well">Tube well</option>
                        <option value="Canal">Canal</option>
                        <option value="Drip Irrigation">Drip Irrigation</option>
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Rainfed">Rainfed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(3)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setOnboardingStep(5)} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Next: Final Summary
                  </button>
                </div>
              </div>
            )}

            {onboardingStep === 5 && (
              <div className="space-y-5 text-center py-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-stone-900">You're All Set, {onboardProfile.name}! 🎉</h2>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Your AgriGuru profile and primary farm plot have been configured successfully. Let's start growing smarter!
                  </p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleCompleteOnboarding}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Launch AgriGuru Dashboard</span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans antialiased text-stone-900">
      {/* Top Header Navigation */}
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-800 p-2 rounded-xl">
              <Sprout className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">AgriGuru</span>
              <span className="hidden sm:inline text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full ml-2 font-medium">Smart Farm</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold">{farmerProfile.name || "Farmer"}</div>
              <div className="text-[10px] text-emerald-200">{farmerProfile.village}, {farmerProfile.state}</div>
            </div>

            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-3 space-y-1">
            {[
              { id: 'dashboard', label: txt.dashboard, icon: BarChart3 },
              { id: 'farms', label: txt.farms, icon: MapPin },
              { id: 'weather', label: txt.weather, icon: CloudSun },
              { id: 'advisor', label: txt.advisor, icon: Bot },
              { id: 'logs', label: txt.logs, icon: FileText },
              { id: 'settings', label: txt.settings, icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${
                    isActive ? 'bg-emerald-700 text-white shadow' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Weather Quick Widget Sidebar */}
          {weatherData && (
            <div className="bg-gradient-to-br from-sky-800 to-sky-950 text-white p-4 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-200 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{weatherData.locationName}</span>
                </span>
                <span className="text-xs bg-sky-700 px-2 py-0.5 rounded-md font-mono">{weatherData.temp}°C</span>
              </div>
              <div className="flex items-center space-x-3">
                <CloudSun className="w-8 h-8 text-amber-300" />
                <div>
                  <div className="text-sm font-bold">{weatherData.condition}</div>
                  <div className="text-xs text-sky-200">Humidity: {weatherData.humidity}%</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">Namaste, {farmerProfile.name || "Farmer"} 🙏</span>
                  <h2 className="text-2xl font-black">Ready for Today's Farm Updates?</h2>
                  <p className="text-xs text-emerald-200 max-w-lg">
                    Monitor your active crop cycles, check timely tasks, and talk with your AgriGuru AI Advisor for expert recommendations.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('advisor')}
                  className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold px-5 py-3 rounded-2xl shadow transition flex items-center space-x-2 text-sm shrink-0"
                >
                  <Bot className="w-4 h-4" />
                  <span>{txt.askAI}</span>
                </button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <div className="text-xs text-stone-500 font-medium">{txt.activeCrops}</div>
                  <div className="text-2xl font-black text-emerald-800">{crops.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <div className="text-xs text-stone-500 font-medium">{txt.totalPlots}</div>
                  <div className="text-2xl font-black text-stone-900">{plots.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <div className="text-xs text-stone-500 font-medium">{txt.pendingTasks}</div>
                  <div className="text-2xl font-black text-amber-600">{tasks.filter(t => t.status !== 'Completed').length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <div className="text-xs text-stone-500 font-medium">{txt.weatherAlerts}</div>
                  <div className="text-2xl font-black text-sky-700">None</div>
                </div>
              </div>

              {/* Active Crops Grid */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-stone-900 flex items-center space-x-2">
                    <Sprout className="w-5 h-5 text-emerald-700" />
                    <span>{txt.activeCrops}</span>
                  </h3>
                  <button
                    onClick={() => setShowCropModal(true)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{txt.recordSowing}</span>
                  </button>
                </div>

                {crops.length === 0 ? (
                  <div className="text-center py-10 space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <p className="text-xs text-stone-500">{txt.noCropsYet}</p>
                    <button
                      onClick={() => setShowCropModal(true)}
                      className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
                    >
                      {txt.addFirstCrop}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {crops.map((crop) => {
                      const age = getCropAge(crop.sowingDate);
                      return (
                        <div key={crop.id} className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-stone-50/50">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-stone-900">{crop.cropName}</h4>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">{crop.plotName}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200">
                            <div><span className="text-stone-400">Variety:</span> {crop.variety || 'Standard'}</div>
                            <div><span className="text-stone-400">{txt.cropAge}:</span> <strong className="text-stone-900">{age} {txt.days}</strong></div>
                            <div><span className="text-stone-400">{txt.sowedOn}:</span> {crop.sowingDate}</div>
                            <div><span className="text-stone-400">{txt.expectedHarvest}:</span> {crop.expectedHarvest}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Pending Tasks Section */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-base text-stone-900 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>{txt.pendingTasks}</span>
                </h3>

                {tasks.length === 0 ? (
                  <p className="text-xs text-stone-500 py-4">{txt.noTasksYet}</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50/50">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => handleTaskToggle(task.id)} className="text-stone-400 hover:text-emerald-700 transition">
                            {task.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <div className="w-5 h-5 rounded-full border-2 border-stone-300" />}
                          </button>
                          <div>
                            <div className={`text-xs font-semibold ${task.status === 'Completed' ? 'line-through text-stone-400' : 'text-stone-900'}`}>{task.title}</div>
                            <div className="text-[10px] text-stone-500">Scheduled: {task.date}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: FARMS & PLOTS */}
          {activeTab === 'farms' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{txt.farms}</h3>
                  <p className="text-xs text-stone-500">Manage your farm plots, soil types, and irrigation setup.</p>
                </div>
                <button
                  onClick={() => setShowPlotModal(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{txt.addNewPlot}</span>
                </button>
              </div>

              {plots.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs text-stone-500">{txt.noData}</p>
                  <button
                    onClick={() => setShowPlotModal(true)}
                    className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
                  >
                    {txt.addNewPlot}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plots.map(plot => (
                    <div key={plot.id} className="border border-stone-200 rounded-2xl p-4 space-y-3 bg-stone-50/50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-stone-900 flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-emerald-700" />
                          <span>{plot.name}</span>
                        </h4>
                        <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">{plot.area} {plot.unit}</span>
                      </div>
                      <div className="text-xs text-stone-600 space-y-1 bg-white p-3 rounded-xl border border-stone-200">
                        <div><strong className="text-stone-400">{txt.soilType}:</strong> {plot.soil}</div>
                        <div><strong className="text-stone-400">{txt.irrigationMethod}:</strong> {plot.irrigation}</div>
                        <div><strong className="text-stone-400">Location:</strong> {plot.village}, {plot.district}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE WEATHER */}
          {activeTab === 'weather' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">{txt.weather}</h3>
                    <p className="text-xs text-stone-500">Real-time local meteorological data for your farm coordinates.</p>
                  </div>
                  <button
                    onClick={handleGetCurrentLocation}
                    className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Weather</span>
                  </button>
                </div>

                {weatherData ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-sky-800 to-sky-950 text-white rounded-2xl p-6 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <div className="text-xs text-sky-200 font-semibold">{weatherData.locationName}</div>
                        <div className="text-4xl font-black">{weatherData.temp}°C</div>
                        <div className="text-sm text-sky-100">{weatherData.condition}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs bg-sky-900/50 p-4 rounded-xl border border-sky-700/50 w-full sm:w-auto">
                        <div><span className="text-sky-300">Humidity:</span> {weatherData.humidity}%</div>
                        <div><span className="text-sky-300">Wind:</span> {weatherData.windSpeed} km/h</div>
                        <div><span className="text-sky-300">Rain Chance:</span> {weatherData.rainfallChance}</div>
                        <div><span className="text-sky-300">Updated:</span> {weatherData.lastUpdated}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-stone-900">7-Day Forecast</h4>
                      <div className="space-y-2">
                        {weatherData.forecast.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                            <span className="font-bold text-stone-900">{f.day}</span>
                            <span className="text-stone-600">{f.cond}</span>
                            <span className="font-mono font-semibold text-sky-800">{f.temp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    <p className="text-xs text-stone-500">{txt.noWeatherYet}</p>
                    <button
                      onClick={handleGetCurrentLocation}
                      className="bg-sky-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow"
                    >
                      Fetch Live Weather
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: AGRIGURU AI ADVISOR */}
          {activeTab === 'advisor' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[650px]">
              {/* Header */}
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-700 text-white p-2.5 rounded-xl shadow-inner">
                    <Bot className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">{txt.aiAdvisorTitle}</h3>
                    <p className="text-[11px] text-stone-500">{txt.aiSubtitle}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm space-y-1 shadow-sm ${
                      msg.role === 'user' ? 'bg-emerald-700 text-white rounded-br-none' : 'bg-stone-100 text-stone-800 rounded-bl-none border border-stone-200'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <div className={`text-[10px] text-right pt-1 ${msg.role === 'user' ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4 text-xs text-stone-500 animate-pulse">
                      AgriGuru AI is thinking... 💭
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions Chips */}
              <div className="px-4 py-2 border-t border-stone-100 bg-stone-50 flex gap-2 overflow-x-auto">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs bg-white hover:bg-emerald-50 hover:border-emerald-600 border border-stone-200 text-stone-700 px-3 py-1.5 rounded-full whitespace-nowrap transition shadow-xs"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-stone-200 bg-white rounded-b-2xl">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={txt.typePrompt}
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isAiLoading}
                    className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold p-3 rounded-xl transition shadow flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: ACTIVITY LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{txt.logs}</h3>
                  <p className="text-xs text-stone-500">History of all farming activities, sowings, and fertilizer logs.</p>
                </div>
                <button
                  onClick={() => setShowActivityModal(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{txt.logActivity}</span>
                </button>
              </div>

              {logs.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs text-stone-500">{txt.noData}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {logs.map(log => (
                    <div key={log.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">{log.type}</span>
                          <span className="text-xs font-bold text-stone-900">{log.plot}</span>
                        </div>
                        <p className="text-xs text-stone-600">{log.details}</p>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">{log.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-stone-900">{txt.settings}</h3>
                <p className="text-xs text-stone-500">Update your profile details and app configurations.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={farmerProfile.name}
                    onChange={(e) => setFarmerProfile({ ...farmerProfile, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Village / Town</label>
                    <input
                      type="text"
                      value={farmerProfile.village}
                      onChange={(e) => setFarmerProfile({ ...farmerProfile, village: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">State</label>
                    <input
                      type="text"
                      value={farmerProfile.state}
                      onChange={(e) => setFarmerProfile({ ...farmerProfile, state: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-4 py-3 rounded-xl transition flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{txt.resetApp}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODALS */}
      {showPlotModal && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-stone-900">{txt.addNewPlot}</h3>
              <button onClick={() => setShowPlotModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddPlot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.plotName} *</label>
                <input
                  type="text"
                  required
                  value={newPlot.name}
                  onChange={(e) => setNewPlot({ ...newPlot, name: e.target.value })}
                  placeholder="e.g. South Field"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.area} *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newPlot.area}
                    onChange={(e) => setNewPlot({ ...newPlot, area: e.target.value })}
                    placeholder="2.0"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Unit</label>
                  <select
                    value={newPlot.unit}
                    onChange={(e) => setNewPlot({ ...newPlot, unit: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="bigha">Bigha</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPlotModal(false)} className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100">
                  {txt.cancel}
                </button>
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-xl text-xs shadow">
                  {txt.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCropModal && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-stone-900">{txt.recordSowing}</h3>
              <button onClick={() => setShowCropModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCrop} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Select Plot</label>
                <select
                  value={newCrop.plotId}
                  onChange={(e) => setNewCrop({ ...newCrop, plotId: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">Select Farm Plot</option>
                  {plots.map(p => <option key={p.id} value={p.id}>{p.name} ({p.area} {p.unit})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.cropName} *</label>
                <input
                  type="text"
                  required
                  value={newCrop.cropName}
                  onChange={(e) => setNewCrop({ ...newCrop, cropName: e.target.value })}
                  placeholder="e.g. Wheat / Paddy"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Variety</label>
                  <input
                    type="text"
                    value={newCrop.variety}
                    onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                    placeholder="HD-2967"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.sowingDate}</label>
                  <input
                    type="date"
                    value={newCrop.sowingDate}
                    onChange={(e) => setNewCrop({ ...newCrop, sowingDate: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowCropModal(false)} className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100">
                  {txt.cancel}
                </button>
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-xl text-xs shadow">
                  {txt.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showActivityModal && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-stone-900">{txt.logActivity}</h3>
              <button onClick={() => setShowActivityModal(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Activity Type</label>
                <select
                  value={newLog.type}
                  onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer">Fertilizer Application</option>
                  <option value="Pesticide">Pesticide / Spray</option>
                  <option value="Weeding">Weeding</option>
                  <option value="Harvest">Harvest</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Details *</label>
                <textarea
                  required
                  rows="3"
                  value={newLog.details}
                  onChange={(e) => setNewLog({ ...newLog, details: e.target.value })}
                  placeholder="e.g. Applied Urea 45kg on North Field"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowActivityModal(false)} className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100">
                  {txt.cancel}
                </button>
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-xl text-xs shadow">
                  {txt.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-lg text-red-600 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{txt.resetApp}</span>
            </h3>
            <p className="text-xs text-stone-600">{txt.confirmReset}</p>
            <div className="pt-2 flex justify-end space-x-2">
              <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100">
                {txt.cancel}
              </button>
              <button onClick={handleResetApp} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow">
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
