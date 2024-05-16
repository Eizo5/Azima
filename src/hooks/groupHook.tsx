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
      console.log(response.data);
      setGroup(() => response.data);
      navigate(`/GroupPage/${response.data.newGroup.group_id}`);
    } catch (error) {
      console.error("error");
    }
  };
  const getCategories = async () => {
    const response = await axios.get("http://localhost:9000/getCategories");

    const transformedData = response?.data.map((item) => ({
      value: item.name,
      label: item.name,
      category_id: item.category_id,
    }));

    setCategories(transformedData);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { group, categories, createGroup };
};
export default useGroup;
