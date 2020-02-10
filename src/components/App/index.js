import React from 'react';

import './app.sass';
import Picture from 'src/components/Picture';
import Form from 'src/containers/Form';


const App = () => {
  return (
    <div id="app">
      <Form />
      <Picture />
    </div>
  );
}

export default App;
