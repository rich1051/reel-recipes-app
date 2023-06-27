import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function DetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const detailsReducer = useSelector((store) => store.detailsReducer);
  const params = useParams();

  const handleClick = () => {
    history.push("/");
  };
  console.log(detailsReducer);
  useEffect(() => {
    dispatch({
      type: "FETCH_DETAILS",
      payload: params.imdbID,
    });
  }, []);
  console.log("imdbID IS:", params);
  return (
    <>
      <div className="details">
        <div key={detailsReducer.imdbID}>
          <h3 className="details-title">
            {detailsReducer.Title} ({detailsReducer.Year})
          </h3>
          <img
            className="details-image"
            src={detailsReducer.Poster}
            alt={detailsReducer.Title}
          />
          <p className="details-information">
            Rating: {detailsReducer.Rated}
            <br />
            Director(s): {detailsReducer.Director}
            <br />
            Cast: {detailsReducer.Actors}
          </p>
          <p className="details-description">
            Description: {detailsReducer.Plot}
          </p>
        </div>
        <br />
      </div>
      <button onClick={handleClick}>Back</button>
    </>
  );
}

export default DetailsPage;