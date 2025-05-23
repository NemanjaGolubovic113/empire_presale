import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { TokenAllocation } from '../types';

interface TokenomicsChartProps {
  allocations: TokenAllocation[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TokenomicsChart: React.FC<TokenomicsChartProps> = ({ 
  allocations, 
  activeIndex, 
  setActiveIndex 
}) => {
  const calculateSegments = () => {
    const total = allocations.reduce((sum, allocation) => sum + allocation.percentage, 0);
    let startAngle = -90; // Start from top
    
    return allocations.map((allocation, index) => {
      const percentage = allocation.percentage / total;
      const angle = percentage * 360;
      const endAngle = startAngle + angle;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 50 + 40 * Math.cos(startRad);
      const y1 = 50 + 40 * Math.sin(startRad);
      const x2 = 50 + 40 * Math.cos(endRad);
      const y2 = 50 + 40 * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${x1} ${y1}`,
        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`
      ].join(' ');
      
      startAngle = endAngle;
      
      return {
        color: allocation.color,
        pathData,
        percentage: allocation.percentage,
        labelAngle: startAngle - angle / 2,
        glowColor: allocation.color.replace(')', ', 0.3)').replace('rgb', 'rgba'),
      };
    });
  };
  
  const segments = calculateSegments();

  return (
    <div className="relative flex items-center justify-center my-4 sm:my-8">
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px]">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
        >
          <defs>
            {segments.map((segment, index) => (
              <filter key={`glow-${index}`} id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            ))}
          </defs>
          
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="transparent" 
            stroke="#1a1a2e" 
            strokeWidth="20"
            className="opacity-30"
          />
          
          {/* Animated segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.pathData}
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              filter={activeIndex === index ? `url(#glow-${index})` : undefined}
              className={`transition-all duration-200 ease-out ${
                activeIndex === index ? 'filter brightness-125' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                transitionDelay: `${index * 100}ms`,
                cursor: 'pointer'
              }}
            />
          ))}
          
          {/* Center logo */}
          <g filter="url(#glow-center)">
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="#7B68EE"
              className="stroke-purple-800 stroke-2"
            />
            {/* <path
              d="M 45 50 L 55 50 M 50 45 L 50 55"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            /> */}
          </g>
        </svg>
        
        {/* Labels */}
        {segments.map((segment, index) => {
          const angle = (segment.labelAngle * Math.PI) / 180;
          const radius = 40;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          
          return (
            <div
              key={index}
              className={`absolute text-white font-bold text-xs sm:text-sm transition-all duration-500 ${
                'opacity-100 scale-100'
              } ${activeIndex === index ? 'text-shadow-glow' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                transitionDelay: `${(index + 1) * 100}ms`,
                textShadow: activeIndex === index ? `0 0 10px ${segment.color}` : 'none'
              }}
            >
              {segment.percentage}%
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokenomicsChart;