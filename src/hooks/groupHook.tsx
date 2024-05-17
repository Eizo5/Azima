import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Group } from "../data/types";

const useGroup = () => {
  const [group, setGroup] = useState({});
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const createGroup = async (groupData) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/createGroup",
        groupData
      );

      setGroup(() => response.data);

      navigate(`/GroupPage/${response.data.newGroup.group_id}`);
    } catch (error) {
      console.error("error");
    }
  };

  const getGroup = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroup/${group_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    const response = await axios.get("http://localhost:9000/getCategories");

    const transformedData = response?.data.map((item: any) => ({
      value: item.name,
      label: item.name,
      category_id: item.category_id,
    }));

    setCategories(transformedData);
  };

  const getGroupMembers = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroupMembers/${group_id}`
      );
      return response.data;
    } catch (error) {
      console.error("404 Group Member couldn't be fetched");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const banMember = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/banMember`, {
        group_id: groupID,
        user_id: userID,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const removeBan = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/removeBan`, {
        group_id: groupID,
        user_id: userID,
      });

      return response.data;
    } catch (error) {
      console.error("404 Failed to remove ban");
    }
  };

  const getBannedMembers = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/BannedMembers/${group_id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    group,
    categories,
    createGroup,
    getGroup,
    getGroupMembers,
    banMember,
    getBannedMembers,
    removeBan,
  };
};

export default useGroup;
