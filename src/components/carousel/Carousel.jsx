import React, { useRef } from "react";
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import NoPoster from "../../assets/no-poster.png";

import "./carousel.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading }) => {
	const carouselContainer = useRef();
	const { url } = useSelector((state) => state.home);
	const navigate = useNavigate();

	const navigation = (direction) => {};

	const skeletonCard = () => {
		return (
			<div className="skeletonItem">
				<div className="posterBlock skeleton"></div>
				<div className="textBlock">
					<div className="title skeleton"></div>
					<div className="date skeleton"></div>
				</div>
			</div>
		);
	};

	return (
		<div className="carousel">
			<ContentWrapper>
				<BsFillArrowLeftCircleFill
					className="carouselLeftNav arrow"
					onClick={() => navigation("left")}
				/>
				<BsFillArrowRightCircleFill
					className="carouselRighttNav arrow"
					onClick={() => navigation("left")}
				/>

				{!loading ? (
					<div className="carouselItems">
						{data?.map((card) => {
							const posterURL = card.poster_path
								? url.poster + card.poster_path
								: NoPoster;

							return (
								<div key={card.id} className="carouselItem">
									<div className="posterBlock">
										<Img src={posterURL} />

										<CircleRating rating={card.vote_average.toFixed(1)} />

										<Genres data={card.genre_ids.slice(0, 2)} />
									</div>

									<div className="textBlock">
										<span className="title">{card.title || card.name}</span>

										<span className="date">
											{dayjs(card.release_date).format("MMM D, YYYY")}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="loadingSkeleton">
						{skeletonCard()}
						{skeletonCard()}
						{skeletonCard()}
						{skeletonCard()}
						{skeletonCard()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Carousel;
