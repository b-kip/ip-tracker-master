import { useState, useEffect, useReducer } from 'react';
import Results from './containers/Result';
import Form from './components/Form';

import fetchIpLocation from './api/fetchIpLocation';
import ipInfoReducer, { initialState } from './ipInfoReducer';

function App() {
  const [ip, setIp] = useState('');
  const [ipInfo, dispatchIpInfo] = useReducer(ipInfoReducer, initialState);


  useEffect(() => {
    async function fetch(){
      dispatchIpInfo({ type: 'IPINFO_FETCH_INIT'});

      try {
        const ipData = await fetchIpLocation(ip);

        dispatchIpInfo({ 
          type: 'IPINFO_FETCH_SUCCESS',
          payload: { ipData }
        });
      } catch (e) {
        dispatchIpInfo({
          type: 'IPINFO_FETCH_FAILURE',
          payload: { 
            error : { message: e.message }
          }
        });
      }
    };
    
    fetch();
  }, [ip]);

  function handleSubmit(value){
    setIp(value);
  }

  return (
    <main>
    <section className="page-intro ">
      <div className="container flow-content">
        <h1>IP Address Tracker</h1>
        <Form 
          input={ip}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
    <Results ipInfo={ipInfo}/>
  </main>
  );
}

export default App;
