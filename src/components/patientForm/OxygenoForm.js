import React from "react";
import Grid from "@material-ui/core/Grid";
import {useFormContext} from "react-hook-form";

function OxygenoForm() {
    const {register, errors} = useFormContext();
    return <Grid container>
        <h3 style={{
            marginBlockEnd: 0
        }}>OXIGENO:</h3>
        <Grid item xs={12} sm={12} md={10} lg={6} xl={6}>

            Oxigeno
        </Grid>
    </Grid>
}

export default OxygenoForm;