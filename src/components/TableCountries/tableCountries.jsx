/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from 'react';
import './tableCountries.css';
import CountryRow from './CountryRow/countryRow';
import { TableOptionsContext } from '../../context/TableOptionsContext';

const TableCountries = ({setCountriesCount, searchInput}) => {
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);

	const { sort, regions, status  } = useContext(TableOptionsContext);

	const sortCache = useRef({})

	useEffect(() => {
		fetchData()
	},[]);

	const fetchData = async () => {
		try {
			// console.log("sort", sort)
			// console.log(`https://restcountries.com/v3.1/all?sort=${sort}`)
			// const response = await fetch(`https://restcountries.com/v3.1/all?sort=${sort}`);
			// const response = await fetch('https://restcountries.com/v3.1/all');
			const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,area,region');
			const data = await response.json();
			setData(data)
			sortCache.current = {};
			console.log('Fetched data:', data);
			return data 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

	useEffect(() => {
		sortData();
	},[data, sort]);

	useEffect(() => {
		filterRegions();
	},[regions]);

	useEffect(() => {
		searchByInput();
	},[searchInput]);

	const sortData = () => {
		if (!sortCache.current[sort] && !data) return;

		if (!sortCache.current[sort]) {
			let sortedData = []
			if (sort === 'population') {
        sortedData = [...data].sort((a, b) => b.population - a.population);
      } else if (sort === 'area') {
        sortedData = [...data].sort((a, b) => b.area - a.area);
      } else {
        sortedData = [...data].sort((a, b) => a.name.official.localeCompare(b.name.official));
      }
      sortCache.current[sort] = sortedData;
		}
		filterRegions();
	}

	const filterRegions = () => {
		if (!sortCache.current[sort] && !data) return;

		if (regions.length === 0) {
			setFilteredData(sortCache.current[sort]);
			return;
		}

		let filteredData = [];
		if(sortCache.current[sort]) {
			filteredData = sortCache.current[sort].filter(country => {
				return regions.includes(country.region);
			})
		} else {
			filteredData = data.filter(country => {
				return regions.includes(country.region);
			});
		}
		setFilteredData(filteredData);
		setCountriesCount(filteredData.length);
	}

	const searchByInput = () => {
		if (!filteredData || !searchInput) return;
		const lowerSearch = searchInput.toLowerCase();
		const searchedData = filteredData.filter(country => {
			const name = country.name?.official?.toLowerCase() || '';
			const region = country.region?.toLowerCase() || '';
			const subregion = country.subregion?.toLowerCase() || '';
			return (
				name.includes(lowerSearch) ||
				region.includes(lowerSearch) ||
				subregion.includes(lowerSearch)
			);
		});
		setFilteredData(searchedData);
		setCountriesCount(searchedData.length);
	}

  return (
		<div className="w-2/3">
			<table className="w-full text-left">
				<thead>
					<tr className="text-12-bold border-b border-[#6C727F]">
						<th className="py-3 pr-10">Flag</th>
						<th className="py-3" style={{ maxWidth: '250px' }}>Name</th>
						<th className="py-3">Population</th>
						<th className="py-3">Area (km²)</th>
						<th className="py-3">Region</th>
					</tr>
				</thead>
				<tbody>
					{filteredData && filteredData.map((country, index) => (
						<CountryRow country={country} key={index} />
					))}
				</tbody>
			</table>
		</div>
  );
};

export default TableCountries;
