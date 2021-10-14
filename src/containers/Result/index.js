import Map from '../Map';
import TextResults from './TextResults';

export default function Results({ ipInfo }) {
  return (
    <div className="results">
      <div className="container">
        {
          // ipInfo.textInfo &&
          // <TextResults textInfo={ipInfo.textInfo}/>
        }
        <TextResults textInfo={ipInfo.textInfo}/>
      </div>
      {
        // ipInfo.coordinates &&
        // <Map coordinates={ipInfo.coordinates}/>
      }
      <Map coordinates={ipInfo.coordinates}/>
    </div>
  );
}