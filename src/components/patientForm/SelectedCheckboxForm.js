import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import useTheme from '@material-ui/core/styles/useTheme';
import useStyle from './cssInJs';

const optionsCheckbox = [
  { label: 'Presion', value: 'presion' },
  { label: 'Temperatura', value: 'temperatura' },
  { label: 'Peso', value: 'peso' },
  { label: 'Glucosa', value: 'glucosa' },
  { label: 'Respiracion', value: 'respiracion' },
  { label: 'Oxígeno', value: 'oxygeno' },
  { label: 'INR', value: 'inr' },
];

function SelectedChecboxForm({ location, history, defaultValues }) {
  const urlSearchParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const { justifyCheckbox } = useStyle(theme);

  const handleSelectCheckbox = (ev) => {
    const { name, checked } = ev.target;
    if (checked) {
      urlSearchParams.append(`formulario`, name);
    } else {
      const formularios = urlSearchParams.getAll('formulario').filter((s) => s !== name);
      urlSearchParams.delete('formulario');
      formularios.map((f) => urlSearchParams.append('formulario', f));
    }
    history.push({
      pathname: location.pathname,
      search: urlSearchParams.toString(),
    });
  };
  return (
    <FormControl
      style={{
        width: '100%',
      }}
      component="fieldset"
    >
      <FormLabel component="legend">Seleccione uno o mas formulario</FormLabel>
      <FormGroup className={justifyCheckbox} row defaultValue={defaultValues}>
        {optionsCheckbox.map((op) => (
          <FormControlLabel
            key={op.label}
            control={
              <Checkbox
                color="primary"
                onChange={handleSelectCheckbox}
                checked={defaultValues.includes(op.value)}
                name={`${op.value}`}
              />
            }
            label={`${op.label}`}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default withRouter(SelectedChecboxForm);
