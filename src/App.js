import React, { Component } from 'react';
import { Container} from 'reactstrap'; 
import './App.css';
import Header from './components/Header/Header';
import CsvFile from './Containers/CsvFile/CsvFile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container fluid className="py-2 px-4">
          <CsvFile />
        </Container>
      </div>
    );
  } 
}

export default App;
