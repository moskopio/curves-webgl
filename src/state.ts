import { createContext, useMemo, useState } from "react"
import { Points } from "./types"

export const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

interface AppState {
  points:         Points 
  progress:       number
  steps:          number
  weight:         number
  updatePoints:   (_: Points) => void
  updateProgress: (_: number) => void
  updateSteps:    (_: number) => void
  updateWeight:   (_: number) => void
}

export const StateContext = createContext<AppState>({
  points:         DEFAULT_POINTS, 
  progress:       0,
  steps:          0,
  weight:         0,
  updatePoints:   (_: Points) => {},
  updateProgress: (_: number) => {},
  updateSteps:    (_: number) => {},
  updateWeight:   (_: number) => {},
})

export function useAppState(): AppState {
  const [points,   updatePoints]   = useState(DEFAULT_POINTS)
  const [steps,    updateSteps]    = useState(10)
  const [progress, updateProgress] = useState(1)
  const [weight,   updateWeight]   = useState(0)
  
  return useMemo(() => ({
    points,   updatePoints,
    steps,    updateSteps,
    progress, updateProgress,
    weight,   updateWeight
  }), [points, steps, progress, weight])
}

interface SettingsState {
  bezierEnabled:     boolean
  catmullEnabled:    boolean
  bSplineEnabled:    boolean
  svgEnabled:        boolean
  markersEnabled:    boolean
  setBezierEnabled:  (_: boolean) => void
  setCatmullEnabled: (_: boolean) => void
  setBSplineEnabled: (_: boolean) => void
  setSvgEnabled:     (_: boolean) => void
  setMarkersEnabled: (_: boolean) => void
}

export const SettingsContext = createContext<SettingsState>({
  bezierEnabled:     true,
  catmullEnabled:    true,
  bSplineEnabled:    true,
  svgEnabled:        true,
  markersEnabled:    true,
  setBezierEnabled:  (_: boolean) => {},
  setCatmullEnabled: (_: boolean) => {},
  setBSplineEnabled: (_: boolean) => {},
  setSvgEnabled:     (_: boolean) => {},
  setMarkersEnabled: (_: boolean) => {},
})

export function useSettingsState(): SettingsState {
  const [ bezierEnabled,  setBezierEnabled] = useState(true)
  const [catmullEnabled, setCatmullEnabled] = useState(true)
  const [bSplineEnabled, setBSplineEnabled] = useState(false)
  
  const [svgEnabled, setSvgEnabled] = useState(false)
  const [markersEnabled, setMarkersEnabled] = useState(true)
  
  return useMemo(() => ({
    bezierEnabled,  setBezierEnabled,
    catmullEnabled, setCatmullEnabled,
    bSplineEnabled, setBSplineEnabled,
    svgEnabled,     setSvgEnabled,
    markersEnabled, setMarkersEnabled
  }), [bezierEnabled, catmullEnabled, bSplineEnabled, svgEnabled, markersEnabled])
}
