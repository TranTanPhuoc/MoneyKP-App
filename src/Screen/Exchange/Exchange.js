import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeStyles";
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useEffect } from 'react';
import SelectDropdown  from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Calendar from 'expo-calendar';
import CalendarPicker from 'react-native-calendar-picker';
import { Modal } from 'react-native';
import moment from 'moment';
function Exchange({navigation}){
    const [colorThuNhap,setcolorThuNhap] = useState("#F9B79C");
    const [colorChiTieu,setcolorChiTieu] = useState(""); // "#91D8E5"
    const [colorChuyenTien,setcolorChuyenTien] = useState(""); // "#fedcba"
    const [money,setMoney] = useState("");
    const [wordsMoney,setWordsMoney] = useState("");
    const [valuesDefaut,setvaluesDefaut] = useState('Thiết yếu');
    const [colorSelect,setColorSelect] = useState("#FF9999");
    const [modalVisible, setModalVisible] = useState(false);
    const [dateGD, setDate] = useState("");
    const [noteGD,setNoteGD] = useState("");
    const [tagGD,setTagGD] = useState("");
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
    const data = ["Thiếu yếu", "Giáo dục", "Tiết kiệm", "Hưởng thụ","Đầu tư","Thiện tâm"];
    const onDateChange =(date) => {
       setDate(date);
       setModalVisible(!modalVisible);
      }
    return(
        <SafeAreaView style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <CalendarPicker onDateChange={onDateChange}>
                            </CalendarPicker>
                        </View>
                    </View>
            </Modal>
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
                <View style={styles.containerJar}>
                    <SelectDropdown 
                        data={data} 
                        defaultButtonText={valuesDefaut} 
                        buttonTextStyle = {{fontSize:16,}}
                        onSelect={(selectedItem, index) => { 
                            setvaluesDefaut(selectedItem);
                            (index == 0) ?  setColorSelect("#FF9999") : (index == 1)? setColorSelect("#6699FF") : 
                            (index == 2)? setColorSelect("#FF6600") : (index == 3) ? setColorSelect("#00EE00") :
                            (index == 4) ? setColorSelect("#8DEEEE") : setColorSelect("#F4A460")
                        }} 
                        renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={18} />;
                        }}
                        renderCustomizedButtonChild= {value =>{
                            return (
                                <View style={{ flexDirection: 'row', marginRight: 8,alignItems:'center',flex:1}}>
                                    <View style={{flex:0.3,height:"100%",justifyContent:'center',alignItems:'center'}}>
                                        <View style={[styles.containercustomSelectDropDown,{backgroundColor:colorSelect}]}>
                                            <Image source={require('../../../assets/icons/jar.png')} />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:26,marginLeft:20}}>{valuesDefaut}</Text>
                                        <Text style={{fontSize:18,marginLeft:20,marginTop:20,}}>Nhấn để thay đổi</Text>
                                    </View>
                                </View>
                            );
                        }}
                        buttonStyle = {styles.containerSelectDropDown}
                        />
                </View>
                <View style={styles.containerNote}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}  style={{flex:0.3,display:'flex',flexDirection:'row',borderRadius:20,}}>
                            <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../../assets/icons/calendar.png')}/>
                            </View>
                            <View  style={{flex:0.8,justifyContent:'center',alignItems:'center',borderBottomWidth:1,display:'flex',flexDirection:'row',width:"100%",}}>
                                <View style={{flex:0.8,width:"100%"}}>
                                    <Text style={{fontSize:16,}}>{dateGD.toString()}</Text>
                                </View>
                                <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../../assets/icons/reset.png')}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:0.3,display:'flex',flexDirection:'row'}}>
                            <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../../assets/icons/note.png')}/>
                            </View>
                            <View  style={{flex:0.8,justifyContent:'center',borderBottomWidth:1}}>
                                 <TextInput value={noteGD} onChange={x=>setNoteGD(x)} placeholder='Nhập chú thích giao dịch' style={{fontSize:16,marginLeft:10,marginRight:20,}}/>
                            </View>
                        </View>
                        <View style={{flex:0.25,display:'flex',flexDirection:'row'}}>
                            <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../../assets/icons/tag.png')}/>
                            </View>
                            <View  style={{flex:0.8,justifyContent:'center',borderBottomWidth:1}}>
                                <TextInput value={tagGD} onChange={x=>setTagGD(x)} placeholder='Nhập hashTag giao dịch' style={{fontSize:16,marginLeft:10,marginRight:20,}}/>
                            </View>
                        </View>
                        <View style={{flex:0.15,display:'flex',flexDirection:'row',borderRadius:20,}}>

                        </View>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={()=>{
                         navigation.goBack();
                    }} style={styles.buttonStyle}>
                        <Text style={{fontSize:22,color:'#fff',fontWeight:'bold'}}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={{fontSize:22,color:'#fff',fontWeight:'bold'}}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Exchange;