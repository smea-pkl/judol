import React, { useState } from 'react';

interface SlotBoardProps {
  currentBet: number;
  balance: number;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  onSpinEnd: (betAmount: number, payoutAmount: number) => void;
}

const SYMBOLS = ['7️⃣', '💎', '🔔', '🍋', '🍒'];

const calculateWinAmount = (symbols: string[], bet: number): number => {
  const [first, second, third] = symbols;

  if (first === second && second === third) {
    const multipliers: Record<string, number> = {
      '7️⃣': 10,
      '💎': 8,
      '🔔': 6,
      '🍋': 4,
      '🍒': 3,
    };

    return bet * multipliers[first] || 0;
  }

  if (first === second || second === third || first === third) {
    return bet * 2;
  }

  return 0;
};

export const SlotBoard: React.FC<SlotBoardProps> = ({
  currentBet,
  balance,
  isSpinning,
  setIsSpinning,
  onSpinEnd,
}) => {
  const [reels, setReels] = useState<string[]>(['7️⃣', '7️⃣', '7️⃣']);

  const handleStartSpin = () => {
    if (balance < currentBet) {
      alert("Saldo tidak cukup!");
      return;
    }

    setIsSpinning(true);

    // Acak simbol baru
    const newSymbols = [
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    ];

    // Simulasi waktu animasi slot (2 detik)
    setTimeout(() => {
      setReels(newSymbols);
      
      // Hitung hasil kemenangan
      const payout = calculateWinAmount(newSymbols, currentBet);
      
      // Kirim hasil ke App.tsx -> diteruskan ke StatsPanel
      onSpinEnd(currentBet, payout);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col items-center gap-6 shadow-xl">
      {/* Visual Tampilan Reel */}
      <div className="flex gap-4 bg-black p-4 rounded-xl border border-amber-500/30">
        {reels.map((symbol, index) => (
          <div
            key={index}
            className={`w-20 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl shadow-inner ${
              isSpinning ? 'animate-bounce' : ''
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Tombol Spin */}
      <button
        onClick={handleStartSpin}
        disabled={isSpinning}
        className={`px-8 py-3 rounded-xl font-extrabold text-lg text-slate-950 transition-all ${
          isSpinning
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 active:scale-95'
        }`}
      >
        {isSpinning ? 'MEMUTAR...' : 'SPIN 🎰'}
      </button>
    </div>
  );
};