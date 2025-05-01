interface FilterCheckBoxProps{
    type: string,
    id: any,
    labelText: string,
    value: any,
    checked:boolean,
    onChange: (value:string)=>void,
}

function FilterCheckBox
({type, id, labelText, value, checked, onChange}:FilterCheckBoxProps){   
    return(
    <li>
        <input type={type} id={id} value={value} checked={checked} onChange={()=>onChange(value)}></input>{" "}
        <label htmlFor={id}>{labelText}</label>
    </li>

    )
}
export default FilterCheckBox
;