import './App.css';
import TableOptions from './components/TableOptions/tableOptions';
import TableCountries from './components/TableCountries/tableCountries';

function App() {
  return (
    <div className="App">
			<div className="w-full flex flex-row justify-between mb-7">
				<p className="text-16-semibold">Found {/*countriesCount*/} countries</p>
				<input
          type="search"
          id="search"
          className="input-search"
          placeholder="Search by Name, Region, Subregion"
        />
      </div>

      <div className="w-full flex flex-row gap-8">
				<TableOptions />
				<TableCountries />
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