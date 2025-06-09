import React from 'react';
import './countryRow.css';

const CountryRow = ({country}) => {
  return (
    <>
      <tr>
				<td className="py-2"><img	src={country.flags.svg} alt={country.flags.alt} width={50} height={40} /></td>
				<td className="py-2 max-w-250" style={{ maxWidth: '250px' }}>{country?.name?.official}</td>
				<td className="py-2">{country?.population?.toLocaleString('es-ES')}</td>
				<td className="py-2">{country?.area?.toLocaleString('es-ES')}</td>
				<td className="py-2">{country?.region}</td>
			</tr>
    </>
  );
};

export default CountryRow;