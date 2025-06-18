import React from 'react';
import './countryRow.css';
import { useNavigate } from 'react-router';

const CountryRow = ({country}) => {
	const navigate = useNavigate();

  return (
    <>
      <tr className="h-16" onClick={() => navigate(`/countryDetail/${country.cca3}`)}>
				<td className="py-2">
					<img	src={country.flags.svg} alt={country.flags.alt} width={50} height={40} />
				</td>
				<td className="py-2 max-w-250" style={{ maxWidth: '250px' }}>{country?.name?.common}</td>
				<td className="py-2">{country?.population?.toLocaleString('es-ES')}</td>
				<td className="py-2">{country?.area?.toLocaleString('es-ES')}</td>
				<td className="py-2">{country?.region}</td>
			</tr>
    </>
  );
};

export default CountryRow;