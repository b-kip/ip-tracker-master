import { useState, useEffect } from 'react';
import Results from './containers/Result';
import Form from './components/Form';

import fetchIpLocation from './api/fetchIpLocation';

function App() {
  const [ip, setIp] = useState('');
  const [ipInfo, setIpInfo] = useState({
    data: {
      coordinates: {lat: null, lng: null},
      textInfo: {
        location: '',
        timezone: '',
        isp: '',
        ip: ''
      }
    },
    error: {
      isError: false,
      message: ""
    },
    isLoading: false,
  });


  useEffect(() => {
    async function fetch(){
        // console.log('Should fetch');
      try {
        setIpInfo({
          ...ipInfo,
          isLoading: true
        })
        const ipData = await fetchIpLocation(ip);
        // console.log(ipData);
        setIpInfo({
          ...ipInfo,
          data: ipData,
          error: {
            isError: false,
            message:""
          },
          isLoading: false
        });
      } catch (e) {
        setIpInfo(
          {
            data: {
              coordinates: {lat: null, lng: null},
              textInfo: {
                location: '',
                timezone: '',
                isp: '',
                ip: ''
              }
            },
            error: {
              isError: true,
              message: e.message
            },
            isLoading: false
          }
        )
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
