import { Accessor } from 'solid-js';

export enum Screen {
  Home = 'Home',
  Questions = 'Questions',
  Final = 'Final',
}

export interface Question {
  imgUrl: string
  question: string
  options: string[]
  correctIndex: number
}

// app store
export interface AppState {
  screen: Accessor<Screen>
  heroes: Hero[]
}
export interface AppActions {
  setScreen: (screen: Screen) => void
  setHeroes: (heroes: Hero[]) => void
}

export interface AppContextState {
  state: AppState
  actions: AppActions
}

// Hero data
interface AbilitySpecialValue {
  name: string
  values_float: number[]
  is_percentage: boolean
  heading_loc: string
}
interface Ability {
  id: number
  name: string
  name_loc: string
  cast_ranges: number[]
  cast_points: number[]
  channel_times: number[]
  cooldowns: number[]
  durations: number[]
  damages: number[]
  mana_costs: number[]
  special_values: AbilitySpecialValue[]
}

export interface Hero {
  id: number
  name: string
  order_id: number
  name_loc: string
  str_base: number
  str_gain: number
  agi_base: number
  agi_gain: number
  int_base: number
  int_gain: number
  damage_min: number
  damage_max: number
  attack_rate: number
  attack_range: number
  projectile_speed: number
  armor: number
  magic_resistance: number
  movement_speed: number
  turn_rate: number
  max_health: number
  health_regen: number
  max_mana: number
  mana_regen: number
  abilities: Ability[]
}
