/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './countryDetail.css';
import { useParams } from 'react-router';

const CountryDetail = () => {
	const [country, setCountry] = useState(null);

	const {countryParam} = useParams();

	useEffect(() => {
		if (!countryParam) return;
		console.log("country", countryParam);
		fetchData()
	},[countryParam]);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.com/v3.1/name/${countryParam}?fullText=true`);
			const data = await response.json();
			setCountry(data[0]);
			console.log("data", data[0]);
			return data 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

  return (
    <div className="country-detail">
			<img	src={country?.flags?.svg} alt={country?.flags?.alt} width={50} height={40} />
			<h2>{country?.name.common}</h2>
			<p></p>
			<div className="country-data">

			</div>
			<div className="country-details">

			</div>
			<div className="country-neighbours">

			</div>
		</div>
  );
};

export default CountryDetail;