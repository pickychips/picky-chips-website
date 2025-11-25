import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  Activity, 
  Settings, 
  Bell, 
  LogOut,
  TrendingUp,
  DollarSign,
  Save,
  RefreshCw,
  Image as ImageIcon,
  Menu,
  X,
  Edit3,
  Upload,
  Copy,
  Check,
  Wand2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Logo } from './Logo';

interface DashboardProps {
  onLogout: () => void;
}

// Mock Data for charts
const performanceData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4780 },
  { name: 'May', value: 5890 },
  { name: 'Jun', value: 6390 },
  { name: 'Jul', value: 8490 },
];

const allocationData = [
  { name: 'Derivatives', value: 45 },
  { name: 'Equities', value: 30 },
  { name: 'Bonds', value: 15 },
  { name: 'Cash', value: 10 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <PieChart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Portfolio details module coming soon.</p>
            </div>
          </div>
        );
      case 'strategies':
        return (
          <div className="flex items-center justify-center h-full text-slate-500">
            <div className="text-center">
              <Activity size={48} className="mx-auto mb-4 opacity-50" />
              <p>Strategy builder module coming soon.</p>
            </div>
          </div>
        );
      case 'overview':
      default:
        return <OverviewView />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Settings Modal - Uses Portal for z-index safety */}
      {isSettingsModalOpen && (
        <SettingsModal onClose={() => setIsSettingsModalOpen(false)} />
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800 flex-shrink-0">
          <button 
            className="flex items-center cursor-pointer group relative bg-transparent border-none p-0 outline-none w-full text-left"
            onClick={() => setIsSettingsModalOpen(true)}
            title="Click to customize logo"
            type="button"
          >
            <div className="relative">
              {/* LOGO SIZE: Set to w-16 h-16 (64px) - Prominent Sidebar Size */}
              <Logo className="text-gold-500 w-16 h-16 mr-3 transition-transform group-hover:scale-110" />
              <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-600 pointer-events-none">
                <Edit3 size={8} className="text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">Picky Chips</span>
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard />} label="Overview" active={activeTab === 'overview'} onClick={() => handleTabChange('overview')} />
          <SidebarItem icon={<PieChart />} label="Portfolio" active={activeTab === 'portfolio'} onClick={() => handleTabChange('portfolio')} />
          <SidebarItem icon={<Activity />} label="Strategies" active={activeTab === 'strategies'} onClick={() => handleTabChange('strategies')} />
        </nav>

        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-slate-900/30">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gold-500 hover:text-gold-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={28} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-white capitalize">{activeTab}</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Welcome back, Partner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Global Settings Trigger */}
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 text-slate-400 hover:text-gold-500 hover:bg-slate-800 rounded-full transition-colors border border-transparent hover:border-gold-500/30"
              title="Customize Appearance"
            >
              <Settings size={20} />
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1" />

            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-yellow-300 border-2 border-slate-800 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsSettingsModalOpen(true)}
              title="Profile Settings"
            />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Views ---

