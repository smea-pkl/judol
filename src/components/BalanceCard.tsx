import React from 'react';
import { formatRupiah } from '../utils/formatters';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg w-full max-w-xs text-center">
      <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
        Saldo Saat Ini
      </span>
      <div className="text-2xl font-black text-amber-400">
        {formatRupiah ? formatRupiah(balance) : `Rp ${balance.toLocaleString('id-ID')}`}
      </div>
    </div>
  );
};