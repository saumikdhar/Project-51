import React, {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
const Projects = (props) => {

    const [projects,setProjects]=useState([]);

    useEffect(() => {

    const url = "http://localhost:8080/projects/getAllProjects";
    const method = "GET";
    const header = {"Content-Type": "application/json"};

    fetch(url, {
      method: method,
      headers: header,
      
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Error");
        } else if (res.status !== 200 && res.status !== 201) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then(resData => {
       console.log('res data',resData)
       setProjects(resData.data)
      })
      .catch(error => {
       console.log('error occur',error)
      });
  },[]);
  console.log("projects" + projects)
    return(
        <div>
            <h1>All Projects</h1>
            <table>
                <thead>
                    <tr>
                    <th>Project Name</th>
                    <th>Manager Name</th>
                    <th>Project Status</th>
                    <th>Project Size</th>
                    <th>Quick Win</th>
                    <th>Project Type</th>
                    <th>Project Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(project=>{
                            return (
                                <tr key={project.id}>
                                      <td><Link to={`/projectinfo/${project.id}`}> {project.name}</Link></td>  
                            <td>{project.managerName}</td>
                            <td>{project.projectStatus}</td>
                            <td>{project.projectSize}</td>
                            <td>{project.quickWin}</td>
                            <td>{project.projectType}</td>
                            <td>{project.createdAt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}
export default Projects;