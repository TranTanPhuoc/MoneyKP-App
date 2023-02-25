import {  ScrollView, View } from 'react-native';
import {  Text, SafeAreaView} from 'react-native';
import styles from "./styles/DetailOtherStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Import FireBase
import{initializeAuth,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useDispatch, useSelector } from 'react-redux';
function DetailOther({navigation,route}){
    // Định dạng tiền tệ VNĐ
    const {id,name,money} = route.params;
    const moneyR = parseInt(money);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
      };
    const [hidden,sethidden] = useState(false);
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const idReload = useSelector(state => state.reload.idReload);
    const dispatch = useDispatch();
    const [idIU,setidIU] = useState(idReload);
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/${id}`,{
            headers: { authorization: accessToken },
        })
        .then((res)=>{
                setData(res.data.map((item)=>{
                    var objtemp = {id:item.id,name:item.name,population:item.precent,userId:item.userId,precent:item.precent,totalIncome:item.totalIncome,totalSpending:item.totalSpending,availableBalances:item.availableBalances};
                    return objtemp;
                }));
        }).catch((err)=>{
            console.log(err);
        })
    },[idIU])
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
                        {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.containerMoney}>
                    <View style={{justifyContent:'center',alignItems:'center',height:50}}>
                        <Text style={{fontSize:20,fontWeight:'600'}}>Tổng số tiền còn lại</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',height:100}}>
                        <Text style={{fontSize:35,fontWeight:'700'}}>{moneyFormat(moneyR)}</Text>
                    </View>
                </View>
                <View style={{marginTop:20,}}>
                    <View style={styles.containerBody}>
                        <View style={{marginTop:20,marginLeft:20,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>Danh sách các mục</Text>
                            <TouchableOpacity onPress={()=> sethidden(!hidden)} style={{marginRight:20,}}>
                                {
                                    hidden? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden && 
                            <ScrollView style={{marginTop:20,marginLeft:20,marginRight:20,height:150}}>
                                {
                                    data.map((item,index)=>{
                                        if(item != null){
                                            return (
                                                <View key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50,}}>
                                                    <Text style={{fontSize:20}}>{index+1}. {item.name}</Text>
                                                    <Text style={{fontSize:20,marginRight:10}}>{moneyFormat(item.availableBalances)}</Text>
                                                </View>
                                            );
                                        }
                                    })
                                    
                                }
                            </ScrollView>
                        }
                        
                        <View style={{marginTop:20,marginLeft:20,}}>
                        </View>
                    </View>
                </View>
            </ScrollView>
           
        </SafeAreaView>
    );
}

  
export default DetailOther;