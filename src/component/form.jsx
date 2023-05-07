import {  useState } from "react";
import { useDispatch } from "react-redux";

import { fetchword } from "../store/features/wordSlice";

function Form() {

    const [word, setWord] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
      event.preventDefault();
        dispatch(fetchword(word))
      }
     return (
        <form id="search-form" >
        <input
          id="search"
        
          type="text"
          placeholder="Search for any word.."
          onChange={(e) => {setWord(e.target.value)}}
        />

        <button type="submit" id="submit" onClick={handleSubmit}>
          <img src="./assets/images/icon-search.svg" alt="" />
        </button>
      </form>
     );
}

export default Form;