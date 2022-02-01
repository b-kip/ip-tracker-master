import { useState, useEffect } from 'react';
import { IpRegex, domainRegex } from '../api/fetchIpLocation';

import { ReactComponent as ArrowIcon} from '../assets/images/icon-arrow.svg';

/**
 * Allows user to input ip address and domain, handles input validation and submission
 * @param {handleSubmit} onSubmit - The callback that updates ip address or domain
 */
export default function Form({ onSubmit }) { 
  const [ input, setInput ] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleInputChange(e) {
    setInput(e.target.value)
    if (!isValid) {
      setIsValid(true);
    }
  }

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

  // console.log("Form rendered");
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
          // required
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-submit" aria-label='Submit'>
          <ArrowIcon />
        </button>
      </form>
      {!isValid && (
        <p 
          className="error-message"
          role="alert"
        >
          Input a valid IP Address or domain
        </p>
      )}
    </div>
  );
}
