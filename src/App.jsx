import './App.css';
import TableOptions from './components/TableOptions/tableOptions';
import TableCountries from './components/TableCountries/tableCountries';
import { useState } from 'react';
import debounce from 'debounce';

function App() {
	const [countriesCount, setCountriesCount] = useState(0);
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = (value) => {
		setSearchInput(value);
	};

	const debouncedHandleSearch = debounce(handleSearch, 1500);

  return (
	<div className="App">
		<div className="w-full flex flex-row justify-between mb-7">
			<p className="text-16-semibold">Found {countriesCount} countries</p>
			<input
				type="search"
				id="search"
				className="input-search"
				placeholder="Search by Name, Region, Subregion"
				onChange={(e) => debouncedHandleSearch(e.target.value)}
			/>
	  </div>

	  <div className="w-full flex flex-row gap-8">
				<TableOptions />
				<TableCountries setCountriesCount={setCountriesCount} searchInput={searchInput} />
	  </div>
	</div>
  );
}

export default App;


/*
	TODOS:
	- Filtro sort by OK
	- Filtro Region OK
	- Filtro Status OK
	- countriesCount OK
	- Input Search logica 
	- Pagina detallles 
	- Gaps en la tabla 

*/