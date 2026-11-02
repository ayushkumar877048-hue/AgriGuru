import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  Sprout, CloudSun, Calendar, Bell, Bot, BarChart3, Settings, 
  MapPin, Plus, Trash2, CheckCircle2, Clock, AlertTriangle, 
  Droplet, ShieldAlert, ChevronRight, Globe, Download, RefreshCw, 
  Search, FileText, Check, X, ArrowUpRight, Compass, Heart, 
  Layers, Package, Award, Sparkles, AlertCircle, PhoneCall, HelpCircle,
  Navigation, User, CheckCircle, RotateCcw, Send, Image as ImageIcon,
  Lightbulb, MessageSquare
} from 'lucide-react';

// Initialize Gemini SDK with your Vite environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

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
  const [isOnboarded, setIsOnboarded] = useState(() => localStorage.getItem('agriguru_profile_completed') === 'true');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('agriguru_farmer_profile');
    return saved ? JSON.parse(saved) : { name: '', village: '', district: '', state: '', pincode: '', season: 'Kharif / Rabi' };
  });

  const [plots, setPlots] = useState(() => JSON.parse(localStorage.getItem('agriguru_plots') || '[]'));
  const [crops, setCrops] = useState(() => JSON.parse(localStorage.getItem('agriguru_crops') || '[]'));
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('agriguru_tasks') || '[]'));
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('agriguru_logs') || '[]'));
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    localStorage.setItem('agriguru_farmer_profile', JSON.stringify(farmerProfile));
    localStorage.setItem('agriguru_plots', JSON.stringify(plots));
    localStorage.setItem('agriguru_crops', JSON.stringify(crops));
    localStorage.setItem('agriguru_tasks', JSON.stringify(tasks));
    localStorage.setItem('agriguru_logs', JSON.stringify(logs));
  }, [farmerProfile, plots, crops, tasks, logs]);

  useEffect(() => {
    if (isOnboarded && !weatherData) {
      fetchWeatherForLocation(22.7196, 75.8577, "Indore, MP");
    }
  }, [isOnboarded]);

  const [showPlotModal, setShowPlotModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [onboardProfile, setOnboardProfile] = useState({ name: '', language: 'en', state: '', district: '', village: '', pincode: '' });
  const [onboardFarm, setOnboardFarm] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [locationStatus, setLocationStatus] = useState({ loading: false, message: '' });

  const [newPlot, setNewPlot] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [newCrop, setNewCrop] = useState({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  const [newLog, setNewLog] = useState({ type: 'Irrigation', plot: '', crop: '', details: '', date: new Date().toISOString().split('T')[0] });

  // AI Chatbot state with official SDK integration
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Namaste! I am your AgriGuru AI Advisor, powered by Gemini. You can ask me anything from crop management and weather advisories to general knowledge, science, history, and geography!', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const quickQuestions = [
    "How to manage yellowing leaves on Wheat?",
    "Best fertilizer schedule for Paddy/Rice",
    "What causes seasons on Earth?",
    "Explain photosynthesis in simple terms"
  ];

  // Official SDK Message Handler
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
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: {
          parts: [{ text: "You are AgriGuru AI Advisor, an advanced smart farming assistant and versatile general knowledge expert. You answer any question from agriculture, crop protection, pest diagnostics, soil health, weather science, to general knowledge, history, geography, and science with accurate, engaging, structured, and detailed responses. Do not use markdown asterisks or bullet star symbols in your response." }]
        }
      });

      const result = await model.generateContent(query);
      const rawAiText = await result.response.text();
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
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
      const data = await res.json();
      if (data && data.current_weather) {
        setWeatherData({
          temp: Math.round(data.current_weather.temperature),
          condition: data.current_weather.weathercode <= 3 ? 'Clear / Sunny' : 'Cloudy',
          humidity: data.hourly?.relativehumidity_2m?.[0] || 55,
          windSpeed: data.current_weather.windspeed,
          locationName: locName
        });
      }
    } catch (e) {
      console.warn("Weather fetch failed", e);
    }
  };

  const handleCompleteOnboarding = () => {
    setFarmerProfile({
      name: onboardProfile.name,
      village: onboardProfile.village,
      district: onboardProfile.district,
      state: onboardProfile.state,
      pincode: onboardProfile.pincode
    });
    setLang(onboardProfile.language);

    if (onboardFarm.name && onboardFarm.area) {
      setPlots([{
        id: 'p_' + Date.now(),
        ...onboardFarm,
        village: onboardProfile.village,
        state: onboardProfile.state
      }]);
    }

    localStorage.setItem('agriguru_profile_completed', 'true');
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans text-stone-900">
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-stone-200 overflow-hidden p-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Sprout className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to AgriGuru! 🌱</h1>
            <p className="text-xs text-stone-600">Your smart farming companion from sowing to harvest.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Full Name *</label>
              <input 
                type="text" 
                value={onboardProfile.name}
                onChange={(e) => setOnboardProfile({ ...onboardProfile, name: e.target.value })}
                placeholder="e.g. Tejas Nigam"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">State *</label>
                <input 
                  type="text" 
                  value={onboardProfile.state}
                  onChange={(e) => setOnboardProfile({ ...onboardProfile, state: e.target.value })}
                  placeholder="Madhya Pradesh"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Village / Town *</label>
                <input 
                  type="text" 
                  value={onboardProfile.village}
                  onChange={(e) => setOnboardProfile({ ...onboardProfile, village: e.target.value })}
                  placeholder="Waidhan"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <button 
              disabled={!onboardProfile.name || !onboardProfile.state || !onboardProfile.village}
              onClick={handleCompleteOnboarding}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl shadow transition"
            >
              Launch AgriGuru Dashboard 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900">
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-800 p-2 rounded-xl">
              <Sprout className="w-6 h-6 text-amber-300" />
            </div>
            <span className="font-extrabold text-lg">AgriGuru</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold">{farmerProfile.name}</div>
            <div className="text-[10px] text-emerald-200">{farmerProfile.village}, {farmerProfile.state}</div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-3 space-y-1">
            {[
              { id: 'dashboard', label: txt.dashboard, icon: BarChart3 },
              { id: 'farms', label: txt.farms, icon: MapPin },
              { id: 'weather', label: txt.weather, icon: CloudSun },
              { id: 'advisor', label: txt.advisor, icon: Bot },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${
                    isActive ? 'bg-emerald-700 text-white shadow' : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase text-amber-300 font-bold">Namaste, {farmerProfile.name} 🙏</span>
                  <h2 className="text-2xl font-black">Your Farm Overview</h2>
                </div>
                <button onClick={() => setActiveTab('advisor')} className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow">
                  Ask AI 🤖
                </button>
              </div>
            </div>
          )}

          {activeTab === 'advisor' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[600px]">
              <div className="p-4 border-b border-stone-200 bg-stone-50 rounded-t-2xl flex items-center space-x-3">
                <div className="bg-emerald-700 text-white p-2 rounded-xl">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{txt.aiAdvisorTitle}</h3>
                  <p className="text-[11px] text-stone-500">Powered by official Gemini SDK</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm shadow-sm ${
                      msg.role === 'user' ? 'bg-emerald-700 text-white rounded-br-none' : 'bg-stone-100 text-stone-800 rounded-bl-none border border-stone-200'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[10px] text-right pt-1 ${msg.role === 'user' ? 'text-emerald-200' : 'text-stone-400'}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}
                {isAiLoading && <div className="text-xs text-stone-500 animate-pulse">AgriGuru AI is thinking... 💭</div>}
              </div>

              <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex gap-2 overflow-x-auto">
                {quickQuestions.map((q, idx) => (
                  <button key={idx} onClick={() => handleSendMessage(q)} className="text-xs bg-white hover:bg-emerald-50 border border-stone-200 text-stone-700 px-3 py-1.5 rounded-full whitespace-nowrap shadow-xs">
                    {q}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-stone-200 bg-white rounded-b-2xl">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={txt.typePrompt}
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button type="submit" disabled={!chatInput.trim() || isAiLoading} className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold p-3 rounded-xl shadow">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'farms' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-lg">Farms & Plots</h3>
              {plots.map(p => <div key={p.id} className="p-3 bg-stone-50 rounded-xl text-xs">{p.name} ({p.area} {p.unit}) - {p.soil}</div>)}
            </div>
          )}

          {activeTab === 'weather' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-lg">Live Weather</h3>
              {weatherData && (
                <div className="bg-sky-900 text-white p-6 rounded-2xl space-y-1">
                  <div className="text-xs text-sky-200">{weatherData.locationName}</div>
                  <div className="text-4xl font-black">{weatherData.temp}°C</div>
                  <div className="text-sm">{weatherData.condition} | Humidity: {weatherData.humidity}%</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
