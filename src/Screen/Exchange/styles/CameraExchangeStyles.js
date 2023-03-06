import { StyleSheet} from 'react-native';

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  photo: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default styles;