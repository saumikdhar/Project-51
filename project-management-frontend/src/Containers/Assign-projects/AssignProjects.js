import React from "react";
import { Tag } from "antd";
import "antd/lib/tag/style/index.css"
import classes from "./AssignProjects.module.css";
import "./index-2.css";

const AssignProjects = () => {
  const users = ["Saumik Dhar", "Dan Addis"];
  const colours = [
    "#ffc0cb", "#ff00ff", "#ff0000", "#108ee9","#f50",
    "#999999",  "#333399", "#407294", "#87d068", "#0000ff",
    "#912CEE", "#5ac18e", "#800000", "#81d8d0"
  ];

  const arrayOfUsers = users.map((user, index) => (
      <Tag color={colours[Math.round(Math.random() * colours.length) + 1]} closable="true" key={index}>{user}</Tag>
  ));
  return (
      <div className={classes.AssignProjects}>
        <h2> People assigned to this project</h2>
        {arrayOfUsers}
      </div>
  );
};

export default AssignProjects;