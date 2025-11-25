import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, X } from 'lucide-react';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API check
    setTimeout(() => {
      // Hardcoded check for template demonstration
      // In a real app, this would verify against a backend
      if (code.trim().toUpperCase() === 'PICKY2025' || code.length > 5) { 
        onSuccess();
        onClose();
      } else {
        setError('Invalid invitation code. Access denied.');
      }
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Decorative header line */}
        <div className="h-1 w-full bg-gradient-to-r from-gold-600 via-yellow-400 to-gold-600" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-slate-800 rounded-full border border-slate-700">
              <Lock className="w-8 h-8 text-gold-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-2">Private Access</h2>
          <p className="text-center text-slate-400 mb-8 text-sm">
            This platform is exclusive to Picky Chips partners. Please enter your invitation code to proceed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Invitation Code"
                className="w-full bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all placeholder-slate-600 text-center tracking-widest font-mono uppercase"
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center font-medium bg-red-950/30 py-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold-600 to-yellow-500 hover:from-gold-500 hover:to-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Access Dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
