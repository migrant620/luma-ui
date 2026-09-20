import React from 'react';
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
const P = ({ d, size = 24, color = '#1A1A1A', fill = 'none', strokeWidth = 2, stroke = color }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d}/>
  </Svg>);
export const HomeIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10.5z"/>
  </Svg>);
export const DiscoverIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="9.2"/>
    <Path d="M15.5 8.5l-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1z" fill={color} stroke="none"/>
  </Svg>);
export const HeartIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21s-7-4.5-9.5-9C.8 8.5 2.5 4.5 6.5 4.5c2 0 3.5 1 4.5 2.5 1-1.5 2.5-2.5 4.5-2.5 4 0 5.7 4 4 7.5-2.5 4.5-7.5 9-7.5 9z"/>
  </Svg>);
export const ChatIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1121 11.5z"/>
  </Svg>);
export const SettingsGear = ({ size = 28, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3"/>
    <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.36.87 1.28 1.4 2.2 1H22a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </Svg>);
export const MapIcon = ({ size = 26, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/>
    <Path d="M9 4v14M15 6v14"/>
  </Svg>);
export const SearchIcon = ({ size = 26, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="7"/>
    <Path d="M21 21l-4.3-4.3"/>
  </Svg>);
export const ClockIcon = ({ size = 18, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
    <Circle cx="12" cy="12" r="9"/>
    <Path d="M12 7v5l3 2"/>
  </Svg>);
export const PinIcon = ({ size = 18, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z"/>
    <Circle cx="12" cy="9" r="2.5"/>
  </Svg>);
export const ChevronRight = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 6l6 6-6 6"/>
  </Svg>);
export const ChevronDown = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6"/>
  </Svg>);
export const BackArrow = ({ size = 28, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 6l-6 6 6 6"/>
  </Svg>);
export const ShareIcon = ({ size = 24, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="18" cy="5" r="3"/>
    <Circle cx="6" cy="12" r="3"/>
    <Circle cx="18" cy="19" r="3"/>
    <Path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>
  </Svg>);
export const PlusIcon = ({ size = 24, color = '#6B6B70' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <Path d="M12 5v14M5 12h14"/>
  </Svg>);
export const CloseX = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <Path d="M6 6l12 12M18 6L6 18"/>
  </Svg>);
export const CalendarEmptyIcon = ({ size = 48, color = '#D3D3D8' }: any) => (<Svg width={size} height={size} viewBox="0 0 120 100">
    
    <Rect x="10" y="26" width="52" height="48" rx="17" fill="#FFFFFF"/>
    <Rect x="58" y="26" width="52" height="48" rx="17" fill="#FFFFFF"/>
    <Rect x="56" y="40" width="8" height="20" rx="4" fill={color}/>
  </Svg>);
export const ImageAddIcon = ({ size = 24, color = '#FFFFFF' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="18" height="18" rx="3"/>
    <Circle cx="8.5" cy="8.5" r="1.5"/>
    <Path d="M21 15l-5-5L5 21"/>
    <Path d="M18 3v4M16 5h4" stroke={color} strokeWidth={2.2}/>
  </Svg>);
export const LocationPinInput = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z"/>
    <Circle cx="12" cy="9" r="2.5"/>
  </Svg>);
export const DescriptionIcon = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="3" width="16" height="18" rx="2"/>
    <Path d="M8 8h8M8 12h8M8 16h5"/>
  </Svg>);
export const LockIcon = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="10" width="16" height="11" rx="2.5"/>
    <Path d="M8 10V7a4 4 0 018 0v3"/>
  </Svg>);
export const GoogleIcon = ({ size = 24 }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.04H12v3.86h5.9a5.05 5.05 0 01-2.2 3.3v2.75h3.56c2.08-1.92 3.24-4.74 3.24-7.87z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.05-3.72 1.05-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A11 11 0 0012 23z"/>
    <Path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.67-2.84z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15A10.96 10.96 0 0012 1 11 11 0 002.18 7.06l3.67 2.84C6.72 7.31 9.14 5.38 12 5.38z"/>
  </Svg>);
export const PasskeyIcon = ({ size = 24, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2a5 5 0 00-3 9v3a2 2 0 002 2h2a2 2 0 002-2v-3a5 5 0 00-3-9zm0 3a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2z"/>
    <Circle cx="17" cy="17" r="3"/>
  </Svg>);
export const CatFamily = ({ size = 26, color = '#A855F7' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11l9-8 9 8v9a2 2 0 01-2 2h-4v-6H10v6H6a2 2 0 01-2-2v-9z"/>
    <Path d="M12 15.6s-3.3-2.1-3.3-4a1.95 1.95 0 013.3-1.4 1.95 1.95 0 013.3 1.4c0 1.9-3.3 4-3.3 4z" fill={color} stroke="none"/>
  </Svg>);
export const CatTech = ({ size = 26, color = '#3B82F6' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="4" width="20" height="14" rx="2"/>
    <Path d="M8 21h8M10 9l-2 2 2 2M14 9l2 2-2 2"/>
  </Svg>);
export const CatFood = ({ size = 26, color = '#EA580C' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12h16a8 8 0 01-16 0z"/>
    <Path d="M8 12V8a4 4 0 018 0v4M12 3v2M12 12c0 4-4 6-4 8M12 12c0 4 4 6 4 8"/>
  </Svg>);
export const CatBooks = ({ size = 26, color = '#CA8A04' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 5a2 2 0 012-2h5v18H5a2 2 0 01-2-2V5z"/>
    <Path d="M21 5a2 2 0 00-2-2h-5v18h5a2 2 0 002-2V5z"/>
    <Path d="M7 7h2M7 10h2M15 7h2M15 10h2"/>
  </Svg>);
export const CatGames = ({ size = 26, color = '#B45309' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="18" height="18" rx="5"/>
    <Circle cx="8.5" cy="8.5" r="1.25" fill={color} stroke="none"/>
    <Circle cx="15.5" cy="8.5" r="1.25" fill={color} stroke="none"/>
    <Circle cx="15.5" cy="15.5" r="1.25" fill={color} stroke="none"/>
    <Circle cx="8.5" cy="15.5" r="1.25" fill={color} stroke="none"/>
    <Circle cx="12" cy="12" r="1.25" fill={color} stroke="none"/>
  </Svg>);
export const CatAI = ({ size = 26, color = '#EC4899' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 3a3 3 0 016 0v.4A4 4 0 0119 7.5a4 4 0 01-1.6 6.4A4 4 0 0112 18a4 4 0 01-5.4-4.1A4 4 0 015 7.5a4 4 0 014-4.1V3z"/>
    <Path d="M12 8.5v5M9.5 11h5"/>
  </Svg>);
export const CatRunning = ({ size = 26, color = '#65A30D' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="15" cy="5" r="2"/>
    <Path d="M13 8l-3-2-3 2 2 3-2 5 3 1 1-3 3 2 2 4"/>
    <Path d="M6 13l-3-1M16 10l3 1"/>
  </Svg>);
export const ScidrMark = ({ size = 30 }: any) => (<Svg width={size} height={size} viewBox="0 0 30 30">
    <Rect x="0.5" y="0.5" width="29" height="29" rx="9" fill="#F0F0F2"/>
    {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        return <Circle key={i} cx={15 + Math.cos(a) * 8} cy={15 + Math.sin(a) * 8} r="2.1" fill="#1A1A1A"/>;
    })}
  </Svg>);
export const GearMark = ({ size = 24, bg = '#E7EEF5' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="11" fill={bg}/>
    <G stroke="#4A6B8A" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <Circle cx="12" cy="12" r="3.2"/>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (<Path key={i} d={`M${12 + Math.cos(a) * 4.4},${12 + Math.sin(a) * 4.4} L${12 + Math.cos(a) * 7.4},${12 + Math.sin(a) * 7.4}`}/>);
    })}
    </G>
  </Svg>);
export const FlowerMark = ({ size = 24, bg = '#F2F1F6' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="11" fill={bg}/>
    <G stroke="#1A1A1A" strokeWidth="1.5" fill="none">
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return <Circle key={i} cx={12 + Math.cos(a) * 3.4} cy={12 + Math.sin(a) * 3.4} r="2.7"/>;
    })}
    </G>
  </Svg>);
export const AiCollectiveMark = ({ size = 24 }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="aicBg" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#1B1B3A"/>
        <Stop offset="1" stopColor="#0E0E24"/>
      </LinearGradient>
      <LinearGradient id="aicC" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#FF7A3D"/>
        <Stop offset="0.55" stopColor="#E0457A"/>
        <Stop offset="1" stopColor="#3B6FF0"/>
      </LinearGradient>
    </Defs>
    <Rect x="0.6" y="0.6" width="22.8" height="22.8" rx="7" fill="url(#aicBg)"/>
    <Path d="M16 8.2A5.2 5.2 0 1 0 16.6 13.6" stroke="url(#aicC)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <Circle cx="12" cy="12" r="1.7" fill="#F2F2F5"/>
  </Svg>);
