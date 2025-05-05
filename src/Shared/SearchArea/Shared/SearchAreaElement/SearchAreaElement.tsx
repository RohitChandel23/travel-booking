import './SearchAreaElement.css';

function SearchAreaElement(){
    return(
        <div className='searchArea-element-container'>
                <span className='cursive-text'>Destination</span>           
                <input type='text' placeholder="Where to go"></input>       
        </div>
    )
}
export default SearchAreaElement;