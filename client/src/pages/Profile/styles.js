const styles = theme => ({
  root: {
    backgroundColor: '#212121'
  },
  profileContainer: {
    padding: 50,
    marginTop: 50,
    marginRight: 140,
    marginLeft: 100,
    background: 'white',
    display: 'flex'
  },

  profileItemContainer: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 100,
    marginTop: 30,
    backgroundColor: '#212121'
  },

  profileItems: {
    marginTop: 30
  },

  shareTitle: {
    paddingLeft: 100,
    paddingTop: 100,
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.primary.main
  },

  profileStats: {
    fontSize: 20
  },
  profileName: {
    fontSize: 30,
    fontWeight: 700
  },

  profileAvatar: {
    marginRight: 10,
    width: 50,
    height: 50
  },

  profileInfo: {
    display: 'flex',
    marginBottom: 10
  },

  numItem: {
    fontWeight: 600
  }
});

export default styles;
