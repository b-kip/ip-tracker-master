import Map from '../Map';
import TextResults from './TextResults';

export default function Results({ ipInfo }) {
  const { data, error, isLoading } = ipInfo;
  const { isError, message} = error;

  return (
    <div className="results">
      <div className="container">
        
          {
            isError
            ? (
              <div className="results__status-container">
                <p className="error-message text">{message}</p>
              </div>
            )
            : <TextResults textInfo={data.textInfo} isLoading={isLoading}/>
          }
      </div>
      <Map coordinates={data.coordinates} isLoading={isLoading}/>
    </div>
  );
}