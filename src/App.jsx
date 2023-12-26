import { useState, useEffect } from "react";
import fetchDataFromAPI from "./utils/api";

function App() {
	function testing() {
		fetchDataFromAPI("/movie/popular").then((res) => {
			console.log(res);
		});
	}

	useEffect(() => {
		testing();
	}, []);

	return <div>App</div>;
}

export default App;
