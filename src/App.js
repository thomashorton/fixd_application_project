import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './index.css';
const API_KEY = "e0c10af9"; //API key for OMDB, limit of 1K requests per day. 

class App extends Component {
  render() {
    return (
      <div className="App">
      <div id="header-container">
        <header>
          <h1>My Movie List</h1>
        </header>
      </div>
        
        <div style = {{maxWidth: '100%'}}>
          <MaterialTable
            title= "My Saved Movies"
            columns = {[
              {title: 'Title', field: 'title'},
              {title: 'Release Year', field: 'year'},
              {title: 'Runtime',field: 'runtime'},
              {tile: 'Director', field: 'director'},
              {title: 'Metascore', field:"metascore"},
              {title: 'IMDb Rating', field:'imdb'}
            ]}
            data={[{title: 'No Country for Old  Men', year:'2008', runtime:'159', director:'Coen Bros', metascore:'89', imdb:'8.9'}, 
                   {title: 'Fargo', year:'2007', runtime:'160', director:'Coen Bros', metascore:'81', imdb:'9.0'}]}
            />
        </div>
      </div>
    );
  }
}

export default App;
