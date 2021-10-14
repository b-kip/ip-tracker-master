import { useState, useEffect } from 'react';
import Results from './containers/Result';
import Form from './components/Form';

import fetchIpLocation from './api/fetchIpLocation';

function App() {
  const [ip, setIp] = useState('');
  const [ipInfo, setIpInfo] = useState({
    // coordinates: {lat: 37.38605, lng: -122.08385},
    coordinates: {lat: null, lng: null},
    textInfo: {
      location: '',
      timezone: '',
      isp: '',
      ip: ''
    }
    // textInfo: {
    //   location: 'California, Mountain View',
    //   timezone: 'UTC-07:00',
    //   isp: 'Google LLC',
    //   ip: '8.8.8.8'
    // }
  });

  var obj = '{"[Op.or]":1, "name": "Allan"}';
  console.log(JSON.parse(obj,  (key, value) => value));

  useEffect(() => {
    async function fetch(){
        // console.log('Should fetch');
        const ipData = await fetchIpLocation(ip);
        // console.log(ipData);
        setIpInfo(ipData);
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
