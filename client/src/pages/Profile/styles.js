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
  topWrapper: {
    backgroundColor: '#212121'
  },
  profileItemContainer: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 100,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileCard: {
    margin: 100
  },
  shareTitle: {
    paddingLeft: 100,
    paddingTop: 100,
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.primary.main,
    backgroundColor: '#212121'
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
  },
  profileItems: {
    // maxWidth: '100%'
  }
});

export default styles;
