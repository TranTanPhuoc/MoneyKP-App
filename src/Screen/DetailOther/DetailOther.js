import {  ScrollView, View } from 'react-native';
import {  Text, SafeAreaView} from 'react-native';
import styles from "./styles/DetailOtherStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
function DetailOther({navigation,route}){
    // Định dạng tiền tệ VNĐ
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
      };
    const [hidden,sethidden] = useState(true);
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
                        Tài sản
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
                        <Text style={{fontSize:35,fontWeight:'700'}}>{moneyFormat(12332)}</Text>
                    </View>
                </View>
                <View style={{marginTop:20,}}>
                    <View style={styles.containerBody}>
                        <View style={{marginTop:20,marginLeft:20,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>Lịch sử nạp, tiêu</Text>
                            <TouchableOpacity onPress={()=> sethidden(!hidden)} style={{marginRight:20,}}>
                                {
                                    hidden? <AntDesign name="down" size={24} color="black" /> : <AntDesign name="up" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            !hidden && 
                            <View style={{marginTop:20,marginLeft:20,}}>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                                <Text style={{fontSize:20}}>1.fsdfsdjfhsdjf</Text>
                            </View>
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