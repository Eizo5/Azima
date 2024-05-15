const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

const sama = localStorage.getItem("user");
var user = sama && JSON.parse(sama);
const sama2 = localStorage.getItem("prefferedGroups");
const prefferedGroups = sama2 && JSON.parse(sama2);

const logout = () => {
  user = null;
};
export { PASSWORD_REGEX, user, prefferedGroups, logout };
