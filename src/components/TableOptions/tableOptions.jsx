import './tableOptions.css';
import { TableOptionsContext } from '../../context/TableOptionsContext';
import { useContext, useEffect } from 'react';

const TableOptions = () => {

	const { sort, setSort, regions, setRegions, status, setStatus } = useContext(TableOptionsContext);

	const toggleRegionSelected = (region) => {
		if (regions.includes(region)) {
			setRegions(regions.filter(r => r !== region));
		} else {
			setRegions([...regions, region]);
		}
	}
  const isRegionSelected = (region) => {
    return regions.includes(region);
  }

  return (
		<div className="w-1/3 flex flex-col gap-6">
			{/* Sort by */}
			<div>
				<label htmlFor="sort" className="text-12-bold block mb-2">Sort by</label>
				<select name="Sort" id="sort" onChange={(e) => {setSort(e.target.value)}}>
					<option value="name">Name</option>
					<option value="population">Population</option>
					<option value="area">Area</option>
				</select>
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
					<label className="text-12-medium inline-flex items-center">
						<input type="checkbox" className="status-checkbox accent-[#6C727F] mr-2" />
						Member of the United Nations
					</label>
					<label className="text-12-medium inline-flex items-center">
						<input type="checkbox" className="status-checkbox accent-[#6C727F] mr-2" />
						Independent
					</label>
				</div>
			</div>
		</div>
  );
};

export default TableOptions;