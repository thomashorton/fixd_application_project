import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './index.css';
const API_KEY = "e0c10af9"; //API key for OMDB, limit of 1K requests per day. 
var rowCount = 0; 
class App extends Component {
  //state = {movies:[], currentMovie:""}
  constructor(props) {
    super(props);
    this.state = {currentMovie:'',
                  currentMovieData:{},
                  rows: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({currentMovie: event.target.value})
    //console.log(event.target.value);
  }
  handleSubmit = async event => {
    //this.setState({currentMovie:event.title})
    event.preventDefault();
    console.log(this.state.currentMovie);
    const newMovieData = await this.getMovieData(this.state.currentMovie);

    console.log(newMovieData)
  }
  addRow(rowVals) {
    this.setState((prev, props) => {
      rowCount+=1;
      return {rows:[...prev.rows, rowVals]};
    })
  }

  getMovieData(title) {
    let movieDataRequest = 'http://www.omdbapi.com/?t=' + title+ '&apikey='+API_KEY;
    let movieData = fetch(movieDataRequest)
      .then(res => res.json())
      .then((data)=> {
        this.setState({currentMovieData: data})
        let movieJSON = {title: data.Title, year: data.Year, runtime:data.Runtime, metascore: data.Metascore, imdb: data.imdbRating, director: data.Director, id: rowCount}
        console.log("DATA: ");
        console.log(data);
        console.log(movieJSON);
        if (data.Response === "False") {
          alert('Sorry, that film is not listed in OMDB. Check your spelling or search for another film!');
        } else {
          console.log("Adding to table now...")
          this.addRow(movieJSON);
        }
        //return movieJSON;
      }).catch(console.log("FINISHED SEARCHING FOR DATA. failed."));
    console.log("Promise for movie data: " + movieDataRequest);
    console.log("The movie data itself, will be an unfulfilled promise:")
    console.log(movieData);
  }
  deleteRow(rowNum) {
    console.log("Entering Delete Method");
    var rows = [...this.state.rows];
    const location = rows.findIndex(film=>film.id == rowNum);
    console.log("location IS : ")
    console.log(location);

    if(location == -1) {
      return;
    }
    var deleted= rows.splice(location, 1);
    console.log("DELETED ROW WITH: ")
    console.log(deleted)
    if(!deleted){
      rowCount-=1;
    }
    this.setState({rows})
  }
  render() {
    return (
      <div className="App">

        <div id="header-container">
          <header>
            <h1>My Movie List</h1>
          </header>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Add Film By Title: 
            <input type="text" value={this.state.currentMovie} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>

        <div style = {{maxWidth: '100%'}} id = 'movieTable'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Director</th>
                <th>Runtime</th>
                <th>Metacritic Score</th>
                <th>IMDb Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rows.map(row=> (
                <tr id = {row.id}>
                  <td>{row.title}</td>
                  <td>{row.year}</td>
                  <td>{row.director}</td>
                  <td>{row.runtime}</td> 
                  <td>{row.metascore}</td>
                  <td>{row.imdb}</td>
                  <td>
                    <Button variant="danger"
                      onClick={()=>this.deleteRow(row.id)}>Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      
      </div>
    );
  }
}

export default App;
/*
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
            data={this.state.movies}
            />

*/