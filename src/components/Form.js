import { useState } from 'react';
import { IpRegex, domainRegex } from '../api/fetchIpLocation';

import { ReactComponent as ArrowIcon} from '../assets/images/icon-arrow.svg';

export default function Form({ onSubmit }) { 
  const [ input, setInput ] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if ( isInputValid(input) ) {
      console.log("Valid input");
      setIsValid(true);
      onSubmit(input);
    } else {
      console.log("Invalid input");
      setIsValid(false);
    }
    // onSubmit(input);
  }

  function isInputValid(input) {
    return ( IpRegex.test(input) || domainRegex.test(input));
  }

  return (
    <div className="ip-input-form-container">
      <form className={`ip-input-form ${ !isValid ? 'error' : ''}`} onSubmit={handleSubmit}>
      {/* <form className={`ip-input-form`} onSubmit={handleSubmit}> */}
        <input 
          className="ip-input" 
          type="text"
          value={input}
          name="ip" 
          placeholder="Search for any IP address or domain"
          required
          onChange={(e) => {setInput(e.target.value)}}
        />
        <button type="submit" className="btn btn-submit">
          <ArrowIcon />
        </button>
      </form>
      {!isValid && (<p className="error-message">Input a valid IP Address or domain</p>)}
    </div>
  );
}