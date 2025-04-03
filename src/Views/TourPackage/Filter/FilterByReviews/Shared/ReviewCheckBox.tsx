interface ReviewCheckBoxProps{
    type: string,
    id: string,
    labelText: string,
    value: string,
}

function ReviewCheckBox({type, id, labelText, value}:ReviewCheckBoxProps){   
    return(
    <li>
        <input type={type} id={id} value={value}></input>
        <label htmlFor={id}>{labelText}</label>
    </li>

    )
}
export default ReviewCheckBox;