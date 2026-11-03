export interface GameState {
  balance: number;
  betAmount: number;
  totalSpins: number;
  isSpinning: boolean;
  history: number[];
}

export interface SlotBoardProps {
  betAmount: number;
  onSpinResult: (winAmount: number) => void;
  disabled: boolean;
}