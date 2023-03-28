import { Platform, StatusBar, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerheader: {
    height: 50,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
  },
  containerheader_icon: {
    flex: 0.2,
    justifyContent: 'center',
    marginLeft: 20,
  },
  containerheader_title: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fontTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  viewBody: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  containerMoney: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: 'center'
  },
  containerBody: {
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  containerItem: {
    flex: 0.5,
    backgroundColor: '#E6E6FA',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    height: 80,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  containerItemTop: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerItemR: {
    height: 70,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 10,
    marginTop: 40,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#FF8247',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default styles;