import React, { useState, useEffect } from 'react';
import { Grid, Button, ButtonBase, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Field } from 'react-final-form';
import { CheckCircle, CheckRounded } from '@material-ui/icons';
import CustomTextFieldComponent from '../inputs/CustomTextFieldComponent';
import { storageFirebase } from '../../firebaseConfig';
import { ERROR_MESSAGE } from '../../commons/globalText';
import { useMessageContext } from '../../MessageHandle/MessageContext';

const useStyles = makeStyles(theme => ({
  customUploadButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: 7,
    borderRadius: 4,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  }
}));

function ClinicBlockFieldComponent({ setLogoUrl, defaultLogo }) {
  const { RegisterMessage } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [logoname, setlogoname] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const classes = useStyles();

  const handleUploadSuccess = filename => {
    setlogoname(filename);
    storageFirebase
      .ref()
      .child(filename)
      .getDownloadURL()
      .then(url => {
        setDownloadUrl(url);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (defaultLogo) {
      handleUploadSuccess(defaultLogo);
    }
  }, [defaultLogo]);

  useEffect(() => {
    setLogoUrl(logoname);
  }, [logoname, setLogoUrl]);

  const handleUploadError = e => {
    RegisterMessage(ERROR_MESSAGE, e, 'ClinicBlockFieldComponent-handleUploadError');
  };

  const handleUploadStart = () => {
    setLoading(true);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={6}>
        <CustomTextFieldComponent
          required
          type="number"
          label="Límite de doctores"
          name="maxDoctors"
          textAlign="right"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CustomTextFieldComponent
          required
          type="number"
          label="Límite de pacientes"
          name="maxPatients"
          textAlign="right"
        />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.customUploadButton}>
          <CustomUploadButton
            accept="image/*"
            name="logo"
            randomizeFilename
            storageRef={storageFirebase.ref()}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            maxHeight={100}
            maxWidth={100}
          >
            Seleccione una imagen
          </CustomUploadButton>
        </div>
      </Grid>
      <Grid item xs={6}>
        {loading ? (
          <div>
            <CircularProgress size={30} />
          </div>
        ) : (
          <Typography>
            <a href={downloadUrl} target="_blank" rel="noreferrer">
              {logoname}
            </a>
          </Typography>
        )}
        <Field
          name="logoUrl"
          component={({ input: { checked, value, name, onBlur, onFocus, onChange } }) => (
            <input
              type="hidden"
              checked={checked}
              value={value}
              name={name}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={onChange}
            />
          )}
        />
      </Grid>
    </>
  );
}

export default ClinicBlockFieldComponent;
