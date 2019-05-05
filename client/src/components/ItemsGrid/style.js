const styles = theme => ({
  layout: {
    width: '100%',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      minWidth: 1700
      // marginLeft: 'auto',
      // marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px`,
    backgroundColor: '#212121'
  }
});

export default styles;
