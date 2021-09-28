export default function Form() { 
  return (
    <form className="ip-input-form">
      <input 
        className="ip-input" 
        type="text"
        name="ip" 
        placeholder="Search for any IP address or domain" 
        pattern="^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$"
        required
      />
      <button className="btn btn-submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
      </button>
    </form>
  );
}