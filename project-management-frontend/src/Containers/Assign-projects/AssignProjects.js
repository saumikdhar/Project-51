import React, { useEffect, useState } from "react";
import { Tag, Table, Button } from "antd";
import "antd/lib/tag/style/css";
import "antd/lib/table/style/css";
import "antd/lib/button/style/css";
import classes from "./AssignProjects.module.css";
import "./index-2.css";

const AssignProjects = () => {

    const [loadingButton, setLoadingButton] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [users, setUsers] = useState(["Saumik Dhar", "Dan Addis"]);
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    const [colours, setColours] = useState([
      "#ffc0cb", "#ff00ff", "#ff0000", "#108ee9", "#f50",
      "#999999", "#333399", "#407294", "#87d068", "#0000ff",
      "#912CEE", "#5ac18e", "#800000", "#81d8d0"
    ]);

    const dataSource = [
      {
        key: "0",
        name: "Daniel D",
        role: "employee"
      },
      {
        key: "1",
        name: "Ben C",
        role: "employee"
      }
    ];
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role"
      }


    ];

    useEffect(() => {
      const listOfUsers = users.map((user, index) => (
        <Tag color={colours[Math.round(Math.random() * colours.length) + 1]} closable="true" key={index}>{user}</Tag>
      ));
      setArrayOfUsers(listOfUsers);
    }, [colours, users]);
    
    const start = (event) => {
        event.preventDefault();
        setLoadingButton(true);

        const oldUsers = [...arrayOfUsers];
        let updatedUsers = selectedRowKeys.map((user) => (
          <Tag color={colours[Math.round(Math.random() * colours.length) + 1]} closable="true"
               key={user}>{dataSource[user].name}</Tag>
        ));

        updatedUsers.unshift(oldUsers);
        setArrayOfUsers(updatedUsers);

        setSelectedRowKeys([]);
        setLoadingButton(false);
      }
    ;

    const onSelectChange = selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className={classes.AssignProjects}>
        <h2> People assigned to this project</h2>
        {arrayOfUsers}
        <Button shape="round" onClick={(e) => start(e)} type="primary" loading={loadingButton} disabled={!hasSelected}>Assign
          to
          Project</Button>
        <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns}
               pagination={{ position: ["bottomCenter"] }}/>
        {/*{console.log("rendering")}*/}
      </div>
    );
  }
;

export default AssignProjects;