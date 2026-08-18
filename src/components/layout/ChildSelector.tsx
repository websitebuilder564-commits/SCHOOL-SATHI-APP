import React from 'react';
import { Student } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Check, UserCircle } from 'lucide-react';

interface ChildSelectorProps {
  childrenList: Student[];
  selectedChildId: string;
  onSelectChild: (studentId: string) => void;
}

export const ChildSelector: React.FC<ChildSelectorProps> = ({
  childrenList,
  selectedChildId,
  onSelectChild,
}) => {
  const { t } = useLanguage();

  if (childrenList.length <= 1) return null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-indigo-600" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('selectChild')} ({childrenList.length} linked)
            </h4>
            <p className="text-[11px] text-slate-500">
              Select child to switch attendance, academics, and schedule context
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {childrenList.map((child) => {
            const isSelected = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() => onSelectChild(child.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-white/50"
                />
                <div className="text-left leading-tight">
                  <div>{child.name}</div>
                  <div className={`text-[10px] font-normal ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    Class {child.class}{child.section} • Roll #{child.rollNo}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
