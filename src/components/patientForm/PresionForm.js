import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {useTheme} from "@material-ui/core/styles";
import {useFormContext} from "react-hook-form";
import {useStyle} from "./cssInJs";
import {useMediaQuery} from "@material-ui/core";

function PresionForm() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const {justifyFlex} = useStyle(theme);
    const {register, errors} = useFormContext();

    return <div>
        <div>
            <h3 style={{
                marginBlockEnd: 0
            }}>PRESION:</h3>
            <div>
                <Grid container>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
                        <TextField error={!!errors.sistolica} inputRef={register({
                            required: 'Obligatorio'
                        })} type="number" label="Sistolica" name="sistolica" helperText={errors.sistolica && errors.sistolica.message}/>
                        <TextField error={!!errors.diastolica} inputRef={register({
                            required: 'Obligatorio'
                        })} type="number" label="Diastolica" name="diastolica" helperText={errors.diastolica && errors.diastolica.message}/>
                        <TextField error={!!errors.frecCardiaca} inputRef={register({
                            required: 'Obligatorio'
                        })} type="number" label={`${matches ? 'Frec.': 'Frecuencia'} Cardiaca`} name="frecCardiaca" helperText={errors.frecCardiaca && errors.frecCardiaca.message}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={justifyFlex}>
                        <TextField
                            inputRef={register}
                            style={{
                                with: '100%'
                            }}
                            multiline={true}
                            label="Nota"
                            name="notasPresion"
                        >
                        </TextField>
                    </Grid>
                </Grid>
            </div>
        </div>
    </div>
}

export default PresionForm;