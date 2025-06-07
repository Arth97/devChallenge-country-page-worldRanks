/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import './tableCountries.css';
import CountryRow from './CountryRow/countryRow';
import { TableOptionsContext } from '../../context/TableOptionsContext';

const TableCountries = () => {
	const [data, setData] = useState(null);

	const { sort, regions, status  } = useContext(TableOptionsContext);

	useEffect(() => {
		fetchData()
	},[]);

	const fetchData = async () => {
		try {
			// console.log("sort", sort)
			// console.log(`https://restcountries.com/v3.1/all?sort=${sort}`)
			// const response = await fetch(`https://restcountries.com/v3.1/all?sort=${sort}`);
			const response = await fetch('https://restcountries.com/v3.1/all');
			const data = await response.json();
			setData(data)
			console.log('Fetched data:', data);
			return data 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
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
					{data && data.map((country, index) => (
						<CountryRow country={country} key={index} />
					))}
				</tbody>
			</table>
		</div>
  );
};

export default TableCountries;
