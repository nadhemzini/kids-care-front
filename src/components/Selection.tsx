interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
  }
type MySelectProps ={
    options: Option[];
    className:string
    id?:string
  }
function Selection(props:MySelectProps) {
  return (
    <div>
    <div className="mb-3">
    <select  id={props.id} className={props.className} >
      {props.options.map(option => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
        </div>
    </div>
  )
}

export default Selection