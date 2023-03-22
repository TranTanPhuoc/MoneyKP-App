import { Platform, StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    flex: 0.33333,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewButton: {
    height: 50,
    width: 50,
    borderWidth: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    width: "100%",
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#808080'
  },
});

export default styles;