import React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import useCustomStyles from '../../jss/globalStyles';

function TitlePagesComponent({ text }) {
  const classes = useCustomStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="textPrimary" variant="h5" className={classes.pageHeader}>
        {text}
      </Typography>
    </Breadcrumbs>
  );
}

export default TitlePagesComponent;
