import { green, red } from '@material-ui/core/colors';

const healthyStandards = {
  inr: value => (value && (value <= 1.1 ? green : red)) || null,
  weight: (height, weight) =>
    (height && weight && (height * height * 20 >= weight && height * height * 25 <= weight ? green : red)) || null,
  pressure: (sis, dias) => (sis && dias && (sis >= 120 && dias <= 80 ? green : red)) || null,
  heartbeat: value => (value && (value >= 60 && value <= 100 ? green : red)) || null,
  glucose: value => (value && (value >= 60 && value <= 100 ? green : red)) || null,
  temperature: value => (value && (value >= 36.1 && value <= 37.2 ? green : red)) || null
};

export default healthyStandards;
