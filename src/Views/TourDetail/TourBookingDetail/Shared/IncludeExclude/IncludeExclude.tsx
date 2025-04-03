import './IncludeExclude.css';
function IncludeExclude(includedExcludedObj){  
    const includedItems= includedExcludedObj?.itemsObj?.includedItemsObj?.includedItems;
    const includedClassName= includedExcludedObj?.itemsObj?.includedItemsObj?.includedClassName;
    const excludedItems= includedExcludedObj?.itemsObj?.excludedItemsObj?.excludedItems;
    const excludedClassName= includedExcludedObj?.itemsObj?.excludedItemsObj?.excludedClassName;

    console.log(includedExcludedObj)
    console.log("yoyo",includedItems, includedClassName)
    console.log("gogo",excludedItems, excludedClassName)

return(
    <div className='include-exclude'>
        <div className='included-items-container'>
        <ul>
              {
            includedItems?.map((item)=>
            <li>{item}</li>
            )
            }  
        </ul>
        </div>

        <div className='excluded-items-container'>
        <ul>
              {
            excludedItems?.map((item)=>
            <li>{item}</li>
            )
            }  
        </ul>
        </div>


    </div>

)
}
export default IncludeExclude;