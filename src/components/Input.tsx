import React from 'react'


type GenericType = {
  id?: string
  className: string
  type: string
  placeholder?: string
  name?: string
  onChange?: (e: any) => void;
  value?: any
}
function Input(props: GenericType) {
  return (
    <div>
      <div className="mb-3">
        <input value={props.value} id={props.id} onChange={props.onChange} name={props.name} className={props.className} type={props.type} placeholder={props.placeholder} />
      </div>
    </div>
  )
}

export default Input