import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// Types
import { Group, User, UserSignUp, UserGroup } from "../data/types";

const useAuthentication = (): {
  user: User | null;
  preferredGroups: Group[] | null;
  userGroups: UserGroup[] | null;
  userOwnerGroups: Group[] | null;
  userAdminGroups: Group[] | null;
  register: (e: React.FormEvent<HTMLFormElement>, formData: UserSignUp) => void;
  login: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
  logout: () => void;
  updateUser: (user_id: number | undefined, userData: any) => void;
} => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [preferredGroups, setPreferredGroups] = useState<Group[] | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[] | null>(null);
  const [userOwnerGroups, setUserOwnerGroups] = useState<Group[] | null>(null);
  const [userAdminGroups, setUserAdminGroups] = useState<Group[] | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const groups = localStorage.getItem("preferredGroups");
    if (storedUser) {
      setUser(() => JSON.parse(storedUser));
    }
    if (groups) {
      setPreferredGroups(() => JSON.parse(groups));
    }
  }, []);

  useEffect(() => {
    user && getUserGroups(user?.ID);
    user && getUserOwnerGroups(user?.ID);
    user && getUserAdminGroups(user?.ID);
  }, [user]);

  const register = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: UserSignUp
  ) => {
    e.preventDefault();

    const {
      name,
      surname,
      username,
      email,
      password,
      confirmPassword,
      profile_image,
      birthdate,
      preferences,
    } = formData;
    try {
      const response = await axios.post("http://localhost:9000/register", {
        name,
        surname,
        username,
        email,
        password,
        profile_image,
        birthdate,
        preferences,
      });

      console.log("Registration successful:", response?.data);
      navigate("/signin");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);
      alert(error?.response?.data?.msg);
    }
  };

  const login = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });

      const { user, groups } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("preferredGroups", JSON.stringify(groups));

      navigate("/home");
    } catch (error: any) {
      console.error("Error occurred during login:", error);
      alert(error?.response?.data?.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("preferredGroups");

    navigate("/home");

    setUser(null);
    setPreferredGroups(null);
  };

  const getUserGroups = async (user_id: number | undefined) => {
    try {
      await axios
        .post(`http://localhost:9000/userGroups`, {
          user_id,
        })
        .then((res) => setUserGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserOwnerGroups = async (user_id: any) => {
    try {
      await axios
        .get(`http://localhost:9000/myOwnerGroups/${user_id}`)
        .then((res) => setUserOwnerGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserAdminGroups = async (user_id: any) => {
    try {
      await axios
        .get(`http://localhost:9000/myAdminGroups/${user_id}`)
        .then((res) => setUserAdminGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (user_id: number | undefined, userData: User) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/updateUser/${user_id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    user,
    preferredGroups,
    userGroups,
    userOwnerGroups,
    userAdminGroups,
    register,
    login,
    logout,
    updateUser,
  };
};

export default useAuthentication;
