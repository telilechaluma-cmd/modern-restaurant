import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

interface TelebirrModalProps {
  amount: number;
  orderNumber: string;
  onSuccess: (referenceCode: string) => void;
  onCancel: () => void;
}

export const TelebirrModal: React.FC<TelebirrModalProps> = ({ 
  amount, 
  orderNumber, 
  onSuccess, 
  onCancel 
}) => {
  const { settings } = useRestaurant();
  const [refCode, setRefCode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const merchantCode = settings.telebirrMerchantId || '928471';

  const copyMerchant = () => {
    navigator.clipboard.writeText(merchantCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRef = refCode.trim().toUpperCase();

    if (!cleanRef) {
      setError('Please enter the Telebirr Transaction Confirmation / Reference Code received via SMS.');
      return;
    }

    if (cleanRef.length < 6) {
      setError('Telebirr transaction reference is too short. Please check the SMS receipt.');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification call to payment gateway
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(cleanRef);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div 
        onClick={onCancel}
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 z-10 animate-in zoom-in-95 duration-200 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#005cb9] text-white flex items-center justify-center font-bold text-lg shadow">
              tb
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-forest-950">telebirr Mobile Payment</h3>
              <p className="text-[11px] text-charcoal-500">Secure Ethiopian Birr Payment</p>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="p-1.5 text-charcoal-400 hover:text-charcoal-700 rounded-lg hover:bg-cream-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount to pay */}
        <div className="my-5 p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-center space-y-1">
          <span className="text-xs text-blue-800 font-semibold uppercase tracking-wider">Amount to Transfer</span>
          <div className="text-2xl font-black text-[#005cb9]">
            ETB {amount.toLocaleString()}
          </div>
          <p className="text-[11px] text-blue-700">For Order #{orderNumber}</p>
        </div>

        {/* Steps & QR simulation */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 p-3 bg-cream-50 rounded-2xl border border-cream-200">
          {/* Simulated QR */}
          <div className="w-24 h-24 bg-white p-2 rounded-xl border border-cream-300 flex-shrink-0 flex flex-col items-center justify-center shadow-inner">
            <div className="w-full h-full bg-[#005cb9]/10 rounded flex items-center justify-center text-center p-1">
              <span className="text-[9px] font-mono font-bold text-[#005cb9] leading-tight">
                telebirr QR<br />MERCHANT<br />{merchantCode}
              </span>
            </div>
          </div>
          <div className="text-xs text-charcoal-700">
            <p className="font-bold text-forest-950">Scan with Telebirr App</p>
            <p className="text-[11px] text-charcoal-500 mt-0.5">
              Open your Telebirr app, tap <strong>Scan QR</strong> or enter Merchant ID <strong>{merchantCode}</strong> manually.
            </p>
            <button
              type="button"
              onClick={() => setRefCode(`TB-${Math.floor(10000000 + Math.random() * 90000000)}`)}
              className="mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
            >
              ⚡ Auto-fill Sample SMS Code
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-xs text-charcoal-700 mb-5">
          <div className="flex items-start space-x-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
              1
            </div>
            <p>
              Open your <strong>Telebirr App</strong> or dial <strong>*127#</strong> on your phone.
            </p>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <p>Select <strong>"Pay Merchant"</strong> and enter Merchant ID:</p>
              <div className="mt-1 flex items-center justify-between p-2 bg-cream-100 border border-cream-300 rounded-xl">
                <span className="font-mono font-bold text-forest-950 text-sm tracking-widest">{merchantCode}</span>
                <button
                  type="button"
                  onClick={copyMerchant}
                  className="text-[11px] font-bold text-blue-700 flex items-center space-x-1 hover:underline"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[10px] text-charcoal-500 mt-1">Merchant Name: {settings.telebirrAccountName || 'TALILE RESTAURANT PLC'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold mt-0.5 flex-shrink-0">
              3
            </div>
            <p>
              Enter the exact amount <strong>ETB {amount.toLocaleString()}</strong>, confirm with your PIN, and copy the <strong>Transaction Reference Code</strong> from the Telebirr confirmation SMS.
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-forest-950 block mb-1">
              Enter Telebirr Transaction Reference / Code:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. TB-83921094 or 9283749"
                value={refCode}
                onChange={(e) => {
                  setRefCode(e.target.value);
                  setError('');
                }}
                className="w-full text-sm font-mono uppercase tracking-wider px-4 py-2.5 border-2 border-cream-300 rounded-xl focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {error}
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/3 py-2.5 text-xs font-bold text-charcoal-600 hover:bg-cream-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="flex-1 py-3 px-4 bg-[#005cb9] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying with Telebirr...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Telebirr Payment</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-[10px] text-center text-charcoal-400 mt-4 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
          Real-time payment confirmation verification
        </p>

      </div>
    </div>
  );
};
