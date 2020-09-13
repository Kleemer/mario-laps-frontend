import { UserRace } from './user-race';

export interface Race {
  id: string;
  userRaces: UserRace[];
  withLap: boolean;
}
