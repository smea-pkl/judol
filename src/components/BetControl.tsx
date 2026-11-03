import React from 'react';
import { formatRupiah } from '../utils/formatters';

interface BetControlProps {
  currentBet: number;
  onBetChange: (newBet: number) => void;
  disabled: boolean;
}

const BET_OPTIONS: number[] = [10000, 25000, 50000, 100000];

const BetControl: React.FC<BetControlProps> = ({ currentBet, onBetChange, disabled }) => {
  return (
    <div className="my-6">
      <p className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">
        Pilih Nominal Taruhan:
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {BET_OPTIONS.map((amount) => {
          const isSelected = currentBet === amount;
          return (
            <button
              key={amount}
              onClick={() => onBetChange(amount)}
              disabled={disabled}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/50 scale-105'
                  : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {formatRupiah(amount)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BetControl;