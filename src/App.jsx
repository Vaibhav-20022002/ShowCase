import { useState, useEffect } from "react";
import fetchDataFromAPI from "./utils/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Error404 from "./pages/404/Error404";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
	const dispatch = useDispatch();
	const url = useSelector((state) => state.home.url);

	function testing() {
		fetchDataFromAPI("/movie/popular").then((res) => {
			console.log(res);
			dispatch(getApiConfiguration(res));
		});
	}

	useEffect(() => {
		testing();
	}, []);

	return (
		<Router>
			<Header />
			<Routes>
				<Route element={<Home />} path="/" />
				<Route element={<Details />} path="/:mediaType/:id" />
				<Route element={<SearchResult />} path="/search/:query" />
				<Route element={<Explore />} path="/explore/:mediaType" />
				<Route element={<Error404 />} path="*" />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
