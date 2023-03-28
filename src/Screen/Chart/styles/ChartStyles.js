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
    marginTop: 10,
    flex: 1,
    marginBottom: 10,
    borderRadius: 20,
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
    height: 80,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  containerSelectDropDown: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    flex: 0.4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#555555',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerItemSelect: {
    height: 80,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttom: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    height: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
});

export default styles;