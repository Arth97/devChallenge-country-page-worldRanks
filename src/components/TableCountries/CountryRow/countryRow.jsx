import React from 'react';
import './countryRow.css';
import { useNavigate } from 'react-router';

const CountryRow = ({country}) => {
	const navigate = useNavigate();

	function formatNumberShort(num) {
		if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
		if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
		return num?.toLocaleString('es-ES');
	}

  return (
    <>
      <tr className="h-16" onClick={() => navigate(`/countryDetail/${country.cca3}`)}>
				<td className="text-14-medium text-row md:p-2 p-1">
					<img className="flag-img" src={country.flags.svg} alt={country.flags.alt} width={50} height={40} />
				</td>
				<td className="text-14-medium text-row md:p-2 p-1 max-w-250" style={{ maxWidth: '250px' }}>{country?.name?.common}</td>
				<td className="text-14-medium text-row md:p-2 p-1">
					<span className="block sm:hidden">{formatNumberShort(country?.population)}</span>
					<span className="hidden sm:block">{country?.population?.toLocaleString('es-ES')}</span>
				</td>
				<td className="text-14-medium text-row md:p-2 p-1">
					<span className="block sm:hidden">{formatNumberShort(country?.area)}</span>
					<span className="hidden sm:block">{country?.area?.toLocaleString('es-ES')}</span>
				</td>
				<td className="text-14-medium text-row md:p-2 p-1">{country?.region}</td>
			</tr>
    </>
  );
};

export default CountryRow;