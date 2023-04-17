import { Component } from 'react';

// import logo from './logo.svg';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.components';
import './App.css';


class App extends Component {
  
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: ''
    }; 
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json() )
    .then((users)=> this.setState(() => {
        return {monsters: users}
    }))
  }

  onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
            
    this.setState(() => {
      return {searchString}
    });
    // return this.state.monsters.filter(monster => monster.name.includes(event.target.value)); ---> cant return this, general practice is to use non modifying methods (if ur changing array just make a new one)
  }

  render() {

    const {monsters, searchString} = this.state;//initializing these variables
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchString));

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          className="search-box" 
          onChangeHandler={onSearchChange} 
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters}/>
        {/* {
          filteredMonsters.map((monster)=> {
            return <div key={monster.id}><h1>{monster.name}</h1></div>
          })
        } */}
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Hi {this.state.name.first} {this.state.name.last}, I work at {this.state.company}
      //     </p>
      //     <button onClick={() => {
      //       // for synchronous call, ideal way to write code: 
      //       this.setState(() => {
      //         return {
      //           name: {first: "Andrei", last:"Neaogie"}
      //         };
      //       }, ()=>{//callback (optional), runs after the function is done
      //         console.log(this.state);
      //       });
            
      //       //for asynchronous call:
      //       // this.setState({name: {first: "Andrei", last:"Neaogie"}});
      //     }}>
      //       Change Name
      //     </button>
      //   </header>
      // </div>
    );
  } 
}

export default App;
