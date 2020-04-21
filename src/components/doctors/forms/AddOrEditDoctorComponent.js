import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { useDoctorsContext } from '../../../contexts/DoctorsContext';
import { REQUIRED_FIELD } from '../../../commons/globalText';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  headerStyle: {
    padding: 0,
    color: '#6c6c6c',
    borderBottom: '1px solid #ccc',
  },
});

export default function AddOrEditDoctorComponent({ title }) {
  const { selectDoctor, formType, setModalVisible } = useDoctorsContext();
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const classes = useStyles();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onSubmit = value => {
    console.log(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerStyle}>
        <h4>{title} Doctor</h4>
      </div>
      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <FormControl>
              <TextField
                error={!!errors.hospitalId}
                label="Hospital"
                inputRef={register({
                  required: REQUIRED_FIELD,
                })}
                name="hospitalId"
              />
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}
