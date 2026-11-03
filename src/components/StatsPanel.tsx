import React from 'react';

interface StatsPanelProps {
  totalSpins: number;
  totalWagered: number;
  totalPayout: number;
  biggestWin: number;
  theoreticalRTP?: number; // Contoh: 96.5% (RTP bawaan sistem)
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  totalSpins,
  totalWagered,
  totalPayout,
  biggestWin,
  theoreticalRTP = 96.5,
}) => {
  // Hitung RTP Aktual (Real-time)
  const actualRTP = totalWagered > 0 ? (totalPayout / totalWagered) * 100 : 0;
  
  // Hitung Net Profit / Loss
  const netProfit = totalPayout - totalWagered;
  const isProfit = netProfit >= 0;

  // Warna indikator RTP berdasarkan nilai aktual vs teoritis
  const getRTPColor = (rtp: number) => {
    if (rtp >= 100) return 'text-green-400';
    if (rtp >= theoreticalRTP) return 'text-emerald-400';
    if (rtp >= 80) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl border border-gray-800 shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2 text-center text-amber-400">
        📊 Analisis & Statistik RTP
      </h2>

      {/* Display RTP Utama */}
      <div className="text-center my-4 bg-gray-950 p-4 rounded-lg border border-gray-850">
        <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
          RTP Real-Time (Aktual)
        </span>
        <div className={`text-4xl font-extrabold ${getRTPColor(actualRTP)}`}>
          {actualRTP.toFixed(2)}%
        </div>
        <span className="text-xs text-gray-500 mt-1 block">
          Target RTP Sistem: {theoreticalRTP}%
        </span>
      </div>

      {/* Ringkasan Keuangan */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-400 block text-xs">Total Taruhan (Wagered)</span>
          <span className="font-semibold text-gray-200">
            Rp {totalWagered.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-400 block text-xs">Total Payout</span>
          <span className="font-semibold text-gray-200">
            Rp {totalPayout.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-400 block text-xs">Net Profit / Loss</span>
          <span className={`font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
            {isProfit ? '+' : ''}Rp {netProfit.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-gray-800/50 p-3 rounded-lg">
          <span className="text-gray-400 block text-xs">Kemenangan Terbesar</span>
          <span className="font-semibold text-amber-400">
            Rp {biggestWin.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Modul Analisa Kekalahan (House Edge Analysis) */}
      <div className="bg-red-950/30 border border-red-900/40 rounded-lg p-3 text-xs text-red-200">
        <div className="font-semibold mb-1 flex items-center gap-1 text-red-400">
          ⚠️ Ringkasan Ekspektasi Matematis (House Edge)
        </div>
        {totalSpins === 0 ? (
          <p className="text-gray-400">Belum ada data spin untuk dianalisis.</p>
        ) : (
          <p>
            Dari <span className="font-bold text-white">{totalSpins}</span> spin, akumulasi 
            kerugian matematis akibat House Edge ({ (100 - theoreticalRTP).toFixed(1) }%) 
            diperkirakan sebesar <span className="font-bold text-red-400">
              Rp { (totalWagered * ((100 - theoreticalRTP) / 100)).toLocaleString('id-ID') }
            </span>.
          </p>
        )}
      </div>
    </div>
  );
};