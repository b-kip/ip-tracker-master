// import { useEffect } from 'react';
import Map from './containers/Map';

function App() {

  // useEffect(
  //   () => {
  //     import('./js/index');
  //   }
  // );

  return (
    <main>
    <section class="page-intro ">
      <div class="container flow-content">
        <h1>IP Address Tracker</h1>
        <form class="ip-input-form">
          <input 
            class="ip-input" 
            type="text"
            name="ip" 
            placeholder="Search for any IP address or domain" 
            pattern="^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$"
            required
          />
          <button class="btn btn-submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
          </button>
        </form>
      </div>
    </section>
    <div class="results">
      <div class="container">
        <div class="results__info-container">
          <div class="results__item results__ip-address  flow-content">
            <h3 class="results__item__title">IP Address</h3>
            <p class="results__item__value" id="js-ip">192.212.174.101</p>
          </div>
          <div class="results__item results__location flow-content">
            <h3 class="results__item__title">Location</h3>
            <p class="results__item__value" id="js-location">Brooklyn, NY 10001</p>
          </div>
          <div class="results__item results__timezones flow-content">
            <h3 class="results__item__title">Timezone</h3>
            <p class="results__item__value" id="js-timezone">UTC-05:00</p>
          </div>
          <div class="results__item results__isp flow-content">
            <h3 class="results__item__title">ISP</h3>
            <p class="results__item__value" id="js-isp">SpaceX Starlink</p>
          </div>
        </div>
      </div>
      {/* <div class="results__map" id="mapid"></div> */}
      <Map />
    </div>
  </main>
  );
}

export default App;
