import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/JarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
// Import FireBase
import{initializeAuth,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { reload_IU } from '../../redux/action/ActionRedux';

function Jar({navigation}){
   const [jar,setJar] = useState("");
   const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const dispatch = useDispatch();
    const hanldhanldAddJar = ()=>{
        axios.post('http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket',
            {
                userId: idUser,
                name:jar,
                precent:0,
                availableBalances:0,
                totalSpending:0,
                totalIncome:0,
                type:1
            },
            {
                headers:{
                    authorization: accessToken 
                }
            }).then((res)=>{
                dispatch(reload_IU(reload_IU+1));
                Alert.alert("Thông báo","Thêm thành công");
                navigation.goBack();

            }).catch((err)=>{
                console.log(err);
            })
    }

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
                        Thêm lọ mới
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <View style={styles.viewBody}>
                <View style={{flex:0.15,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../../assets/icons/jar.png')} />
                </View>
                <View style={{flex:0.85,justifyContent:'center',marginLeft:10,marginRight:10}}>
                     <TextInput value={jar} onChangeText={x=>setJar(x)} style={{height:50,borderRadius:20,borderWidth:0.5,paddingLeft:15,fontSize:16,}} placeholder='Nhập tên lọ cần thêm'/>
                </View>
            </View>
            <View style={styles.containerButton}>
                    <TouchableOpacity onPress={hanldhanldAddJar} style={styles.buttonStyle}>
                        <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Thêm</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

  
export default Jar;