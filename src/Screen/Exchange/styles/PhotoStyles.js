import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FA',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#1C1C1C",
  },
  button: {
    borderRadius: 50,
    flex: 0.33333,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30,
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
    backgroundColor: '#1C1C1C',
  },
});

export default styles;