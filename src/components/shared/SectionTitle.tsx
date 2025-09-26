import React from 'react';

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
    return (    
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* Red square before text */}
            <div className="w-2 h-5 bg-red-500 rounded-sm"></div>
            <p className="text-red-500 font-medium text-sm">{title}</p>
          </div>
          <h2 className="text-2xl font-semibold">{subtitle}</h2>
        </div>  
    );
}
