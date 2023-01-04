import {  Text, SafeAreaView, Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeStyles";
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useEffect } from 'react';
function Exchange(){
    const [colorThuNhap,setcolorThuNhap] = useState("#F9B79C");
    const [colorChiTieu,setcolorChiTieu] = useState(""); // "#91D8E5"
    const [colorChuyenTien,setcolorChuyenTien] = useState(""); // "#fedcba"
    const [money,setMoney] = useState("");
    const [wordsMoney,setWordsMoney] = useState("");
    const hanldThuNhap = () =>{
        setcolorThuNhap("#F9B79C");
        setcolorChiTieu("#E6E6FA");
        setcolorChuyenTien("#E6E6FA");
    }
    const hanldChiTieu = () =>{
        setcolorThuNhap("#E6E6FA");
        setcolorChiTieu("#91D8E5");
        setcolorChuyenTien("#E6E6FA");
    }
    const hanldChuyenTien = () =>{
        setcolorThuNhap("#E6E6FA");
        setcolorChiTieu("#E6E6FA");
        setcolorChuyenTien("#fedcba");
    }

    function convertVNDToWords(amount) {
        const units = ["", "Một ", "Hai ", "Ba ", "Bốn ", "Năm ", "Sáu ", "Bảy ", "Tám ", "Chín "];
        const teens = ["", "Mười một ", "Mười hai ", "Mười ba ", "Mười bốn ", "Mười lăm ", "Mười sáu ", "Mười bảy ", "Mười tám ", "Mười chín "];
        const tens = ["", "Mười ", "Hai Mươi ", "Ba Mươi ", "Bốn Mươi ", "Năm Mươi ", "Sáu Mươi ", "Bảy Mươi ", "Tám Mươi ", "Chín Mươi "];
        const high = ["", "Ngàn ", "Triệu ", "Tỷ ", "Ngàn tỷ ", "Triệu tỷ "];
      
        
        let words = "";
      
        let remainingAmount = amount;
        let unit = 0;
      
        while (remainingAmount > 0) {
          var divisor = Math.pow(1000, unit);
          var quotient = Math.floor(remainingAmount / divisor);
          remainingAmount -= quotient * divisor;
          unit += 1;
      
          if (quotient > 0) {
            if (quotient > 999999999) {
                words += units[Math.floor(quotient / 1000000000)] + "Tỷ ";
                quotient = quotient % 1000000000;
            }
            if(quotient > 99999999){
                words += units[Math.floor(quotient / 100000000)]+ "Trăm  ";
                quotient = quotient % 100000000;
                if(quotient<999999){
                    words += "Triệu "
                  }
            }
            if (quotient > 9999999) {
              words += tens[Math.floor(quotient / 10000000)] ;
              quotient = quotient % 10000000;
              if(quotient<999999){
                words += "Triệu "
              }
            }
            if (quotient > 999999) {
              words += units[Math.floor(quotient / 1000000)] + "Triệu ";
              quotient = quotient % 1000000;
            }
            if(quotient > 99999){
                words += units[Math.floor(quotient / 100000)]+ "Trăm ";
                quotient = quotient % 100000;
                if(quotient<999){
                    words += "Ngàn "
                }
            }
            if(quotient > 9999){
                words += tens[Math.floor(quotient / 10000)] ;
                quotient = quotient % 10000;
                if(quotient<999){
                    words += "Ngàn "
                }
            }
            if (quotient > 999) {
              words += units[Math.floor(quotient / 1000)] + "Ngàn ";
              quotient = quotient % 1000;
            }
            if (quotient > 99) {
              words += units[Math.floor(quotient / 100)] + "Trăm ";
              quotient = quotient % 100;
            }
            if (quotient > 10 && quotient < 20) {
              words += teens[quotient - 10];
              quotient = quotient % 10;
            } else {
              words += tens[Math.floor(quotient / 10)];
              words += units[quotient % 10];
            }
            words += " ";
          }
        }
        return words;
      }

    useEffect(()=>{
        (money > 0)?
            setWordsMoney(convertVNDToWords(money)+"Đồng") : setWordsMoney("");
        
    },[money])

    return(
        <SafeAreaView style={styles.container} >
            <ScrollView  style={styles.scrollview}>
                <View style={styles.containerTop}>
                    <TouchableOpacity onPress={hanldThuNhap} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorThuNhap}}>
                        <Text style={{fontSize:16}}>Thu nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChiTieu} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorChiTieu}}>
                        <Text style={{fontSize:16}}>Chi tiêu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hanldChuyenTien} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorChuyenTien}}>
                        <Text style={{fontSize:16}}>Chuyển tiền</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInputMoney}>
                    <View style={{flex:0.2,justifyContent:'flex-start',alignItems:'center',}}>
                            <Text style={{fontSize:20}}>Số tiền</Text>
                    </View>
                    <View style={{flex:0.6,justifyContent:'center',alignItems:'center',}}>
                        <TextInput keyboardType='number-pad' onChangeText={x=> {
                            (x>10000000001)? Alert.alert("Lỗi",`Không nhập quá 10 tỷ`) :setMoney(x)
                        }} value={money} placeholder="0" placeholderTextColor={'#000'} style={{fontSize:35,flex:1,}}/>
                    </View>
                    <View style={{flex:0.2,justifyContent:'center',alignItems:'center',}}>
                            <View style={{width:50,height:30,backgroundColor:'#F0A587',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:18,fontWeight:'700'}}>VNĐ</Text>
                            </View>
                    </View>
                </View>
                {money != null && 
                    <View style={styles.containerMoneyWords}>
                            <Text style={{fontSize:20,fontStyle:'italic',textAlign:'center'}}>{wordsMoney}</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Exchange;