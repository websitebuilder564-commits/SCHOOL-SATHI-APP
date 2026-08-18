import React, { useState } from 'react';
import { Globe, Sparkles, CheckCircle2, MessageSquare, BookOpen, Bell } from 'lucide-react';

export const MultilingualSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('hi');

  const languages = [
    { code: 'en', name: 'English', native: 'English', greeting: 'Good morning Rahul! Today you have Mathematics & Physics.', attendanceText: 'Attendance: 92.4% (Good Standing)', noticeText: 'Annual Sports Day on Nov 14th.' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', greeting: 'शुभ प्रभात राहुल! आज आपकी गणित और भौतिक विज्ञान की कक्षाएं हैं।', attendanceText: 'उपस्थिति: 92.4% (उत्कृष्ट स्थिति)', noticeText: '14 नवंबर को वार्षिक खेल दिवस।' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', greeting: 'সুপ্রভাত রাহুল! আজ আপনার গণিত এবং পদার্থবিজ্ঞান ক্লাস আছে।', attendanceText: 'উপস্থিতি: ৯২.৪% (ভালো অবস্থা)', noticeText: '১৪ই নভেম্বর বার্ষিক ক্রীড়া দিবস।' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', greeting: 'காலை வணக்கம் ராகுல்! இன்று உங்களுக்கு கணிதம் மற்றும் இயற்பியல் உள்ளது.', attendanceText: 'வருகை: 92.4% (சிறந்த நிலை)', noticeText: 'நவம்பர் 14 அன்று விளையாட்டு தினம்.' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', greeting: 'శుభోదయం రాహుల్! ఈరోజు మీకు గణితం మరియు భౌతిక శాస్త్ర తరగతులు ఉన్నాయి.', attendanceText: 'హాజరు: 92.4% (ఉత్తమ స్థితి)', noticeText: 'నవంబర్ 14న వార్షిక క్రీడా దినోత్సవం.' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', greeting: 'शुभ सकाळ राहुल! आज तुमचे गणित आणि भौतिकशास्त्र तास आहेत.', attendanceText: 'उपस्थिती: ९२.४% (उत्कृष्ट स्थिती)', noticeText: '१४ नोव्हेंबर रोजी क्रीडा दिन.' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ಶುಭೋದಯ ರಾಹುಲ್! ಇಂದು ನಿಮಗೆ ಗಣಿತ ಮತ್ತು ಭೌತಶಾಸ್ತ್ರ ತರಗತಿಗಳಿವೆ.', attendanceText: 'ಹಾಜರಾತಿ: 92.4% (ಉತ್ತಮ ಸ್ಥಿತಿ)', noticeText: 'ನವೆಂಬರ್ 14 ರಂದು ಕ್ರೀಡಾ ದಿನ.' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', greeting: 'શુભ સવાર રાહુલ! આજે તમારા ગણિત અને ભૌતિકશાસ્ત્રના વર્ગ છે.', attendanceText: 'હાજરી: 92.4% (ઉત્તમ સ્થિતિ)', noticeText: '14 નવેમ્બરે વાર્ષિક રમત દિવસ.' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', greeting: 'ਸ਼ੁਭ ਸਵੇਰ ਰਾਹੁਲ! ਅੱਜ ਤੁਹਾਡੀ ਗਣਿਤ ਅਤੇ ਭੌਤਿਕ ਵਿਗਿਆਨ ਦੀ ਕਲਾਸ ਹੈ।', attendanceText: 'ਹਾਜ਼ਰੀ: 92.4% (ਚੰਗੀ ਸਥਿਤੀ)', noticeText: '14 ਨਵੰਬਰ ਨੂੰ ਸਾਲਾਨਾ ਖੇਡ ਦਿਵਸ।' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', greeting: 'ശുഭോദയം രാഹുൽ! ഇന്ന് നിങ്ങൾക്ക് കണക്കും ഫിസിക്സും ക്ലാസുകളുണ്ട്.', attendanceText: 'ഹാജർ: 92.4% (നല്ല നില)', noticeText: 'നവംബർ 14-ന് വാർഷിക കായിക ദിനം.' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', greeting: 'ଶୁଭ ସକାଳ ରାହୁଲ! ଆଜି ଆପଣଙ୍କର ଗଣିତ ଏବଂ ପଦାର୍ଥ ବିଜ୍ଞାନ କ୍ଲାସ ଅଛି।', attendanceText: 'ଉପସ୍ଥିତି: ୯୨.୪% (ଉତ୍ତମ ସ୍ଥିତି)', noticeText: '୧୪ ନଭେମ୍ବରରେ ବାର୍ଷିକ କ୍ରୀଡ଼ା ଦିବସ।' },
  ];

  const current = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <section id="multilingual" className="py-20 lg:py-28 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Inclusive Linguistic Access</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Built for Every Language.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Language should never be a barrier between parents and their child's education. School Saathi provides conversational AI and ERP interfaces across 11 official Indian languages.
          </p>
        </div>

        {/* Interactive Language Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-12">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedLang === lang.code
                  ? 'bg-[#1557D6] text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'bg-[#F5F8FC] text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span>{lang.native}</span>
              <span className={`text-[10px] ${selectedLang === lang.code ? 'text-blue-200' : 'text-slate-400'}`}>
                ({lang.name})
              </span>
            </button>
          ))}
        </div>

        {/* Live UI Localization Preview Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0B1736] to-[#0F2864] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-900/60">
          <div className="flex items-center justify-between pb-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1557D6] flex items-center justify-center text-white font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-200">Active Localization Preview</p>
                <h4 className="text-lg font-bold text-white">{current.native} ({current.name})</h4>
              </div>
            </div>
            <span className="text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full font-bold border border-emerald-500/30">
              Live NLP Ready
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {/* Greeting Pill */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00C2FF] mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>AI Assistant Daily Briefing:</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                "{current.greeting}"
              </p>
            </div>

            {/* Attendance & Notice Pill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Student Attendance:</span>
                </div>
                <p className="text-xs font-bold text-white">{current.attendanceText}</p>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Latest Circular:</span>
                </div>
                <p className="text-xs font-bold text-white">{current.noticeText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
