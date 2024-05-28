import "../Styles/NotificationDropDown.css";
import useAuthentication from "../hooks/userHook";

const NotificationDropDown = ({ imgUrl }) => {
  const { notifications } = useAuthentication();
  return (
    <div className="flex flex-col drop-down-profile">
      <div className="flex flex-col gap-4 ">
        {notifications?.map((notification) => (
          <div className="NotificationDropDown__item">
            {" "}
            <img src={imgUrl} alt="notification-img" />
            <p className="notification-message">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropDown;
