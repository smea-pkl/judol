import React, { useState } from 'react';
import { SlotBoard } from './components/SlotBoard';
import BetControl from './components/BetControl';
import { BalanceCard } from './components/BalanceCard';
import { StatsPanel } from './components/StatsPanel';

export const App = () => {
  // State Keuangan & Taruhan
  const [balance, setBalance] = useState(500000); // Saldo awal (contoh: 500rb)
  const [currentBet, setCurrentBet] = useState(10000); // Nominal taruhan aktif
  const [isSpinning, setIsSpinning] = useState(false);

  // State Statistik RTP & Analisis
  const [totalSpins, setTotalSpins] = useState(0);
  const [totalWagered, setTotalWagered] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [biggestWin, setBiggestWin] = useState(0);

  // Callback dipanggil saat 1 spin selesai di SlotBoard
  const handleSpinEnd = (betAmount: number, payoutAmount: number) => {
    // 1. Update Saldo (dikurangi taruhan, ditambah bayaran kemenangan)
    setBalance((prev) => prev - betAmount + payoutAmount);

    // 2. Update Statistik RTP
    setTotalSpins((prev) => prev + 1);
    setTotalWagered((prev) => prev + betAmount);
    setTotalPayout((prev) => prev + payoutAmount);

    if (payoutAmount > biggestWin) {
      setBiggestWin(payoutAmount);
    }

    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-6 text-amber-400 tracking-wide">
        🎰 Simulator Slot Machine
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full items-start justify-center">
        {/* Sisi Kiri: Mesin Slot, Saldo & Pilihan Bet */}
        <div className="flex flex-col gap-4 items-center w-full lg:w-auto">
          <BalanceCard balance={balance} />

          <SlotBoard
            currentBet={currentBet}
            balance={balance}
            isSpinning={isSpinning}
            setIsSpinning={setIsSpinning}
            onSpinEnd={handleSpinEnd}
          />

          <BetControl
            currentBet={currentBet}
            onBetChange={(newBet) => setCurrentBet(newBet)}
            disabled={isSpinning}
          />
        </div>

        {/* Sisi Kanan: Panel Statistik RTP & Loss Analytics */}
        <div className="w-full lg:w-auto flex justify-center">
          <StatsPanel
            totalSpins={totalSpins}
            totalWagered={totalWagered}
            totalPayout={totalPayout}
            biggestWin={biggestWin}
          />
        </div>
      </div>
    </div>
  );
};
export default App;