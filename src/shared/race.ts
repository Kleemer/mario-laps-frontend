import { RaceType } from '@/types'

export const ANIMAL_CROSSING = {
  id: 'animal-crossing',
  name: 'Animal Crossing',
}

export const BIG_BLUE = {
  id: 'big-blue',
  name: 'Big Blue',
}

export const MOUNT_WARIO = {
  id: 'mount-wario',
  name: 'Descente Givrée',
}

export const BABY_PARK = {
  id: 'baby-park',
  name: 'Parc Baby',
}

export const RAINBOW_ROAD_WII_U = {
  id: 'rainbow-road-wii-u',
  name: 'Route Arc-En-Ciel',
}


export const RACE_TYPES: ReadonlyArray<RaceType> = Object.freeze(
  [
    ANIMAL_CROSSING,
    BIG_BLUE,
    MOUNT_WARIO,
    BABY_PARK,
    RAINBOW_ROAD_WII_U,
  ].map<Readonly<RaceType>>(Object.freeze),
)
