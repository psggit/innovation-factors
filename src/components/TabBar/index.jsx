import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const TabPanel = React.memo((props) => {
  const { children, activeTab, index, classname, ...other } = props;

  return (
    <React.Fragment>
      {activeTab === index && <div className={classname}>{children}</div>}
    </React.Fragment>
  );
});

const TabBar = React.memo((props) => {
  const { tabs, activeTab, handleTabChange, style } = props;

  const [popoverWidth, setPopoverWidth] = useState("");
  const classes = useStyles(popoverWidth)();

  const [component, setComponent] = useState(
    tabs.filter((item, index) => index === activeTab && item.icon === false)
      .length > 0
      ? tabs[activeTab].component
      : tabs[0].component
  );

  const handleComponent = (component) => {
    setComponent(component);
  };

  return (
    <div className={classes.tabContainer}>
      <Tabs
        onChange={handleTabChange}
        value={activeTab}
        style={style}
        classes={{
          root: classes.root,
          indicator: classes.customTabIndicator,
        }}
      >
        {props.tabs.map((item, index) => {
          return (
            !item.hide && (
              <Tab
                key={`tab-${index}`}
                label={item.name}
                classes={{ root: classes.tabRoot, wrapper: classes.Tab }}
                onClick={(e) => handleComponent(item.component())}
              />
            )
          );
        })}
      </Tabs>
      {tabs.map((item, index) => {
        return (
          <React.Fragment key={`tabs-${index}`}>
            <TabPanel
              index={index}
              activeTab={activeTab}
              key={`tabpanel-${index}`}
              classname={item.name.split(" ").join("-")}
            >
              <div style={{ width: "100%" }}>{component}</div>
            </TabPanel>
          </React.Fragment>
        );
      })}
    </div>
  );
});

TabBar.propTypes = {
  tabs: PropTypes.array,
  style: PropTypes.object,
  handleTabChange: PropTypes.func,
  activeTab: PropTypes.number,
};

const useStyles = (width) =>
  makeStyles((theme) => ({
    tabContainer: {
      width: "100%",
    },
    Tab: {
      flexDirection: "row-reverse",
      "& :first-child": {
        marginBottom: "0!important",
      },
    },
    popoverRoot: {
      width: width,
    },
    root: {
      display: "block",
      overflow: "unset",
      color: "#8c8b96",
      //marginLeft: 40,
      "& button": {
        padding: 16,
        "& span": {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      "& .Mui-selected": {
        color: "#005f9e",
      },
    },
    customTabIndicator: {
      backgroundColor: "#005f9e",
    },
    tabRoot: {
      textTransform: "none",
    },
  }));

export default TabBar;
