import React, { useEffect, useState } from "react";
import Layout from "Components/Layout";
import { groupsetsData } from "./../../mockData";

const Groupsets = () => {
  const [groupsetsDataObj, setGroupsetsDataObj] = useState({});

  useEffect(() => {
    setGroupsetsDataObj(groupsetsData);
  }, []);

  return (
    <Layout>
      <div>Group sets</div>
    </Layout>
  );
};

export default Groupsets;
