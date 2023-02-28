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
    const {id,name,itemName,money,idJar} = route.params;
    const [moneyR,setMoneyR] = useState(parseInt(money));
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
    };
    const idReload = useSelector(state => state.reload.idReload);
    const [hidden,sethidden] = useState(false);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataHistory,setdataHistory] = useState([]);
    useEffect(()=>{
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-basketId/${idUser}/${idJar}`,{
            headers: { authorization: accessToken },
        }).then((res)=>{
            setdataHistory(res.data.map((item,index)=>{
                var obj = {
                    basketId: item.basketId,
                    createDate: item.createDate,
                    id: item.id,
                    moneyTransaction: item.moneyTransaction,
                    note: item.note,
                    type: item.type,
                    userId: item.userId,
                    color: colorJar[0],
                    name:name
                };
                return obj;
            }));
        }).catch((err)=>{
            console.log(err);
        })
    },[idReload])

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
                <View style={{marginTop:20,}}>
                    <View style={styles.containerBody}>
                        <View style={{marginTop:20,marginLeft:20,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>Lịch sử giao dịch {itemName}</Text>
                            <TouchableOpacity onPress={()=> sethidden(!hidden)} style={{marginRight:20,}}>
                                {
                                    hidden? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden && 
                            <ScrollView style={{marginTop:20,marginLeft:20,marginRight:20,maxHeight:150}}>
                                {
                                    dataHistory.map((item,index)=>{
                                        return(
                                            <View key={index} style={styles.containerItem}>
                                                <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                                    <View style={{backgroundColor:item.color,height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                                        <Image source={require('../../../assets/icons/jar.png')} style={{tintColor:'#000'}}/>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.45,}}>
                                                    <View style={{marginBottom:10,}}>
                                                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.note}</Text>
                                                    </View>
                                                    {
                                                        (item.type== 1)? <Text>Thu nhập</Text> : <Text>Chi tiền</Text>
                                                    }
                                                </View>
                                                <View style={{flex:0.35}}>
                                                    {
                                                        (item.type== 1)? 
                                                        <Text style={{color:'#339900',fontSize:18,fontWeight:'bold'}}>+ {moneyFormat(item.moneyTransaction)}</Text> : 
                                                        <Text style={{color:'#EE0000',fontSize:18,fontWeight:'bold'}}>- {moneyFormat(item.moneyTransaction)}</Text>
                                                    }
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                        }
                        <View style={styles.containerBottom}>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate("History",{id:idJar,name:itemName});
                            }} style={styles.bottom} >
                                <Text style={{fontSize:20, color:'#fff',fontWeight:'bold'}}> Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20,marginLeft:20,}}>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Detail;