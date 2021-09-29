import { useState } from 'react';

import { ReactComponent as ArrowIcon} from '../assets/images/icon-arrow.svg';

export default function Form({ onSubmit }) { 
  const [ input, setInput ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(input);
  }

  return (
    <form className="ip-input-form" onSubmit={handleSubmit}>
      <input 
        className="ip-input" 
        type="text"
        value={input}
        name="ip" 
        placeholder="Search for any IP address or domain" 
        pattern="^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$"
        required
        onChange={(e) => {setInput(e.target.value)}}
      />
      <button className="btn btn-submit">
        <ArrowIcon />
      </button>
    </form>
  );
}