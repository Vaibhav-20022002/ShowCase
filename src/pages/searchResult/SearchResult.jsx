import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./searchResult.scss";
import fetchDataFromAPI from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
	const { query } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [pageNum, setPageNum] = useState(1);

	const fetchInitialData = () => {
		setLoading(true);

		fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
			(res) => {
				setData(res);
				setPageNum((prev) => prev + 1);
				setLoading(false);
			}
		);
	};

	const fetchNextPageData = () => {
		fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`).then(
			(response) => {
				// IF DATA ALREADY EXISTS :
				if (data?.results) {
					// ADD NEW NEXT PAGE DATA INTO IT :
					setData({
						...data,
						results: [...data?.results, ...response.results],
					});
				}
				// IF DATA IS NULL :
				else {
					setData(response);
				}

				setPageNum((prev) => prev + 1);
			}
		);
	};

	useEffect(() => {
		setPageNum(1);
		fetchInitialData();
	}, [query]);

	return (
		<div className="searchResultsPage">
			{loading && <Spinner initial={true} />}
			{!loading && (
				<ContentWrapper>
					{data?.results?.length > 0 ? (
						<>
							<div className="pageTitle">
								{`Search ${
									data?.total_results > 1 ? "results" : "result"
								} of "${query}"`}
							</div>

							<InfiniteScroll
								className="content"
								dataLength={data?.results?.length || []}
								next={fetchNextPageData}
								hasMore={pageNum <= data?.total_pages}
								loader={Spinner}
							>
								{data?.results.map((item, index) => {
									if (item.media_type === "person") return;

									return (
										<MovieCard data={item} key={index} fromSearch={true} />
									);
								})}
							</InfiniteScroll>
						</>
					) : (
						<span className="resultNotFound">Sorry, No Result Found !</span>
					)}
				</ContentWrapper>
			)}
		</div>
	);
};

export default SearchResult;