const OverviewView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <MetricCard 
        title="Total AUM" 
        value="$4.2M" 
        change="+12.5%" 
        isPositive={true} 
        icon={<DollarSign size={18} />}
      />
      <MetricCard 
        title="Day P&L" 
        value="$14,230" 
        change="+2.1%" 
        isPositive={true} 
        icon={<TrendingUp size={18} />}
      />
      <MetricCard 
        title="Sharpe Ratio" 
        value="2.8" 
        change="-0.1%" 
        isPositive={false} 
        icon={<Activity size={18} />}
      />
      <MetricCard 
        title="Active Hedges" 
        value="12" 
        change="Neutral" 
        isPositive={true} 
        icon={<Activity size={18} />}
      />
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Performance Chart */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Performance History</h3>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400 cursor-pointer">1W</span>
            <span className="text-xs px-2 py-1 bg-gold-500 text-slate-900 font-bold rounded cursor-pointer">1M</span>
            <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400 cursor-pointer">YTD</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#fbbf24' }}
              />
              <Area type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Allocation Bar Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Asset Allocation</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={allocationData} layout="vertical" margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#475569'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Recent Positions */}
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">Active Hedging Strategies</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Ticker</th>
              <th className="px-6 py-4 font-medium">Strategy</th>
              <th className="px-6 py-4 font-medium">Entry</th>
              <th className="px-6 py-4 font-medium">Current</th>
              <th className="px-6 py-4 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <PositionRow ticker="SPY" strategy="Iron Condor" entry={445.20} current={448.10} pnl={+1250} />
            <PositionRow ticker="NVDA" strategy="Long Call Vertical" entry={480.00} current={492.50} pnl={+4500} />
            <PositionRow ticker="VIX" strategy="Hedge (Calls)" entry={14.50} current={13.80} pnl={-320} />
            <PositionRow ticker="TLT" strategy="Short Put" entry={92.00} current={92.40} pnl={+120} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SettingsModal = ({ onClose }: { onClose: () => void }) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('custom_logo_url');
    if (stored) setLogoUrl(stored);

    // PASTE EVENT LISTENER
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                setLogoUrl(event.target.result as string);
                setSaved(false);
              }
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleSave = () => {
    if (logoUrl.trim()) {
      localStorage.setItem('custom_logo_url', logoUrl.trim());
    } else {
      localStorage.removeItem('custom_logo_url');
    }
    setSaved(true);
    
    // Reload to apply changes globally
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleReset = () => {
    setLogoUrl('');
    localStorage.removeItem('custom_logo_url');
    window.location.reload();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoUrl(result);
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    if (!logoUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Lowered threshold to 220 to catch more "white" variations
        if (r > 220 && g > 220 && b > 220) {
          data[i + 3] = 0; // Alpha = 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setLogoUrl(canvas.toDataURL('image/png'));
      setSaved(false);
    };
  };

  const copyToClipboard = () => {
    if (!logoUrl) return;
    navigator.clipboard.writeText(logoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl z-[10000] max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-slate-800 rounded-lg text-gold-500">
            <ImageIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Appearance</h3>
            <p className="text-slate-400 text-sm">Customize your dashboard logo.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Preview Area */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-center gap-4 h-32 relative overflow-hidden group">
             {logoUrl ? (
               <img src={logoUrl} alt="Preview" className="h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
             ) : (
               <Logo className="text-gold-500 w-16 h-16" />
             )}
             <div className="absolute bottom-2 right-2 text-xs text-slate-600 bg-slate-900/80 px-2 py-1 rounded">Preview</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Upload Logo (or Paste Ctrl+V)
            </label>
            
            <div className="flex gap-2 mb-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept="image/*" 
                    className="hidden"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                    <Upload size={18} /> Upload
                </button>
                {logoUrl && (
                  <button 
                    onClick={handleRemoveBackground}
                    className="flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-400 py-3 px-3 rounded-lg transition-colors whitespace-nowrap"
                    title="Remove White Background"
                  >
                    <Wand2 size={18} /> <span className="text-xs font-semibold">Magic: Remove BG</span>
                  </button>
                )}
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-slate-900 px-2 text-slate-500">OR ENTER URL</span>
                </div>
            </div>

            <input
              type="text"
              value={logoUrl}
              onChange={(e) => { setLogoUrl(e.target.value); setSaved(false); }}
              placeholder="https://example.com/logo.png"
              className="w-full mt-3 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition-all ${
                saved 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-gold-500 hover:bg-gold-400 text-slate-900'
              }`}
            >
              {saved ? (
                <>
                  <RefreshCw className="animate-spin" size={18} /> Updating...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="px-4 py-3 border border-slate-700 text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
              title="Reset to default stethoscope"
            >
              Reset
            </button>
          </div>

          {/* Developer Tools for Copying Base64 */}
          {logoUrl && logoUrl.startsWith('data:') && (
            <div className="pt-4 mt-4 border-t border-slate-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Developer Mode</span>
               </div>
               <div className="bg-slate-950 p-3 rounded border border-slate-800">
                 <p className="text-xs text-slate-400 mb-2">
                   Want to hardcode this logo? Copy this string:
                 </p>
                 <button 
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded transition-colors border border-slate-700"
                 >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Base64 String'}
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- Subcomponents ---

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
    <span className="font-medium">{label}</span>
  </div>
);

const MetricCard = ({ title, value, change, isPositive, icon }: any) => (
  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
        {icon}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
        {change}
      </span>
    </div>
    <p className="text-slate-400 text-sm mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-white">{value}</h4>
  </div>
);

const PositionRow = ({ ticker, strategy, entry, current, pnl }: any) => {
  const isProfitable = pnl >= 0;
  return (
    <tr className="hover:bg-slate-900/50 transition-colors">
      <td className="px-6 py-4 font-bold text-white">{ticker}</td>
      <td className="px-6 py-4 text-slate-300">{strategy}</td>
      <td className="px-6 py-4 text-slate-400">${entry.toFixed(2)}</td>
      <td className="px-6 py-4 text-white">${current.toFixed(2)}</td>
      <td className={`px-6 py-4 text-right font-bold ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
        {pnl > 0 ? '+' : ''}{pnl.toLocaleString()}
      </td>
    </tr>
  );
};