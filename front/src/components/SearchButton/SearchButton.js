import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchButton.css'


export const SearchButton = ({displaySearchWindow, searchWindow}) => {


    function render () {
        if (displaySearchWindow === true) {
            searchWindow()
        }
    }

    return <button className='SearchBtn' onClick={() => render()}><FontAwesomeIcon className='SearchIcon' icon={faSearch} /></button>

}