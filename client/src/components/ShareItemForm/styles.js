const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'spaceAround'
  },
  shareItemButton: {
    marginTop: 20
  },
  button: {
    margin: theme.spacing.unit
  },

  shareFormTitle: {
    fontSize: '4rem',
    fontWeight: 700
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 400
  },
  form: {
    width: '80%'
  },
  tags: {
    width: '300px'
  },
  select: {
    width: '400px',
    background: 'orange',
    borderRadius: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    fontSize: '15px'
    // marginTop: '20px'
  }
  // formContainer: {
  //   width: 400
  // }
});

export default styles;
