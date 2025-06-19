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
			<div className="w-full flex md:flex-row flex-col justify-between mb-7 gap-6">
				<p className="text-16-semibold md:self-center">Found {countriesCount} countries</p>
				<input
					type="search"
					id="search"
					className="text-14-medium input-search"
					placeholder="Search by Name, Region, Subregion"
					onChange={(e) => debouncedHandleSearch(e.target.value)}
				/>
			</div>

			<div className="w-full flex md:flex-row flex-col gap-6">
					<TableOptions />
					<TableCountries setCountriesCount={setCountriesCount} searchInput={searchInput} />
			</div>
		</div>
  );
}

export default App;
