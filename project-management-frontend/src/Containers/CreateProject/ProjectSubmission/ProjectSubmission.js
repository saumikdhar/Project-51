import React from 'react';
import classes from './ProjectSubmission.module.css';
import hafodLogo from '../../../Assets/Hafod-logo.png';

const ProjectSubmission = () => {
  return (
    <div className={classes.ProjectSubmission}>
      <div className={classes.box}>
        <div className={classes.image} />
        <div className={classes.contentWrapper}>
          <img
            style={{ height: 'auto', width: '35%', margin: 'auto' }}
            src={hafodLogo}
            alt="Hafod Logo"
          />
          <h1>Thank you!</h1>
          <p>Your questionnaire has been received. </p>
          <p>
            Thank you for taking the time to fill in our questionnaire to submit a change or
            Simplify idea.
          </p>
          <p>It's now under processing and will be reviewed as soon as possible.</p>
          <p>
            At Hafod we care about your ideas of change you want to bring to the business and we
            will continue to work hard so that customer values are met.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmission;
