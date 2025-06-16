import React, { useEffect, useState } from 'react';
import './countryDetail.css';
import { useParams } from 'react-router';

const CountryDetail = () => {
	const [data, setData] = useState(null);

	const {country} = useParams();

	useEffect(() => {
		if (!country) return;
		console.log("country", country);
		fetchData()
	},[country]);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
			const data = await response.json();
			console.log("data", data);
			return data 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

  return (
    <div className="country-detail">
			<img src="" alt="" />
			<h2></h2>
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