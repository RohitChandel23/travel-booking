import './SearchDestination.css';
import { useState } from 'react';

interface SearchDestinationProps{
handleDestinationData: (value:string | null)=>void
}

function SearchDestination({handleDestinationData}:SearchDestinationProps ){
    const [searchDestination, setSearchDestination] = useState<string | null>(null);

    function handleChange(e:any){
            setSearchDestination(e.target.value);
            console.log(searchDestination)
    }

    function handleClick(){
        handleDestinationData(searchDestination);
    }

return(
    <div className='search-destination-wrapper'>
    <input type='text' onChange={(e)=>handleChange(e)}/>
    <button onClick={handleClick}>Search</button>
    </div>
)
}


export default SearchDestination;