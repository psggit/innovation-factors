import React, { useState } from "react";
import Layout from "Components/Layout";
import PageTitle from "Components/PageTitle";
import TabBar from "Components/TabBar";
import Profile from "./Components/Profile";
import Company from "./Components/Company";
import Managers from "./Components/Managers";
import Employees from "./Components/Employees";

const Admin = ({ title, history }) => {
  const getUserPermission = () => {
    const USER_ROLE = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).userType
      : "";
    return USER_ROLE;
  };
  const tabOptions = [
    {
      name: "Profile",
      icon: false,
      component: () => <Profile />,
      hide: false,
    },
    {
      name: "Company",
      icon: false,
      component: () => <Company />,
      hide: false,
    },
    {
      name: "Managers",
      icon: false,
      component: () => <Managers history={history} activeTab={activeTab} />,
      hide: getUserPermission() === "manager" ? true : false,
    },
    {
      name: "Employees",
      icon: false,
      component: () => <Employees />,
      hide: false,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, activeTabIndex) => {
    setActiveTab(activeTabIndex);
    history.push(`/admin?activeTab=${activeTabIndex}`);
  };

  return (
    <Layout>
      <PageTitle title={title} />

      <TabBar
        handleTabChange={handleTabChange}
        //handleMenuChange={handleMenuChange}
        //selectedMenuItem={selectedMenuItem}
        tabs={tabOptions}
        style={{ marginTop: 0 }}
        activeTab={activeTab}
      />
    </Layout>
  );
};

export default Admin;
