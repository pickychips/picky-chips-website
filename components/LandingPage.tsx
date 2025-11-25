import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShieldCheck, Activity, BarChart3, Globe, Award, CheckCircle2, Settings, X, Image as ImageIcon, Upload, Save, RefreshCw, Check, Copy, Wand2 } from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
  onOpenInvite: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenInvite }) => {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  return (
    // REMOVED: h-screen, overflow-y-scroll, snap-y, snap-mandatory
    // CHANGED: h-screen to min-h-screen to allow natural document height
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 selection:bg-gold-500/30">
      {/* Logo Customization Modal - Uses Portal to ensure visibility */}
      {isLogoModalOpen && (
        <LogoCustomizerModal onClose={() => setIsLogoModalOpen(false)} />
      )}

      {/* Navigation */}
      <nav className="w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button 
            className="flex items-center gap-4 cursor-pointer group bg-transparent border-none p-0 outline-none"
            onClick={() => setIsLogoModalOpen(true)}
            title="Click to customize logo"
            type="button"
          >
            <div className="relative">
              {/* LOGO SIZE: Set to w-16 h-16 (64px) - Balanced Large Size */}
              <Logo className="text-gold-500 w-16 h-16 transition-transform group-hover:scale-110" />
              {/* Edit Hint */}
              <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-600 pointer-events-none">
                <Settings size={10} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Picky Chips <span className="text-gold-500">Investment</span>
            </span>
          </button>
          <button 
            onClick={onOpenInvite}
            className="px-6 py-2 text-sm font-semibold text-gold-400 border border-gold-500/30 rounded-full hover:bg-gold-500/10 transition-all"
          >
            Partner Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      {/* REMOVED: snap-start */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden -mt-24 pt-24">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80" 
            alt="Chicago Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/30 bg-gradient-to-b from-slate-950/80 via-slate-950/10 to-slate-950" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-2xl">
            Grow Wealth <span className="text-slate-300 font-medium italic">by</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-yellow-200 to-gold-600 pb-2 filter drop-shadow-lg">
              Superior Hedging
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg text-slate-200 mb-12 leading-relaxed drop-shadow-md font-medium">
            We leverage advanced derivative strategies to hedge positions, ensuring resilient portfolio growth in any market condition.
          </p>
        </div>
      </section>

      {/* Trading Philosophy & Principles Section */}
      {/* REMOVED: snap-start */}
      <section className="min-h-screen flex flex-col bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-wider mb-6 border border-gold-500/20">
                  Core Philosophy
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Disciplined Trading in a <br/>
                  <span className="text-slate-500">Chaotic Market.</span>
                </h2>
                
                <div className="text-lg text-slate-400">
                  <p>
                    At Picky Chips Investment, we do not gamble; we believe that the market is an efficient mechanism for transferring wealth from the impatient to the patient. Our philosophy is built on the bedrock of <strong className="text-gold-400">statistical arbitrage</strong>. We view every trade not as a bet, but as a piece of a larger, hedged portfolio designed to generate alpha regardless of market direction.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Activity className="text-gold-500" size={20} />
                  Guiding Principles
                </h3>
                
                <PrincipleCard 
                  title="Risk Asymmetry"
                  desc="We only engage in trades where the profit potential mathematically outweighs the maximum loss. If the skew isn't there, we don't trade."
                />
                <PrincipleCard 
                  title="Liquidity is King"
                  desc="We focus exclusively on highly liquid instruments. The ability to exit a position is just as important as the entry."
                />
                <PrincipleCard 
                  title="Emotionless Execution"
                  desc="Our strategies are defined by logic and executed with precision. FOMO and panic have no place in our terminal."
                />
                <PrincipleCard 
                  title="Compound Consistency"
                  desc="We aim for steady, compounded returns over volatile home runs. Longevity in the market is the ultimate indicator of success."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {/* REMOVED: snap-start */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 border-t border-slate-900/50">
        {/* Background Image - The Bean */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80" 
            alt="Cloud Gate Chicago" 
            className="w-full h-full object-cover"
          />
          {/* Reduced opacity from 85 to 40 to see the picture better */}
          <div className="absolute inset-0 bg-slate-950/40" /> 
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Our Advantage</h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"/>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 />}
              title="Equity & Derivatives"
              desc="Specialized trading in complex instruments across global markets."
              tooltip="We provide direct access to major global exchanges including NYSE, NASDAQ, HKEX, and comprehensive derivative markets on CME."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Risk Management"
              desc="Advanced hedging protocols to neutralize volatility and protect capital."
              tooltip="Our systems monitor real-time exposure, utilizing automated stop-losses and dynamic delta-gamma hedging to mitigate downside risk."
            />
            <FeatureCard 
              icon={<Award />}
              title="Rigorous Validation"
              desc="Our strategies undergo extensive historical backtesting and real-market execution to ensure resilience in unpredictable environments."
              tooltip="Every strategy is backtested over 10+ years of tick data, including stress tests during the 2008 and 2020 market crashes."
            />
          </div>
        </div>
      </section>

      {/* Global Trading Nodes (Map Section) */}
      {/* REMOVED: snap-start */}
      <section className="min-h-screen flex flex-col justify-between bg-slate-950 border-t border-slate-900">
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="max-w-7xl mx-auto px-6 w-full py-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
                Global Connectivity
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Click the city spot to login and join our community.
              </p>
            </div>

            <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
              {/* Map Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] ease-linear group-hover:scale-105"
                style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/2560px-The_earth_at_night.jpg")' }}
              >
                {/* Dark Overlay for better contrast */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-grayscale-[20%]" />
              </div>
              
              {/* Interactive Pins */}
              <MapPin top="27%" left="25.8%" city="Chicago" onClick={onOpenInvite} />
              <MapPin top="27.8%" left="82.2%" city="Beijing" onClick={onOpenInvite} labelPosition="left" />
              <MapPin top="26.7%" left="84.1%" city="Shenyang" onClick={onOpenInvite} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-8 z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2025 Picky Chips Investment LLC. All rights reserved.
            </div>
            <div className="flex gap-6 text-slate-500">
              <Globe size={20} className="hover:text-gold-500 cursor-pointer transition-colors" />
              <Activity size={20} className="hover:text-gold-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

// --- Logo Customizer Modal ---

const LogoCustomizerModal = ({ onClose }: { onClose: () => void }) => {
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
    // Reload to apply changes
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
        
        // Simple white threshold (if pixel is close to white, make transparent)
        if (r > 240 && g > 240 && b > 240) {
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

  // Render via Portal to ensure it sits on top of all other elements
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
            <h3 className="text-xl font-bold text-white">Site Appearance</h3>
            <p className="text-slate-400 text-sm">Customize the site logo.</p>
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
                    className="flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-400 py-3 px-3 rounded-lg transition-colors"
                    title="Remove White Background"
                  >
                    <Wand2 size={18} />
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
              title="Reset to default"
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

const FeatureCard = ({ icon, title, desc, tooltip }: { icon: React.ReactNode, title: string, desc: string, tooltip: string }) => (
  <div className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-gold-500/30 transition-colors shadow-lg">
    <div className="relative group/icon w-fit">
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-gold-500 mb-4 cursor-help transition-colors group-hover/icon:bg-slate-700 group-hover/icon:text-gold-400">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-950/95 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-2 group-hover/icon:translate-y-0">
        <p className="text-xs text-slate-300 text-center leading-relaxed">{tooltip}</p>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-slate-900/95 border-b border-r border-slate-700 rotate-45"></div>
      </div>
    </div>

    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-300 leading-relaxed">{desc}</p>
  </div>
);

const PrincipleCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="group p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-gold-500/50 transition-all hover:shadow-lg hover:shadow-gold-500/5">
    <h4 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-gold-400 transition-colors flex justify-between items-center">
      {title}
      <CheckCircle2 className="text-slate-700 group-hover:text-gold-500 transition-colors h-5 w-5" />
    </h4>
    <p className="text-slate-400 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

interface MapPinProps {
  top: string;
  left: string;
  city: string;
  onClick: () => void;
  labelPosition?: 'left' | 'right';
}

const MapPin = ({ top, left, city, onClick, labelPosition = 'right' }: MapPinProps) => (
  <div 
    className="absolute group/pin cursor-pointer"
    style={{ top, left }}
    onClick={onClick}
  >
    <div className="relative -translate-x-1/2 -translate-y-1/2">
      {/* Pulse Effect */}
      <div className="absolute -inset-4 bg-gold-500/20 rounded-full blur-lg opacity-0 group-hover/pin:opacity-100 transition-opacity duration-500" />
      
      {/* Main Dot with White Outline - Smaller */}
      <div className="w-2 h-2 bg-gold-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)] relative z-10 border border-white">
      </div>
      
      <div className="absolute inset-0 w-2 h-2 bg-gold-500 rounded-full animate-ping opacity-75" />
      
      {/* Label - Permanently Visible */}
      <div className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap z-20 ${labelPosition === 'left' ? 'right-4' : 'left-4'}`}>
        <span className="text-xs font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          {city}
        </span>
      </div>
      
      {/* Hover Tooltip (Login Portal) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/pin:translate-y-0 pointer-events-none z-20">
        <div className="bg-slate-900/95 border border-gold-500/30 text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-xl backdrop-blur-sm flex flex-col items-center gap-1">
          <span className="text-[10px] text-slate-300 uppercase tracking-wider">Access Node</span>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-slate-900/95 border-b border-r border-gold-500/30 rotate-45"></div>
      </div>
    </div>
  </div>
);