import './App.css';
import TableOptions from './components/TableOptions/tableOptions';
import TableCountries from './components/TableCountries/tableCountries';
import { useState } from 'react';

function App() {
	const [countriesCount, setCountriesCount] = useState(0);
	
  return (
    <div className="App">
			<div className="w-full flex flex-row justify-between mb-7">
				<p className="text-16-semibold">Found {countriesCount} countries</p>
				<input
          type="search"
          id="search"
          className="input-search"
          placeholder="Search by Name, Region, Subregion"
        />
      </div>

      <div className="w-full flex flex-row gap-8">
				<TableOptions />
				<TableCountries setCountriesCount={setCountriesCount} />
      </div>
    </div>
  );
}

export default App;


/*
	TODOS:
	- Filtro sort by
	- Filtro Region
	- Filtro Status
	- countriesCount
	- Input Search logica
	- Pagina detallles
	- Gaps en la tabla

*/