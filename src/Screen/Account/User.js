import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/UserStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useState } from 'react';
import * as ImagePicker  from 'expo-image-picker';
// Import FireBase
import{signOut,initializeAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { reload_IU } from '../../redux/action/ActionRedux';

function User({navigation}){
    const [name,setName] = useState("");
    const [mail,setMail] = useState("");
    const [avtPic,setavtPic] = useState("https://res.cloudinary.com/drljnqaai/image/upload/v1676181723/KhoaLuan/images_dcewqt.png");
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const idReload = useSelector(state => state.reload.idReload);
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const dispatch = useDispatch();
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
        }
        else if(result.cancelled){
          console.log(result);
        }
      };

      useEffect(()=>{
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/user/${idUser}`,{
            headers: { authorization: accessToken },
        })
        .then((res)=>{
                setMail(res.data.email);
                setName(res.data.name);
                setavtPic(res.data.urlPic);
                // dispatch(reload_IU(idReload+1));
            }).catch((err)=>{
                console.log(err);
            })
        },[idReload])
    return(
        <SafeAreaView style={styles.container} >
            <View style={styles.containerheader}>
                <View style={styles.containerheader_icon}>
                    <TouchableOpacity style={{height:"100%",justifyContent:'center'}} onPress={()=>{
                                        navigation.goBack();
                                    }}>
                                        <AntDesign style={{marginLeft:20}} name="arrowleft" size={24} color="black" />
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
                        <Image source={{uri:avtPic}} style={{height:"100%",width:"100%",borderRadius:100,}}/>
                    </View>
                    <TouchableOpacity onPress={pickImage} style={styles.camera}>
                        <Feather name="camera" size={24} color="black" />   
                    </TouchableOpacity>
                </View>
                <View style={styles.containerFunc}>
                     <View style={styles.funcItem}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Id người dùng:</Text>
                            <Text style={{fontSize:16,fontWeight:"600",flex:0.7,}}>{auth.currentUser.uid}</Text>
                     </View>
                     <View style={styles.funcItem}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Họ và tên:</Text>
                            <TextInput onChangeText={x => setName(x)} style={{fontSize:16,fontWeight:"800",flex:0.7,height:"100%",}}>{name}</TextInput>
                     </View>
                     <View style={styles.funcItemLast}>
                            <Text style={{fontSize:16,fontWeight:"800",flex:0.3,}}>Email:</Text>
                            <Text style={{fontSize:16,fontWeight:"600",flex:0.7,}}>{mail}</Text>
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