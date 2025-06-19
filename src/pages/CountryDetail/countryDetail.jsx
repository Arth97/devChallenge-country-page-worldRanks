/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './countryDetail.css';
import { useNavigate, useParams } from 'react-router';

const CountryDetail = () => {
	const [country, setCountry] = useState(null);
	const [neighbours, setNeighbours] = useState(null);

	const {cca3} = useParams();

	const navigate = useNavigate();
	const baseUrl = "/devChallenge-country-page-worldRanks"

	useEffect(() => {
		if (!cca3) return;
		fetchData()
	},[cca3]);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
			const data = await response.json();
			setCountry(data[0]);
			return; 
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}

	useEffect(() => {
		if (!country) return;
		fetchNeighbours()
	},[country]);

	const fetchNeighbours = async () => {
		const neigh = country?.borders;
		if (!neigh || neigh.length === 0) {
			setNeighbours([]);
			return;
		}
		try {
			const responses = await Promise.all(
				neigh.map(async(code) => {
					const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,cca3`);
					const data = await response.json();
					return data;
				})
			);
			setNeighbours(responses);
		} catch (err) {
			console.error('Error fetching neighbours:', err);
			setNeighbours([]);
		}
	}

  return (
    <div className="country-detail">
			<img className="img-detail" src={country?.flags?.svg} alt={country?.flags?.alt} width={260} height={195} />
			<h1 className="text-32-semibold mt-10">{country?.name.common}</h1>
			<p>{country?.name?.official}</p>
			<div className="country-data mt-10">
				<div className="data-tag title-text">Population | {country?.population?.toLocaleString('es-ES')}</div>
				<div className="data-tag title-text">Area (km²) | {country?.area?.toLocaleString('es-ES')}</div>
			</div>
			<div className="country-info-container mt-10">
				<div className="country-info">
					<p>Capital</p>
					<p>{country?.capital?.join(', ')}</p>
				</div>
				<div className="country-info">
					<p>Subregion</p>
					<p>{country?.subregion}</p>
				</div>
				<div className="country-info">
					<p>Language</p>
					<p>{country ? Object.values(country?.languages).join(', ') : ''}</p>
				</div>
				<div className="country-info">
					<p>Currencies</p>
					<p>{country ? Object.values(country?.currencies).map(currency => currency.name).join(', ') : ''}</p>
				</div>
				<div className="country-info">
					<p>{country?.continents}</p>
					<p>Continents</p>
				</div>
				<div className="country-info">
					<p>Neighbouring Countries</p>
				</div>
				<div className="country-neighbours">
					<div>
						{neighbours && neighbours.length > 0 ? 
							(
								<div className="neighbour-list">
									{neighbours.map((neighbour, index) => (
										<div className="neighbour" key={index} onClick={() => navigate(`${baseUrl}/countryDetail/${neighbour.cca3}`)}>
											<img src={neighbour.flags.svg} alt={neighbour.flags.alt} className="neighbour-img" width={80} height={60} />
											<p className="pt-1">{neighbour.name.common}</p>
										</div>
									))}
								</div>
							) : ''
						}
					</div>
				</div>
			</div>
		</div>
  );
};

export default CountryDetail;