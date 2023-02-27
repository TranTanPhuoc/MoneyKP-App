import {  ScrollView, View } from 'react-native';
import {  Text, SafeAreaView} from 'react-native';
import styles from "./styles/DetailStyle";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Import FireBase
import{initializeAuth,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useDispatch, useSelector } from 'react-redux';
import { colorJar } from '../../../assets/AppColors/AppColors';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
function Detail({navigation,route}){
    const {id,name,itemName,money} = route.params;
    const [moneyR,setMoneyR] = useState(parseInt(money));
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
      };
    return (
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
                        Chi tiết
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.viewBody_Top}>
                    <View>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <Image source={require('../../../assets/icons/money.png')} ></Image>
                            <Text style={{color:'#000',fontSize:24,fontWeight:'500',marginLeft:15}}>{name}</Text>
                        </View>
                        <Text style={{color:'#000',fontSize:30,fontWeight:'bold',marginTop:5}}>{itemName}</Text>
                    </View>
                </View>
                <View style={styles.containerMoney}>
                    <View style={{justifyContent:'center',alignItems:'center',height:50}}>
                        <Text style={{fontSize:20,fontWeight:'600'}}>Tổng số tiền</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',height:100}}>
                        <Text style={{fontSize:35,fontWeight:'700'}}>{moneyFormat(moneyR)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Detail;