import './IncludeExclude.css';
function IncludeExclude(includedExcludedObj:any){  
    const includedItems= includedExcludedObj?.itemsObj?.includedItemsObj?.includedItems;
    const includedClassName= includedExcludedObj?.itemsObj?.includedItemsObj?.includedClassName;
    const excludedItems= includedExcludedObj?.itemsObj?.excludedItemsObj?.excludedItems;
    const excludedClassName= includedExcludedObj?.itemsObj?.excludedItemsObj?.excludedClassName;

    console.log(includedExcludedObj)
return(
    <div className='include-exclude'>
        <div className='included-items-container'>
        <ul>
              {
            includedItems?.map((item:any)=>
            <li key={item}><i className={includedClassName}/> <span>{item}</span></li>
            )
            }  
        </ul>
        </div>

        <div className='excluded-items-container'>
        <ul>
              {
            excludedItems?.map((item:any)=>
            <li key={item}><i className={excludedClassName}/> <span>{item}</span></li>
            )
            }  
        </ul>
        </div>


    </div>

)
}
export default IncludeExclude;