import { green, red } from '@material-ui/core/colors';

const healthyStandards = {
  inr: value => (value <= 1.1 ? green : red),
  weight: (height, weight) => (height * height * 20 >= weight && height * height * 25 <= weight ? green : red),
  pressure: (sis, dias) => (sis >= 120 && dias <= 80 ? green : red),
  heartbeat: value => (value >= 60 && value <= 100 ? green : red),
  glucose: value => (value >= 60 && value <= 100 ? green : red)
};

export default healthyStandards;
