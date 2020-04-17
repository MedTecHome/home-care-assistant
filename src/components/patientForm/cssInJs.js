import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  justifyCheckbox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    justifyItem: 'center',
  },
  justifyFlex: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: 60,
  },
  justifyFlex2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('xs')]: {
    justifyFlex: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    justifyFlex2: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  [theme.breakpoints.down(370)]: {
    justifyFlex: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}));
