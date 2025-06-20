import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TableOptionsProvider } from './context/TableOptionsContext';
import { BrowserRouter, Routes, Route } from "react-router";
import CountryDetail from './pages/CountryDetail/countryDetail';

const baseUrl = "/devChallenge-country-page-worldRanks"

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
			<BrowserRouter>
				<TableOptionsProvider>
					<Routes>				
						<Route path={`${baseUrl}/`} element={<App />} />
						<Route path={`${baseUrl}/countryDetail/:cca3`} element={<CountryDetail />} />
					</Routes>
				</TableOptionsProvider>
			</BrowserRouter>
    </React.StrictMode>
  );
}