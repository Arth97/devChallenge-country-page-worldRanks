/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from 'react';
import './tableCountries.css';
import CountryRow from './CountryRow/countryRow';
import { TableOptionsContext } from '../../context/TableOptionsContext';

const TableCountries = ({setCountriesCount}) => {
	const [data, setData] = useState(null);
	const [sortedData, setSortedData] = useState(null);

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
		if (!sortCache.current[sort] && !data) return;

		if (sortCache.current[sort]) {
			setSortedData(sortCache.current[sort]);
			return;
		} else {
			let sortedData = []
			if (sort === 'population') {
        sortedData = [...data].sort((a, b) => b.population - a.population);
      } else if (sort === 'area') {
        sortedData = [...data].sort((a, b) => b.area - a.area);
      } else {
        sortedData = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
      }
      sortCache.current[sort] = sortedData;
			setSortedData(sortedData);
			setCountriesCount(sortedData.length);
		}
	},[data, sort]);

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
					{sortedData && sortedData.map((country, index) => (
						<CountryRow country={country} key={index} />
					))}
				</tbody>
			</table>
		</div>
  );
};

export default TableCountries;
