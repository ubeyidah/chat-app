import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { authUser } = useContext(AuthContext);
  const { loading, logout } = useLogout();

  const logoutUser = async () => {
    await logout();
  };
  return (
    <header className="flex fixed top-0 left-[325px] right-0 h-[60px] items-center justify-between shadow-sm px-6 bg-white">
      <Button className="" color="white" size="sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Button>
      <div className="bg-gray-50 py-1 px-3 rounded-full border border-gray-200">
        <Menu>
          <MenuHandler>
            {/*<div className="cursor-pointer flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <Typography>@Jhon</Typography>
            </div> */}
            <div className="flex items-center h-full justify-center gap-2">
              <Avatar src={authUser.profilePic} size="sm" />
              <div>
                <p className="text-[14px]">{authUser.userName}</p>
                <p className="text-[12px]">{authUser.email}</p>
              </div>
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem className="flex gap-2" onClick={logoutUser}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              <Typography>{loading ? "loading..." : "Logout"}</Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
