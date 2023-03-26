import React, { useEffect, useState } from "react";
import {  Route, Routes } from "react-router-dom";
import axios from "axios";

import NasaMap from "./NasaMap";

function App() {
	const [eventData, setEventData] = useState([]);

	useEffect(() => {
		const getNasaData = async () => {
			const res = await axios.get(
				"https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=100"
			);
			// console.log(res.data.events);
			let temp = [];
			temp = [];
			for (let i = 0; i < res.data.events.length; i++) {
				temp.push({
					title: res.data.events[i].title,
					longitude: res.data.events[i].geometries[0].coordinates[0],
					latitude: res.data.events[i].geometries[0].coordinates[1],
					categories: res.data.events[i].categories[0].title,
				});
			}
			setEventData([{}]);
			setEventData(temp);
			temp = [];
		};

		getNasaData();
	}, []);
	return (
		<>
			<Routes>
				<Route
					path="/nasamap"
					element={<NasaMap eventData={eventData} />}
				/>
			</Routes>
		</>
	);
}

export default App;
