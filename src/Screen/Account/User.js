import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/UserStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useState } from 'react';
import * as ImagePicker  from 'expo-image-picker';
function User({navigation}){
    const [name,setName] = useState("Trần Tấn Phước");
    const [mail,setMail] = useState("trantanphuoc262@gmail.com");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.cancelled) {
              let localUri = "";
            result.assets.map((item)=>{
                localUri = item.uri;
            })
          let formData = new FormData();
          let uriParts = localUri.split(".");
          const path = localUri.split("/");
          let fileType = uriParts[uriParts.length - 1];
          let nameFile = path[path.length - 1];
          const _image = {
            uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""),
            type: `image/${fileType}`,
            name: nameFile,
          };
          formData.append("file", _image);
          console.log(formData);
        }
        else if(result.cancelled){
          console.log(result);
        }
      };
    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.containerheader}>
                <View style={styles.containerheader_icon}>
                    <TouchableOpacity onPress={()=>{
                                        navigation.goBack();
                                    }}>
                                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerheader_title}>
                    <Text style={styles.fontTitle}>
                        Thông tin tài khoản
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.viewBody_avt}>
                    <View style={styles.avt}>
                        
                    </View>
                    <TouchableOpacity onPress={pickImage} style={styles.camera}>
                        <Feather name="camera" size={24} color="black" />   
                    </TouchableOpacity>
                </View>
                <View style={styles.containerFunc}>
                     <View style={styles.funcItem}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Id người dùng:</Text>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.7,}}>348237423845234</Text>
                     </View>
                     <View style={styles.funcItem}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Họ và tên:</Text>
                            <TextInput onChangeText={x => setName(x)} style={{fontSize:16,fontWeight:"800",flex:0.7,height:"100%",}}>{name}</TextInput>
                     </View>
                     <View style={styles.funcItemLast}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Email:</Text>
                            <TextInput onChangeText={x => setMail(x)} style={{fontSize:16,fontWeight:"800",flex:0.7,height:"100%",}}>{mail}</TextInput>
                     </View>
                </View>
                <View style={{marginTop:20,}}/>
                <TouchableOpacity style={styles.button}>
                <Text style={{fontSize:18,color:'red',fontWeight:'600'}}>Lưu thay đổi</Text>
                </TouchableOpacity>
            </ScrollView>
           
        </SafeAreaView>
    );
}

  
export default User;