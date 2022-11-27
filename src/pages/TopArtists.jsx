import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title="Loading top charts around you" />;
	if (error) return <Error />;

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-white text-left mt-4 mb-10 text-3xl">
				Top Artists
			</h2>
			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((track) => (
					<ArtistCard key={track.key} track={track} />
				))}
			</div>
		</div>
	);
};

export default TopArtists;
