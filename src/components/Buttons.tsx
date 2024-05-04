import React from 'react'
type GenericType = {
  className?: string
  type: "submit" | "reset" | "button"
  id?: string
  toggle?: string
  target?: string
  haspopup?: any
  expanded?: any
  children?: React.ReactNode
  onClick?: (e: any) => void
}
function Buttons(props: GenericType) {
  return (
    <div className="demo-inline-spacing">
      <button onClick={props.onClick} type={props.type} className={props.className} data-bs-toggle={props.toggle}
        data-bs-target={props.target} aria-haspopup={props.haspopup} aria-expanded={props.expanded}>{props.children}
      </button>
    </div>


  )
}

export default Buttons