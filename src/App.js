// import { useEffect } from 'react';
import Results from './containers/Result';
import Form from './components/Form';

function App() {
  return (
    <main>
    <section className="page-intro ">
      <div className="container flow-content">
        <h1>IP Address Tracker</h1>
        <Form />
      </div>
    </section>
    <Results />
  </main>
  );
}

export default App;
