const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

export default styles;
