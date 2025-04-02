import './SearchArea.css';
import SearchAreaElement from './Shared/SearchAreaElement/SearchAreaElement';
import Button from '../../../Components/Buttons/Button';

function SearchArea(){
    function handleClick(){
        console.log("start search......")
    }

return(
    <div className='search-area-container'>
        <SearchAreaElement />
        <SearchAreaElement />
        <SearchAreaElement />
        <SearchAreaElement />

        <span className='to-align-btn'>
        <Button name="Search" handleClick={handleClick}/>
        </span>
    </div>
)
}
export default SearchArea;