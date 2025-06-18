/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from 'react';
import './tableCountries.css';
import CountryRow from './CountryRow/countryRow';
import { TableOptionsContext } from '../../context/TableOptionsContext';

const TableCountries = ({setCountriesCount, searchInput}) => {
	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 15;
	const paginatedData = filteredData
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

	const { sort, regions, status  } = useContext(TableOptionsContext);

	const sortCache = useRef({})

	useEffect(() => {
		fetchData()
	},[]);

	const fetchData = async () => {
		try {
			const response = await fetch('https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,area,region,subregion,independent,unMember');
			const data = await response.json();
			setData(data)
			sortCache.current = {};
			return data 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

	useEffect(() => {
		sortData();
	},[data, sort]);

	useEffect(() => {
		filterByRegions();
	},[regions, status]);

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
        sortedData = [...data].sort((a, b) => a.name.common.localeCompare(b.name.common));
      }
      sortCache.current[sort] = sortedData;
		}
		filterByRegions();
	}

	const filterByRegions = () => {
		if (!sortCache.current[sort] && !data) return;

		let dataAux = sortCache.current[sort] ? sortCache.current[sort] : data;

		let filteredData = [];
		if (regions.length === 0) {
			filteredData = dataAux.filter(country => {
				return (status.independent === country.independent && status.unMember === country.unMember)
			});
		} else {
			filteredData = dataAux.filter(country => {
				return (regions.includes(country.region) 
					&& (status.independent === country.independent) 
					&& (status.unMember === country.unMember));
			});
		}
		
		setFilteredData(filteredData);
		setCountriesCount(filteredData.length);

		if (searchInput!=="") searchByInput(filteredData);
	}

	const searchByInput = (filteredDataParam) => {
		let data = filteredDataParam || filteredData;
		if (!filteredData || (sortCache.current[sort] && searchInput === "")) {
			filterByRegions();
			return;
		}

		const lowerSearch = searchInput.toLowerCase();
		const searchedData = data.filter(country => {
			const name = country.name?.common?.toLowerCase() || '';
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
					<tr className="text-12-bold border-b">
						<th className="py-3 pr-10">Flag</th>
						<th className="py-3" style={{ maxWidth: '250px' }}>Name</th>
						<th className="py-3">Population</th>
						<th className="py-3">Area (km²)</th>
						<th className="py-3">Region</th>
					</tr>
				</thead>
				<tbody>
          {paginatedData && paginatedData.map((country, index) => (	
						<CountryRow country={country} key={index} />
          ))}
        </tbody>
			</table>
			<div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Página {currentPage} de {filteredData ? Math.ceil(filteredData.length / pageSize) : 1}</span>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              filteredData && p < Math.ceil(filteredData.length / pageSize) ? p + 1 : p
            )
          }
          disabled={filteredData && currentPage >= Math.ceil(filteredData.length / pageSize)}
        >
          Next
        </button>
      </div>
		</div>
  );
};

export default TableCountries;
