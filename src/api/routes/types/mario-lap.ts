import { RawRound } from './round'

export interface RawMarioLap {
  id: string;
  rounds: RawRound[] | null;
  created_at: Date;
}
