import React, { useCallback, useEffect, useState } from "react";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { fetchEmployees } from "./../../../../utils/http";
import { getQueryParamByName } from "./../../../../utils/helpers";
import Moment from "moment";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";

const empTableColumns = [
  { name: "Name", value: (row) => row.firstName, width: 300 },
  { name: "Email", value: (row) => row.email, width: 300 },
  { name: "Gender", value: (row) => row.gender, width: 100 },
  { name: "DOB", value: (row) => row.datOfBirth, width: 200 },
  {
    name: "Start Date",
    value: (row) => Moment(row.employmentStartDate).format("DD MMM YYYY"),
    width: 200,
  },
];

const Employees = ({ classes }) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = () => {
    const payload = {
      userId: getQueryParamByName("userId")
        ? getQueryParamByName("userId")
        : JSON.parse(localStorage.getItem("userInfo")).userId,
      userType:
        getQueryParamByName("userId") ||
        JSON.parse(localStorage.getItem("userInfo")).userType === "manager"
          ? "manager"
          : "admin",
    };
    setIsLoadingList(true);
    setEmployeeList([]);
    fetchEmployees(payload)
      .then((response) => {
        setIsLoadingList(false);
        setEmployeeList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        console.log("Error in fetching employess", error);
      });
  };

  const toolbar = useCallback(() => {
    return (
      <ListTableToolbar
        title={`${
          getQueryParamByName("userId")
            ? `Manager ${getQueryParamByName("name")} - Employee List`
            : "Employee List"
        }`}
      />
    );
  }, []);

  return (
    <div className={classes.adminWrapper}>
      {!isLoadingList && employeeList.length > 0 && (
        <Table
          cols={empTableColumns}
          toolbar={toolbar}
          data={employeeList}
          pageable={false}
          totalDataCount={employeeList.length}
        />
      )}
      {isLoadingList && (
        <Loader
          classname={classes.loaderStyle}
          isOpen={true}
          hasLoadingText={true}
          loadingText="Loading..."
        />
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Employees);
