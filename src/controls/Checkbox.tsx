import { ReactElement, useCallback, useState } from "react";
import './Checkbox.css'

interface Props {
  label:     string
  onChange: (value: number) => void
  value:     boolean
}

export function Checkbox(props: Props): ReactElement {
  const { label, onChange } = props
  
  const [value, setValue] = useState(false)  
  const classes = `checkbox-box ${value && 'checked'}`
  const onClick = useCallback(() => setValue(!value), [value, setValue])
    
  return (
  <div className="checkbox" onClick={onClick} > 
    <div className={classes} />
    <div className="checkbox-label">{label}</div>
  </div>
  )
}
