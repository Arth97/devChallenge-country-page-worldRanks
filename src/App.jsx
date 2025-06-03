import './App.css';
import { useState } from 'react';

function App() {
	const [regionSelected, setRegionSelected] = useState([]);

	const toggleRegionSelected = (region) => {
		if (regionSelected.includes(region)) {
			setRegionSelected(regionSelected.filter(r => r !== region));
		} else {
			setRegionSelected([...regionSelected, region]);
		}
	}

  const isRegionSelected = (region) => {
    return regionSelected.includes(region);
  }

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

        {/* Left Column 1/3 */}
        <div className="w-1/3 flex flex-col gap-6">
          {/* Sort by */}
          <div>
            <label htmlFor="sort" className="text-12-bold block mb-2">Sort by</label>
            <input
              type="text"
              id="sort"
              className="input-sort"
              placeholder="Sort..."
            />
          </div>

          {/* Region */}
          <div>
            <label className="text-12-bold block mb-2">Region</label>
            <div className="flex flex-wrap gap-3">
              <button className={`region-tag text-12-medium ${isRegionSelected("Americas") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Americas")}>Americas</button>
							<button className={`region-tag text-12-medium ${isRegionSelected("Antartic") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Antartic")}>Antartic</button>
							<button className={`region-tag text-12-medium ${isRegionSelected("Africa") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Africa")}>Africa</button>
							<button className={`region-tag text-12-medium ${isRegionSelected("Asia") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Asia")}>Asia</button>
							<button className={`region-tag text-12-medium ${isRegionSelected("Europe") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Europe")}>Europe</button>
							<button className={`region-tag text-12-medium ${isRegionSelected("Oceania") ? " region-tag-selected" : ""}`} onClick={() => toggleRegionSelected("Oceania")}>Oceania</button>
						</div>
          </div>

          {/* Status */}
          <div>
            <label className="text-12-bold block mb-2">Status</label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center text-white text-12-medium">
                <input type="checkbox" className="status-checkbox accent-[#6C727F] mr-2" />
                lorem ipsum
              </label>
              <label className="text-12-bold">
                <input type="checkbox" className="status-checkbox accent-[#6C727F] mr-2" />
                lorem ipsum
              </label>
            </div>
          </div>
        </div>



        {/* Right Column 2/3 */}
        <div className="w-2/3">
          <table className="w-full text-left">
            <thead>
              <tr className="text-12-bold border-b border-[#6C727F]">
                <th className="py-3">Flag</th>
                <th className="py-3">Name</th>
                <th className="py-3">Population</th>
                <th className="py-3">Area (km²)</th>
                <th className="py-3">Region</th>
              </tr>
            </thead>
            <tbody>
              {/* Países */}
              <tr>
                <td className="py-2">🏳️</td>
                <td className="py-2">Country Name</td>
                <td className="py-2">123,456</td>
                <td className="py-2">789,000</td>
                <td className="py-2">Europe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
