const styles = theme => ({
  container: {
    background: '#212121',
    padding: '5%',

    [theme.breakpoints.up('md')]: {
      padding: '6%'
    }
  }
});

export default styles;
