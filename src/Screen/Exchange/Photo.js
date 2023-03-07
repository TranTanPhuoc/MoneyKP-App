import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import styles from './styles/PhotoStyles'
import { AntDesign } from '@expo/vector-icons';
import { Text } from "react-native";
function Photo({navigation,route}){
    const {photo} = route.params;
    const hanldPressClose = () =>{
        navigation.goBack();
    }
    return (
      <View style={styles.container}>
        <View style={{flex:0.1,alignItems:"flex-end",width:"100%",justifyContent:'flex-end',paddingRight:30,backgroundColor:"#1C1C1C",marginTop:20}}>
          <View style={{display:'flex',flexDirection:"row",}}> 
                    <TouchableOpacity onPress={hanldPressClose}>
                        <AntDesign name="closecircle" size={32} color="white" />
                    </TouchableOpacity>
          </View>
        </View>
        <View style={styles.camera}>
            <Image style={{height:"80%",width:'95%'}} source={{uri:photo}}>

            </Image>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.button}>

            </View>
            <View style={styles.button}>
            </View>

            <TouchableOpacity style={styles.button}>
                <View style={{width:60,height:60,backgroundColor:'#fff',borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../../assets/icons/right.png')}  />
                </View>
            </TouchableOpacity>
        </View>
      </View>
    );
}

export default Photo;