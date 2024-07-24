import { createContext } from "react"
import { Points } from "./types"

export const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

export interface State {
  points:         Points
  progress:       number
  steps:          number
  updatePoints:   (points: Points) => void
  updateProgress: (progress: number) => void
  updateSteps:    (steps: number) => void
}

export const StateContext = createContext<State>({
  points:         DEFAULT_POINTS, 
  progress:       0,
  steps:          0,
  updatePoints:   () => null,
  updateProgress: () => null,
  updateSteps:    () => null,
})

export interface Settings {
  bezierEnabled:     boolean
  catmullEnabled:    boolean
  svgEnabled:        boolean
  markersEnabled:    boolean
  setBezierEnabled:  (enabled: boolean) => void
  setCatmullEnabled: (enabled: boolean) => void
  setSvgEnabled:     (enabled: boolean) => void
  setMarkersEnabled: (enabled: boolean) => void
}

export const SettingsContext = createContext<Settings>({
  bezierEnabled:     true,
  catmullEnabled:    true,
  svgEnabled:        true,
  markersEnabled:    true,
  setBezierEnabled:  () => null,
  setCatmullEnabled: () => null,
  setSvgEnabled:     () => null,
  setMarkersEnabled: () => null,
})
