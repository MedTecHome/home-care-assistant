import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import IconTestComponent from '../ClinicalHistory/IconTextComponent';
import { getPropValue } from '../../helpers/utils';
import { testFormsNames } from '../../helpers/constants';

const useStyles = makeStyles(theme => ({
  iconSize: {
    width: 35,
    height: 35,
    marginRight: 5
  },
  titleDiv: {
    display: 'flex'
  },
  titleForms: {
    color: theme.palette.grey['600'],
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10
  }
}));

function TitleAndIconComponent({ type, alternativeTitle }) {
  const localClasses = useStyles();
  return (
    <div className={localClasses.titleDiv}>
      <IconTestComponent type={type} className={localClasses.iconSize} />
      <Typography className={localClasses.titleForms} variant="subtitle1">
        {type === 'otherstest'
          ? alternativeTitle
          : getPropValue(
              testFormsNames.find(tf => tf.id === type),
              'name'
            ) || '?'}
      </Typography>
    </div>
  );
}

export default TitleAndIconComponent;
