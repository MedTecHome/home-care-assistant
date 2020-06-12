import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { getProfileById } from '../../services/profiles';
import { getPropValue } from '../../helpers/utils';

function TextFromProfileComponent({
  profileId = '',
  fullname = true,
  name = false,
  lastname = false,
  age = false,
  birthday = false,
  email = false
}) {
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    getProfileById(profileId).then(result => {
      if (result) {
        setProfileDetails(result);
      }
    });
  }, [profileId]);

  if (fullname) {
    return (
      <Typography component="span" noWrap>
        {getPropValue(profileDetails, 'fullname')}
      </Typography>
    );
  }

  if (name) {
    return <Typography component="span">{getPropValue(profileDetails, 'name')}</Typography>;
  }
  if (lastname) {
    return <Typography component="span">{getPropValue(profileDetails, 'lastname')}</Typography>;
  }
  if (age) {
    return <Typography component="span">{getPropValue(profileDetails, 'age')}</Typography>;
  }
  if (birthday) {
    return <Typography component="span">{getPropValue(profileDetails, 'b')}</Typography>;
  }
  if (email) {
    return <Typography component="span">{getPropValue(profileDetails, 'email')}</Typography>;
  }

  return null;
}

export default TextFromProfileComponent;
