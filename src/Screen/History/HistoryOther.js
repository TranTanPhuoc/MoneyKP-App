import { Button, DatePickerAndroid, ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/HistoryStyles";
import { AntDesign,  } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
// Import FireBase
import{initializeAuth,signInWithEmailAndPassword,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { colorJar } from '../../../assets/AppColors/AppColors';
import {  useSelector } from 'react-redux';
import axios from 'axios';

function HistoryOther({navigation,route}){
    const {id,name} = route.params;
    const [dataHistory,setdataHistory] = useState([]);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
    };
    const idReload = useSelector(state => state.reload.idReload);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    useEffect(()=>{
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`,{
            headers: { authorization: accessToken },
        })
        .then((res)=>{
                setdataHistory(res.data.map((item)=>{
                    var objtemp = {id:item.id,name:item.name,population:item.precent,userId:item.userId,precent:item.precent,totalIncome:item.totalIncome,totalSpending:item.totalSpending,availableBalances:item.availableBalances};
                    return objtemp;
                }));
            }).catch((err)=>{
            console.log(err);
        })
    },[idReload])
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
                        Xem lịch sử lọ {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                {
                    dataHistory.map((item,index)=>{
                        if(item != null){
                            return (
                                <TouchableOpacity
                                    onPress={()=>{
                                        navigation.navigate("Detail",{id:id,name:name,itemName:item.name,money:item.availableBalances});
                                    }}
                                key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50,marginLeft:10,marginRight:10}}>
                                    <Text style={{fontSize:20}}>{index+1}. {item.name}</Text>
                                    <Text style={{fontSize:20,marginRight:10}}>{moneyFormat(item.availableBalances)}</Text>
                                </TouchableOpacity>
                            );
                        }
                    })
                }
            </ScrollView>
            
        </SafeAreaView>
    );
}

  
export default HistoryOther;