export const formatRupiah = (amount: number): string => {
  // Jika amount bukan angka (NaN) atau undefined, kembalikan Rp 0
  const safeAmount = isNaN(amount) || amount === undefined ? 0 : amount;

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(safeAmount);
};