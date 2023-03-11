import { Camera } from "expo-camera";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import styles from './styles/CameraExchangeStyles'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
function CameraExchange({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const hanldPressClose = () => {
    navigation.goBack();
  }
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    if (photo !== null) {

      navigation.navigate("Photo", {
        photo: photo
      });
    }
  }, [photo]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      if (result.assets != null) {
        let localUri = "";
        result.assets.map((item) => {
          localUri = item.uri;
        })
        setPhoto(localUri);
      }
    }
    else if (result.cancelled) {
      console.log(result);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
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
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={hanldPressClose}>
            <AntDesign name="closecircle" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image source={require('../../../assets/icons/album.png')} style={{ backgroundColor: '#fff' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <View style={styles.viewButton}>
          </View>
        </TouchableOpacity>
        <View style={styles.button}>
        </View>
      </View>

    </View>
  );
}

export default CameraExchange;