import makeStyles from '@material-ui/core/styles/makeStyles';

const useCustomStyles = makeStyles(theme => ({
  loginRoot: {
    maxWidth: 360,
    background: '#fff',
    margin: '3% auto',
    padding: 20,
  },
  headerStyle: {
    color: '#6c6c6c',
  },
  pageHeader: {
    color: '#6d6d6d',
  },
  formControl: {
    width: '100%',
  },
  listRoot: {
    position: 'inherit',
    background: '#fff',
  },
  addFloatingButton: {
    position: 'fixed',
    zIndex: 666,
    bottom: 0,
    right: 0,
  },
  root: {
    maxWidth: '100%',
  },
  inline: {
    display: 'inline',
    lineHeight: '250%',
  },
  itemList: {
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 5,
    '&:hover': {
      background: '#f5f5f6',
    },
  },
  selectedItemList: {
    background: '#dddddd',
  },
  itemListContentPrimary: {
    maxWidth: '100%',
    lineHeight: '250%',
    fontSize: 12,
    color: '#666',
  },
  footerList: {
    height: 120,
  },
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 10,
  },
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  textDetailStyle: {
    '&>*': {
      fontSize: 12,
      lineHeight: '200%',
      fontWeight: 400,
      color: '#000',
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableRows: {
    '&.Mui-selected': {
      background: theme.palette.primary.light,
    },
  },
  largeCells: {
    maxWidth: 230,
  },
  textCells: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  justifyCheckbox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    justifyItem: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));

export default useCustomStyles;
