import React from 'react';
import './countryRow.css';

const CountryRow = ({country}) => {
  return (
    <>
      <tr>
				{/*TODO: Set svg size*/}
				<td className="py-2"><img	src={country.flags.svg} alt={country.flags.alt} /></td>
				<td className="py-2">{country?.name?.official}</td>
				<td className="py-2">{country?.population}</td>
				<td className="py-2">{country?.area}</td>
				<td className="py-2">{country?.region}</td>
			</tr>
    </>
  );
};

export default CountryRow;