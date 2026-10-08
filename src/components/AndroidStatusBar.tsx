import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/95 backdrop-blur-md text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800/80 select-none z-40">
      <div className="font-semibold tracking-wide text-slate-200">
        {timeStr || '8:30 AM'}
      </div>
      <div className="flex items-center gap-1.5 text-slate-300">
        <span className="text-[10px] font-bold text-emerald-400">5G</span>
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-medium text-slate-400">94%</span>
          <BatteryMedium className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
