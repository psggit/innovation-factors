import React, { useCallback, useEffect, useState } from "react";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { fetchGroupsetList } from "./../../../../utils/http";
import { styles } from "../../../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";
import GroupsetEmployees from "./../GroupsetEmployeeList";

const groupsetsTableColumns = [
  { name: "Id", width: 100 },
  { name: "Name", value: (row) => row.groupName, width: 300 },
  { name: "Description", value: (row) => row.groupDesc, width: 300 },
  { name: "Managers", value: (row) => row.managerList.join(", "), width: 300 },
];

const Groupsets = ({ classes, history }) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [groupsetList, setGroupsetList] = useState([]);
  const [employeeDetails, setMountEmployeeDetails] = useState(false);

  const mountEmployeeDetails = (row) => {
    history.push(`/admin${window.location.search}&groupId=${row.groupId}`);
    setMountEmployeeDetails(true);
  };

  const renderLink = (row) => {
    return (
      <p
        id={`link-${row.groupId}`}
        className={classes.link}
        onClick={() => mountEmployeeDetails(row)}
      >
        {row.groupId}
      </p>
    );
  };

  groupsetsTableColumns[0].render = renderLink;

  useEffect(() => {
    fetchGroupset();
  }, []);

  const fetchGroupset = () => {
    setIsLoadingList(true);
    setGroupsetList([]);
    fetchGroupsetList({})
      .then((response) => {
        setIsLoadingList(false);
        const modifiedResponse = response.data.map((groupset) => {
          groupset.managerList = groupset.manager.map(
            (manager) => `${manager.firstName} ${manager.lastName}`
          );
          return groupset;
        });

        setGroupsetList(modifiedResponse);
      })
      .catch((error) => {
        setIsLoadingList(false);
        console.log("Error in fetching groupsets", error);
      });
  };

  const toolbar = useCallback(() => {
    return <ListTableToolbar title={`Groupset List`} />;
  }, []);

  return (
    <>
      <div className={!employeeDetails ? classes.adminWrapper : ""}>
        {!isLoadingList && !employeeDetails && groupsetList.length > 0 && (
          <Table
            cols={groupsetsTableColumns}
            toolbar={toolbar}
            data={groupsetList}
            pageable={false}
            totalDataCount={groupsetList.length}
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
      {employeeDetails && <GroupsetEmployees />}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Groupsets);
