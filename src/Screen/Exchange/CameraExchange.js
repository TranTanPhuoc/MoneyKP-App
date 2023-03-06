import { Camera } from "expo-camera";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import styles from './styles/CameraExchangeStyles'
function CameraExchange(){
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    useEffect(()=>{
        console.log(photo.uri);
    },[photo])
    const takePicture = async () => {
      if (cameraRef) {
        const photo = await cameraRef.takePictureAsync();
        setPhoto(photo);
      }
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    );
}

export default CameraExchange;