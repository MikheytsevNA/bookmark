import heart from "../../assets/heart.svg";
import { getLoginStatus } from "../../util/getLoginstatus";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { useThrottle } from "../../util/useTrottle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVolumeQuery } from "../../App/apiSlice";
import "./Detailed.css";

function isInFavorites(id: string) {
  const registrationObj = RegistrationHandler.getRegisteredUsers();
  if (!registrationObj) {
    return false;
  }
  const isInFavorites = registrationObj
    .find(
      (user: { favorites: string[]; email: string }) =>
        user.email === getLoginStatus(),
    )!
    .favorites.includes(id);
  return !isInFavorites ? false : true;
}

export function Component() {
  const params = useParams();
  const id = params.id!;
  const { data, isFetching, isSuccess } = useGetVolumeQuery(id);
  const loggedInEmail = getLoginStatus();

  const [favStatus, setFavStatus] = useState(isInFavorites(id));

  const throttledStatus = useThrottle(favStatus, 200);
  useEffect(() => {
    const favClickHandler = (favID: string) => {
      if (loggedInEmail) {
        RegistrationHandler.changeFavorites(loggedInEmail, favID);
      }
    };
    favClickHandler(id);
  }, [id, loggedInEmail, throttledStatus]);

  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <>
        {!data ? (
          <div>Что-то пошло не так</div>
        ) : (
          <div className="detailed-card">
            <img src={data.images.big} alt={data.title} />
            <img
              src={heart}
              className={`bookmark-heart-detailed ${throttledStatus ? "bg-info" : ""}`}
              onClick={() => setFavStatus((state: boolean) => !state)}
            ></img>
            <div className="d-flex justify-content-center">
              <div>
                <b>{data.author}</b>
                <p>{data.title}</p>
              </div>
            </div>
            <div>
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{content}</>;
}
