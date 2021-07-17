import React, { useCallback, useEffect, useState } from "react";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { fetchGroupsetEmployees } from "./../../../../utils/http";
import { getQueryParamByName } from "./../../../../utils/helpers";
import Moment from "moment";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";

const groupsetEmpTableColumns = [
  { name: "First Name", value: (row) => row.firstName, width: 300 },
  { name: "Last Name", value: (row) => row.lastName, width: 300 },
  { name: "Email", value: (row) => row.email, width: 300 },
  { name: "Gender", value: (row) => row.gender, width: 100 },
  { name: "DOB", value: (row) => row.datOfBirth, width: 200 },
  {
    name: "Start Date",
    value: (row) => Moment(row.employmentStartDate).format("DD MMM YYYY"),
    width: 200,
  },
];

const GroupsetEmployees = ({ classes }) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = () => {
    const payload = {
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
      groupsetId: getQueryParamByName("groupId"),
    };
    setIsLoadingList(true);
    setEmployeeList([]);
    fetchGroupsetEmployees(payload)
      .then((response) => {
        setIsLoadingList(false);
        setEmployeeList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        console.log("Error in fetching groupset employess", error);
      });
  };

  const toolbar = useCallback(() => {
    return <ListTableToolbar title="Groupset Employee List" />;
  }, []);

  return (
    <div className={classes.adminWrapper}>
      {!isLoadingList && employeeList.length > 0 && (
        <Table
          cols={groupsetEmpTableColumns}
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

export default withStyles(styles, { withTheme: true })(GroupsetEmployees);
