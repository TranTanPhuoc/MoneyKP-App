import { Platform, StatusBar, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollview: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 80,
  },
  containerTop: {
    marginTop: 20,
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#E6E6FA',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  containerInputMoney: {
    marginTop: 20,
    height: 70,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 20,
  },
  containerMoneyWords: {
    height: 60,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerJar: {
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  containerSelectDropDown: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: '#E6E6FA',
    borderWidth: 0.5,
    borderColor: 'black',
    height: 70,
  },
  containercustomSelectDropDown: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 20,
  },
  containerNote: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 20,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
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
  containerButton: {
    marginTop: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: '#f5866e',
    // height:50,
    // width:"40%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
  },
  modalViewNofi: {
    backgroundColor: 'white',
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
});

export default styles;