//----------------------------------------------------------------------------------------------------------------------
// Function component (no state/ lifecycle used) for Active Projects
// Maps project data to table rows
import { Link } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import classes from '../Projects.module.css';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const ProjectCard = props => {
    const { removeUserFromProject } = props;

    return(
    <tr key={props.project.id}>
        <td>{props.project.id}</td>
        {props.project.projectStatus !== 'Pending' && (
          <td><Link to={"/projectinfo/" + props.project.id}>{props.project.name}</Link></td>)
        }{props.project.projectStatus === 'Pending' && (
      <td><Link to={"/adminReviewProject/" + props.project.id}>{props.project.name}</Link></td>)
    }

        {props.project.projectStatus !== 'Pending' && (
            <td>{props.project.projectScore}</td>
        )}
        {props.project.businessCase !== null ?
            <td>{props.project.businessCase.executiveSummary}</td> :
            <td>{props.project.questions[28].answers}</td>
        }

        {/* ---------------------------------------------------------------------------------------- */}
        {/* Maps related users into project tab including the assign user feature */}
        {props.project.projectStatus === 'Active' && (
          <td>{props.project.users.map(user => (
            <>
                <Tooltip key={user.id} placement="top" title={user.role}>

                    {/* Allows a user to be removed from a project */}
                    <Tag
                      onClose={() => removeUserFromProject(user.id, props.project.id)}
                      closable={
                          user.role === 'employee' ||
                          user.role === 'manager'
                      }
                    >{`${user.firstName} ${user.surname}`}</Tag>
                </Tooltip>
            </>
          ))}

              {/* Links to projects add user page */}
              <div style={{ marginTop: '10px' }} className={classes.antBtn}>
                  <Link to={`/assign-projects/${props.project.id}`}>Assign Users</Link>
              </div>
          </td>)}
        {props.project.projectStatus !== 'Pending' && (
          <>
            <td>{props.project.createdAt}</td>
            {props.project.businessCase !== null ?
                <td>{props.project.businessCase.duration}</td> :
                <td>Simplify project</td>
            }
          </>
        )}
        {props.project.businessCase !== null ?
          <td>{props.project.projectSize}</td> :
          <td>Small</td>
        }

        <td>{props.project.projectType}</td>
        {props.project.projectStatus === 'Pending' && (
          <>
            <td><Link to={"/adminReviewProject/" + props.project.id}><Button>Review</Button></Link></td>
          </>
        )}
    </tr>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeUserFromProject: (userId, projectId) =>
          dispatch(actions.removeUserFromProject(userId, projectId))
    };
};
// Exports modal
export default connect(null, mapDispatchToProps)(ProjectCard);
