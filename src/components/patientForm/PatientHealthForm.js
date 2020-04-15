import React, {useEffect, useState} from "react";
import PresionForm from "./PresionForm";
import TemperaturaForm from "./TemperaturaForm";
import GlucosaForm from "./GlucosaForm";
import PesoForm from "./PesoForm";
import RespiracionForm from "./RespiracionForm";
import OxygenoForm from "./OxygenoForm";
import INRForm from "./INRForm";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useForm, FormContext} from "react-hook-form";
import SelectedChecboxForm from "./SelectedCheckboxForm";



const PatientHEalthForm = ({location, history}) => {
    let urlSearchParams = new URLSearchParams(location.search);
    const [selectedCheckbox, setSelectedCheckbox] = useState([]);
    const methods = useForm();

    useEffect(() => {
        setSelectedCheckbox(urlSearchParams.getAll('formulario'));
    }, [location]);

    const handleReset = () => {
        methods.reset();
    };

    const onSubmit = value => {
        console.log(value);
    };

    return <>
        <SelectedChecboxForm defaultValues={selectedCheckbox}/>
        <FormContext {...methods}>
            <form noValidate autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container>
                    {selectedCheckbox.includes('presion') && <Grid item xs={12}>
                        <PresionForm/>
                    </Grid>}
                    {selectedCheckbox.includes('temperatura') && <Grid item xs={12}>
                        <TemperaturaForm/>
                    </Grid>}
                    {selectedCheckbox.includes('glucosa') && <Grid item xs={12}>
                        <GlucosaForm/>
                    </Grid>}
                    {selectedCheckbox.includes('peso') && <Grid item xs={12}>
                        <PesoForm/>
                    </Grid>}
                    {selectedCheckbox.includes('respiracion') && <Grid item xs={12}>
                        <RespiracionForm/>
                    </Grid>}
                    {selectedCheckbox.includes('oxygeno') && <Grid item xs={12}>
                        <OxygenoForm/>
                    </Grid>}
                    {selectedCheckbox.includes('inr') && <Grid item xs={12}>
                        <INRForm/>
                    </Grid>}
                </Grid>
                {selectedCheckbox.length > 0 && <div style={{
                    float: 'right',
                    marginTop: 15
                }}>
                    <Button onClick={handleReset}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </div>}
            </form>
        </FormContext>
    </>
};

export default PatientHEalthForm;