import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongByCountryQuery(country);

	useEffect(() => {
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=at_LKrXAvNIPFWm2uCnJEfNIzql2M3BW`
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading) return <Loader title="Loading songs around you" />;
	if (error && country) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-white text-left mt-4 mb-10 text-3xl">
				Around You
				<span className="font-black"> {country}</span>
			</h2>
			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default AroundYou;