import PropTypes from "prop-types";
import { useGetVolumeQuery } from "../../App/apiSlice";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { getLoginStatus } from "../../util/getLoginstatus";
import { useNavigate } from "react-router-dom";
import "./Favorite.css";
import { useState } from "react";

function Favorite({ item }: { item: string }) {
  const { data, isFetching, isSuccess } = useGetVolumeQuery(item);
  const [isDeleted, setIsDeleted] = useState(false);
  const loggedInEmail = getLoginStatus();
  const navigate = useNavigate();
  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <>
        {!data ? (
          <div>Что-то пошло не так</div>
        ) : (
          <li
            className={`fav-book-card  d-flex align-items-center ${isDeleted ? "fav-book-card_deleted" : ""}`}
            onClick={() => {
              RegistrationHandler.changeHistory(
                loggedInEmail!,
                `id:${data.id}`,
              );
              navigate(`/books/${data.id}`);
            }}
          >
            <img src={data.images.small} alt={data.title} className="m-2" />
            <div>
              <b>{data.author}</b>
              <p>{data.title}</p>
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary mx-2 rounded"
              id="delete-button"
              onClick={(event) => {
                event.stopPropagation();
                setIsDeleted((state: boolean) => !state);
                RegistrationHandler.changeFavorites(loggedInEmail!, item);
              }}
            >
              Delete
            </button>
          </li>
        )}
      </>
    );
  }
  return content;
}

Favorite.propTypes = {
  name: PropTypes.string,
};

export default Favorite;
