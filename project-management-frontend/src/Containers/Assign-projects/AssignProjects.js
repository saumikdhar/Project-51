import React from "react";
import { Tag } from "antd";
import "antd/lib/tag/style/index.css"
import classes from "./AssignProjects.module.css";
import "./index-2.css";

const AssignProjects = () => {
  return (
      <div className={classes.AssignProjects}>
        <h2> People assigned to this project</h2>
        <Tag color="red" closable="true">Dan Addis</Tag>
        <Tag color="blue" closable="true">Saumik Dhar</Tag>
        <Tag color="green" closable="true">Amina Nessa</Tag>
      </div>
  );
};

export default AssignProjects;