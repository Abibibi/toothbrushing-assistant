import React from 'react';

import './app.sass';
import Picture from 'src/components/Picture';
import Form from 'src/containers/Form';
import Videos from 'src/containers/Videos';


const App = () => {
  return (
    <div id="app">
      <div id="content">
        <Form />
        <Videos />
      </div>
      <Picture />
    </div>
  );
}

export default App;
