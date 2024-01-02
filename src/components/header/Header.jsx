import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movie_logo.svg";

const Header = () => {
	const [show, setShow] = useState("top");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [searchQuery, setsearchQuery] = useState("");
	const [showSearch, setShowSearch] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const openMobileMenu = () => {
		setMobileMenu(true);
		setShowSearch(false);
	};

	const openSearch = () => {
		setMobileMenu(false);
		setShowSearch(true);
	};

	const searchQueryHandler = (event) => {
		if (event.key === "Enter" && searchQuery.length > 0) {
			navigate(`/search/${searchQuery}`);
			setTimeout(() => {
				setShowSearch(false);
			}, 1000);
		}
	};

	const navigationHandler = (type) => {
		if (type === "movie") {
			navigate("/explore/movie");
		} else if (type === "tv") {
			navigate("/explore/tv");
		}
		setMobileMenu(false);
	};

	return (
		<header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
			<ContentWrapper>
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				<ul className="menuItems">
					<li className="menuItem" onClick={() => navigationHandler("movie")}>
						Movies
					</li>
					<li className="menuItem" onClick={() => navigationHandler("tv")}>
						TV Shows
					</li>
					<li className="menuItem">
						<HiOutlineSearch onClick={openSearch} />
					</li>
				</ul>

				<div className="mobileMenuItems">
					<HiOutlineSearch onClick={openSearch} />
					{mobileMenu ? (
						<VscChromeClose onClick={() => setMobileMenu(false)} />
					) : (
						<SlMenu onClick={openMobileMenu} />
					)}
				</div>
			</ContentWrapper>
			{showSearch && (
				<div className="searchBar">
					<ContentWrapper>
						<div className="searchInput">
							<input
								type="text"
								placeholder="Search for a movie or tv show..."
								onKeyUp={searchQueryHandler}
								onChange={(event) => setsearchQuery(event.target.value)}
							/>
							<VscChromeClose onClick={() => setShowSearch(false)} />
						</div>
					</ContentWrapper>
				</div>
			)}
		</header>
	);
};

export default Header;
