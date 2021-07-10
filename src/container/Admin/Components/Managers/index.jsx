import React, { useCallback, useEffect, useState } from "react";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { fetchManagers } from "./../../../../utils/http";
import Moment from "moment";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";
import Employees from "./../Employees";

const managersTableColumns = [
  { name: "Id", width: 100 },
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

const Managers = ({ classes, history }) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const [employeeDetails, setMountEmployeeDetails] = useState(false);

  const mountEmployeeDetails = (row) => {
    history.push(
      `/admin${window.location.search}&userId=${row.userId}&name=${row.firstName}`
    );
    setMountEmployeeDetails(true);
  };

  const renderLink = (row) => {
    return (
      <p
        id={`link-${row.userId}`}
        className={classes.link}
        onClick={() => mountEmployeeDetails(row)}
      >
        {row.userId}
      </p>
    );
  };

  managersTableColumns[0].render = renderLink;

  useEffect(() => {
    fetchManagerList();
  }, []);

  const fetchManagerList = () => {
    setIsLoadingList(true);
    setManagerList([]);
    fetchManagers({})
      .then((response) => {
        setIsLoadingList(false);
        setManagerList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        console.log("Error in fetching managers", error);
      });
  };

  const toolbar = useCallback(() => {
    return <ListTableToolbar title={`Manager List`} />;
  }, []);

  return (
    <>
      <div className={!employeeDetails ? classes.adminWrapper : ""}>
        {!isLoadingList && !employeeDetails && managerList.length > 0 && (
          <Table
            cols={managersTableColumns}
            toolbar={toolbar}
            data={managerList}
            pageable={false}
            totalDataCount={managerList.length}
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
      {employeeDetails && <Employees />}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Managers);
