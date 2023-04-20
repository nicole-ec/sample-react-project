import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.components';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('render');

  useEffect(()=> {
    const newFilteredMonsters = monsters.filter((monster)=> {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters); 
  }, [monsters, searchField]);
 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json() )
    .then((users)=> setMonsters(users));
  }, []); // when the array changes, the callback function is run. if empty, only triggered once.
  
  const onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearchField(searchString);
    
  } 

  return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          className="search-box" 
          onChangeHandler={onSearchChange} 
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
    
}

export default App;
