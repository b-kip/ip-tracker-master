import Map from '../Map';
import TextResults from './TextResults';

export default function Results() {
  return (
    <div className="results">
      <div className="container">
        <TextResults />
      </div>
      <Map />
    </div>
  );
}