import React from 'react';
import List from './components/List';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {
    Header,
} from 'semantic-ui-react'

const style = {
    h1: {
        marginTop: '1em',
    }
}

function App() {
  return (
    <div className="App">
        <Header as='h1' content='Thelia modules' style={style.h1} textAlign='center' />
        <List/>
    </div>
  );
}

export default App;
