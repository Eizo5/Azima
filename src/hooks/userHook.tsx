import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// Types
import { Group, User, UserSignUp } from "../data/types";

const useAuthentication = (): {
  user: User | null;
  preferredGroups: Group | null;
  register: (e: React.FormEvent<HTMLFormElement>, formData: UserSignUp) => void;
  login: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
  logout: () => void;
} => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [preferredGroups, setPreferredGroups] = useState<Group | null>(null);

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

  return { user, preferredGroups, register, login, logout };
};

export default useAuthentication;
