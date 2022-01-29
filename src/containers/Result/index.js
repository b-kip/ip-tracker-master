import Map from '../Map';
import TextResults from './TextResults';

export default function Results({ ipInfo }) {
  const { data, error, isLoading } = ipInfo;
  const { isError, message} = error;

  // console.log("Result container rendering");
  return (
    <div className="results">
      <div className="container">
        
          {
            isError
            ? (
              <div className="results__status-container">
                <div 
                  role="alert"
                  className="error-message text"
                >
                  {message}
                </div>
              </div>
            )
            : <TextResults textInfo={data.textInfo} isLoading={isLoading}/>
          }
      </div>
      <Map coordinates={data.coordinates} isLoading={isLoading} isError={isError}/>
    </div>
  );
}