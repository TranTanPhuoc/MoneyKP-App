import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/JarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
function Jar({navigation}){
   const [jar,setJar] = useState("");
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
                <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../../assets/icons/jar.png')} />
                </View>
                <View style={{flex:0.8,justifyContent:'center',}}>
                     <TextInput value={jar} onChange={x=>setJar(x)} style={{height:50,borderRadius:20,borderWidth:0.5,paddingLeft:15,fontSize:18,}} placeholder='Nhập tên lọ cần thêm'/>
                </View>
            </View>
            <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={{fontSize:22,color:'#fff',fontWeight:'bold'}}>Thêm</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

  
export default Jar;