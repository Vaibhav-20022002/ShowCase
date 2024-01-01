import { useEffect, useState } from "react";
import fetchDataFromAPI from "../utils/api";

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading("loading...");
		setData(null);
		setError(null);

		fetchDataFromAPI(url)
			.then((res) => {
				setLoading(false);
				setData(res);
			})
			.catch((error) => {
				setLoading(false);
				setError("Something went wrong...");
			});
	}, [url]);

	// return { data, loading, error };

	const JSON_Object = {
		data: data,
		loading: loading,
		error: error,
	};

	return JSON_Object;
};

export default useFetch;
