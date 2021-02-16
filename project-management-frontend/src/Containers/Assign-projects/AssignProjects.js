import React from "react";
import { Tag } from "antd";
import "antd/lib/tag/style/index.css"
import classes from "./AssignProjects.module.css";
import "./index-2.css";

const AssignProjects = () => {
  const users = ["Saumik Dhar", "Dan Addis"];

  const colourPicker = (rand) => {
    let colour = null;
    switch (rand) {
      case 0:
        colour = "#ffc0cb"; //pink
        break;
      case 1:
        colour = "#ff00ff"; // magenta
        break;
      case 2:
        colour = "#ff0000";//red
        break;
      case 3:
        // colour = "#108ee9" // geekblue;
        break;
      case 4:
        colour = "#f50";//orange
        break;
      case 5:
        colour = "#999999"; //dark grey
        break;
      case 6:
        colour = "#333399"; //reflex blue
        break;
      case 7:
        colour = "#407294";
        break;
      case 8:
        colour = "#87d068"; //green
        break;
      case 9:
        colour = "#0000ff"; //blue
        break;
      case 10:
        colour = "#912CEE"; // purple
        break;
      case 11:
        colour = "#5ac18e";
        break;
      case 12:
        colour = "#800000";
        break;
      case 13:
        colour = "#81d8d0";
        break;
      default:
        colour = "blue";
    }
    return colour;
  }

  const pickRandomColourHandler = () => {
    const rand = Math.round(Math.random() * 13) + 1;
    return colourPicker(rand);
  }

  const arrayOfUsers = users.map((user, index) => (
      <Tag color={pickRandomColourHandler()} closable="true" key={index}>{user}</Tag>
  ));
  return (
      <div className={classes.AssignProjects}>
        <h2> People assigned to this project</h2>
        {arrayOfUsers}
      </div>
  );
};

export default AssignProjects;