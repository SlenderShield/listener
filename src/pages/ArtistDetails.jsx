import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
const ArtistDetails = () => {
	const dispatch = useDispatch();
	const { id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);

	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error,
	} = useGetArtistDetailsQuery(artistId);
	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};
	if (isFetchingArtistDetails) return <Loader title="Searching song Details" />;

	if (error) return <Error />;

	return (
		<div className="flex-col flex">
			<DetailsHeader artistId={artistId} artistData={artistData} />

			<RelatedSongs
				data={Object.values(artistData?.songs)}
				isPlaying={isPlaying}
				activeSong={activeSong}
				artistId={artistId}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
			/>
		</div>
	);
};
export default ArtistDetails;
