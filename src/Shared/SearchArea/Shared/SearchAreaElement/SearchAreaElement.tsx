import './SearchAreaElement.css';
// import FormElement from '../../../../../Shared/FormElement/FormElement';

function SearchAreaElement(){
    return(
        <div className='searchArea-element-container'>
                <span className='cursive-text'>Destination</span>           { /*text-heading, input-type, validation, placeholder*/ }
                <input type='text' placeholder="Where to go"></input>       {/* input */}
        </div>
    )
}
export default SearchAreaElement;