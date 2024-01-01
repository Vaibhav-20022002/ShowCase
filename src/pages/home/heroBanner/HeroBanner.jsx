import React, { useEffect, useState } from "react";
import "./heroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
	const [backgroundImgURL, setbackgroundImgURL] = useState("");
	const [searchQuery, setsearchQuery] = useState("");
	const navigate = useNavigate();

	const { data, loading } = useFetch("/movie/upcoming");

	const { url } = useSelector((state) => state.home);

	// To show random images after every reload of HeroBanner page :
	useEffect(() => {
		const backgroungImage =
			url.backdrop +
			data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

		setbackgroundImgURL(backgroungImage);
	}, [data]);

	const searchQueryHandler = (event) => {
		if (event.key === "Enter" && searchQuery.length > 0) {
			navigate(`/search/${searchQuery}`);
		}
	};

	return (
		<div className="heroBanner">
			{!loading && (
				<div className="backdrop-img">
					<Img src={backgroundImgURL} />
				</div>
			)}

			<div className="opacity-layer"></div>

			<ContentWrapper>
				<div className="heroBannerContent">
					<span className="title">Welcome.</span>
					<span className="subTitle">
						Millions of movies, TV shows and people to discover. <br />
						Explore now.
					</span>

					<div className="searchInput">
						<input
							type="text"
							placeholder="Search for a movie or tv show..."
							onKeyUp={searchQueryHandler}
							onChange={(event) => setsearchQuery(event.target.value)}
						/>
						<button>Search</button>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
};

export default HeroBanner;
