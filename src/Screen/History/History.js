import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/HistoryStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
function History({navigation}){
   const [History,setHistory] = useState("");
   const dataHistory = [
    {id:1,name:'Thiết yếu',price:212222230,color:'#FF9999',type:1},
    {id:2,name:'Thiết yếu',price:31235,color:'#FF9999',type:-1},
    {id:3,name:'Thiết yếu',price:212335,color:'#FF9999',type:1},
    {id:4,name:'Thiết yếu',price:123456,color:'#FF9999',type:-1},
    {id:5,name:'Thiết yếu',price:6764435,color:'#FF9999',type:1},
    {id:6,name:'Thiết yếu',price:453123,color:'#FF9999',type:-1},
    {id:7,name:'Thiết yếu',price:23453,color:'#FF9999',type:1},
    {id:8,name:'Thiết yếu',price:123567,color:'#FF9999',type:-1},
    ];
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
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
                        Xem lịch sử
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
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
                                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                                    </View>
                                    {
                                        (item.type== 1)? <Text>Thu nhập</Text> : <Text>Chi tiền</Text>
                                    }
                                </View>
                                <View style={{flex:0.35}}>
                                    {
                                        (item.type== 1)? 
                                        <Text style={{color:'#339900',fontSize:20,fontWeight:'bold'}}>+ {moneyFormat(item.price)}</Text> : 
                                        <Text style={{color:'#EE0000',fontSize:20,fontWeight:'bold'}}>- {moneyFormat(item.price)}</Text>
                                    }
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
            
        </SafeAreaView>
    );
}

  
export default History;