/* eslint @typescript-eslint/no-unused-vars: 0 */ 

import { createContext } from "react"
import { Points } from "./types"

export const DEFAULT_POINTS: Points = {
  p0: [50, 200],
  p1: [150, 300],
  p2: [350, 100],
  p3: [550, 200],
}

export const StateContext = createContext({
  points:         DEFAULT_POINTS, 
  progress:       0,
  steps:          0,
  updatePoints:   (_: Points) => {},
  updateProgress: (_: number) => {},
  updateSteps:    (_: number) => {},
})

export const SettingsContext = createContext({
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
