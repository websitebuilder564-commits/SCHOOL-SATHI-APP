import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  PlusCircle,
  Users,
  Trophy,
  Palette,
  FlaskConical,
  GraduationCap,
  Cpu
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

export const UpcomingEventsSection: React.FC = () => {
  const events = [
    {
      title: 'Parent-Teacher Meeting (PTM)',
      date: 'OCT 24',
      time: '08:30 AM - 01:30 PM',
      location: 'Senior Wing Classrooms',
      desc: '1-on-1 performance review with class & subject teachers for Term-1 assessment feedback.',
      category: 'Academic',
      image: WEBSITE_IMAGES.events.ptm,
    },
    {
      title: 'Annual Athletic Sports Meet',
      date: 'NOV 08',
      time: '08:00 AM - 04:00 PM',
      location: 'Main Sports Complex',
      desc: 'Track and field competitions, relay races, inter-house championships, and march past.',
      category: 'Sports',
      image: WEBSITE_IMAGES.events.sports,
    },
    {
      title: 'Inter-School Science & AI Expo',
      date: 'NOV 18',
      time: '09:30 AM - 03:00 PM',
      location: 'Central Exhibition Hall',
      desc: 'Showcasing working prototypes in robotics, clean energy, space tech, and automated campus models.',
      category: 'Exhibition',
      image: WEBSITE_IMAGES.events.science,
    },
    {
      title: 'Annual Cultural Festival & Gala',
      date: 'DEC 05',
      time: '05:00 PM - 08:30 PM',
      location: 'Grand School Auditorium',
      desc: 'Theatrical productions, classical and contemporary orchestra, dance, and awards ceremony.',
      category: 'Arts & Culture',
      image: WEBSITE_IMAGES.events.cultural,
    },
    {
      title: 'Mid-Term Board Mock Examinations',
      date: 'DEC 14',
      time: '09:00 AM - 12:15 PM',
      location: 'Academic Examination Block',
      desc: 'Full-length simulated CBSE sample papers under standard board invigilation rules.',
      category: 'Exams',
      image: WEBSITE_IMAGES.events.examination,
    },
    {
      title: 'AI & Robotics STEM Workshop',
      date: 'JAN 10',
      time: '10:00 AM - 02:00 PM',
      location: 'Tinkering Lab (ATL)',
      desc: 'Hands-on training on microcontrollers, sensor integration, and intelligent algorithm logic.',
      category: 'Workshop',
      image: WEBSITE_IMAGES.events.workshop,
    },
  ];

  return (
    <section id="events" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>CAMPUS CALENDAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
            Upcoming Institutional Events
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Stay synced with school holidays, sports competitions, parent-teacher conferences, and academic workshops.
          </p>
        </div>

        {/* 6-Card Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Event Photo with Date Overlay */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Large Date Stamp Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 text-center shadow-lg border border-slate-100">
                    <div className="text-[10px] font-bold text-[#0F766E] uppercase tracking-wider">
                      {evt.date.split(' ')[0]}
                    </div>
                    <div className="text-lg font-black text-[#0B2545] font-mono leading-none">
                      {evt.date.split(' ')[1]}
                    </div>
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3.5 right-3.5 px-3 py-1 bg-[#0B2545]/90 text-amber-300 font-bold text-[10px] rounded-full backdrop-blur-md border border-slate-600">
                    {evt.category}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-[#0F766E] transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    {evt.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Register Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Open to Students &amp; Parents</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] hover:text-[#0B2545] cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Add to Calendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
