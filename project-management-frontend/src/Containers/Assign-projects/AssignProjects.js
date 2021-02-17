import React, { useEffect, useState } from "react";
import { Tag, Table, Button, Input } from "antd";
import "antd/lib/tag/style/css";
import "antd/lib/table/style/css";
import "antd/lib/button/style/css";
import "antd/lib/input/style/css";
import classes from "./AssignProjects.module.css";
import "./index-2.css";

const AssignProjects = () => {
    const [loadingButton, setLoadingButton] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [users, setUsers] = useState([]);
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    const [colours, setColours] = useState([
      "#ffc0cb", "#ff00ff", "#ff0000", "#108ee9", "#f50",
      "#999999", "#333399", "#407294", "#87d068", "#0000ff",
      "#912CEE", "#5ac18e", "#800000", "#81d8d0"
    ]);
    const [dataSource] = useState([]);
    const [filterTable, setFilterTable] = useState([]);
    const { Search } = Input;
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
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      }
    ];

    useEffect(() => {
      for (let i = 0; i < 100; i++) {
        dataSource.push({
          key: i,
          name: `Dan ${i + 1}`,
          role: "employee",
          email: `Dan${i + 1}@Hafod.co.uk`
        });
      }
    }, [dataSource]);

    useEffect(() => {
      const listOfUsers = users.map((user, index) => (
        <Tag color={colours[Math.round(Math.random() * colours.length) + 1]} closable key={index}>{user}</Tag>
      ));
      setArrayOfUsers(listOfUsers);
    }, [colours, users]);

    const start = () => {
        setLoadingButton(true);
        const oldUsers = [...arrayOfUsers];
        let updatedUsers = selectedRowKeys.map((user) => (
          <Tag color={colours[Math.round(Math.random() * colours.length) + 1]} closable
               key={user}>{dataSource[user].name}</Tag>
        ));

        updatedUsers.unshift(oldUsers);
        setArrayOfUsers(updatedUsers);

        setSelectedRowKeys([]);
        setLoadingButton(false);
      }
    ;

    const searchHandler = (value) => {
        const filteredData = dataSource.filter(o =>
          Object.keys(o).some(k =>
            String(o[k])
              .toLowerCase()
              .includes(value.toLowerCase())
          ));
        setFilterTable(filteredData);
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
      <>
        <div className={classes.AssignProjects}>
          <h2> Employees assigned to this project</h2>
          {arrayOfUsers}

        </div>
        <div className={classes.User}>
          <Search
            placeholder={"Search"}
            onSearch={searchHandler}
            enterButton
            allowClear
            style={{ width: 300, marginBottom: 8, marginRight: 8 }}
          />
        </div>
        <div className={classes.Button}>
          <Button
            shape="round"
            onClick={() => start()}
            type="primary"
            loading={loadingButton}
            disabled={!hasSelected}> Assign to Project </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} users` : ""}
          </span>
        </div>
        <Table rowSelection={rowSelection} dataSource={!filterTable ? dataSource : filterTable} columns={columns}
               pagination={{ position: ["bottomCenter"], pageSizeOptions: [5, 10, 20, 30, 50, 100] }}/>
      </>
    );
  }
;

export default AssignProjects;