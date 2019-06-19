const styles = theme => ({
  avatar: {
    marginRight: 15,
    width: 50,
    height: 50
  },
  button: {
    color: theme.palette.primary.main,
    fontSize: '0.9rem',
    margin: theme.spacing.unit,
    marginBottom: '1rem',
    padding: '0.5rem 1.5rem'
  },
  card: {
    borderRadius: 0,
    width: '100%',
    height: '100%',
    margin: 10
  },
  content: {
    dislay: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    minHeight: 250
  },
  select: {
    color: '#808080',
    marginBottom: 5
  },
  title: {
    fontWeight: 400,
    fontSize: '1.5rem',
    textTransform: 'capitalize',
    marginTop: '1.5rem',
    marginBottom: 5
  },
  description: {
    fontWeight: 400,
    fontSize: '1rem',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    lineHeight: 0,
    padding: 0
  },
  metaInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  metaName: {
    '&:hover': {
      color: theme.palette.secondary.main,
      cursor: 'pointer'
    }
  },
  metaDate: {
    color: 'grey'
  }
});

export default styles;
