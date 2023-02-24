import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeOtherStyles";
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import SelectDropdown  from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import { Modal } from 'react-native';

// Import FireBase
import{initializeAuth,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reload_IU } from '../../redux/action/ActionRedux';
import { colorJar } from '../../../assets/AppColors/AppColors';

function ExchangeOther({navigation}){
    const [money,setMoney] = useState("");
    const [wordsMoney,setWordsMoney] = useState("");
    const [colorSelect,setColorSelect] = useState("#FF9999");
    const [modalVisible, setModalVisible] = useState(false);
    const [dateGD, setDate] = useState("");
    const [noteGD,setNoteGD] = useState("");
    const idReload = useSelector(state => state.reload.idReload);
    const dispatch = useDispatch();
    const [idIU,setidIU] = useState(idReload);
    const [colorLo,setcolorLo] = useState(colorJar[0]);
    const [colorTS,setcolorTS] = useState(colorJar[1]);
    const [colorTSNap,setcolorTSNap] = useState(colorJar[8]);
    const [colorTSRut,setcolorTSRut] = useState("");
    const [colorNo,setcolorNo] = useState("");
    const [colorNoThem,setcolorNoThem] = useState(colorJar[5]);
    const [colorNoGiam,setcolorNoGiam] = useState("");
    const [colorMoUoc,setcolorMoUoc] = useState("");
    const [typeBasket,settypeBasket] =useState(4);
    const hanldTaiSan = () =>{
        setcolorLo("#E6E6FA");
        setcolorTS(colorJar[1]);
        setcolorNo("#E6E6FA");
        setcolorMoUoc("#E6E6FA");
        settypeBasket(4);
    }
    const hanldTaiSanNap = () =>{
        setcolorTSNap(colorJar[8]);
        setcolorTSRut("#E6E6FA");
        settypeBasket(4);
    }
    const hanldTaiSanRut = () =>{
        setcolorTSRut(colorJar[9]);
        setcolorTSNap("#E6E6FA");
        settypeBasket(4);
    }
    const hanldMoUoc = () =>{
        setcolorTS("#E6E6FA");
        setcolorMoUoc(colorJar[2]);
        setcolorNo("#E6E6FA");
        setcolorLo("#E6E6FA");
        settypeBasket(3);
    }
    const hanldNo = () =>{
        setcolorTS("#E6E6FA");
        setcolorNo(colorJar[3]);
        setcolorLo("#E6E6FA");
        setcolorMoUoc("#E6E6FA");
        settypeBasket(2);
    }
    const hanldNoThem = () =>{
        setcolorNoThem(colorJar[5]);
        setcolorNoGiam("#E6E6FA");
    }
    const hanldNoGiam = () =>{
        setcolorNoGiam(colorJar[6]);
        setcolorNoThem("#E6E6FA");
    }
    function convertVNDToWords(amount) {
        const units = ["", "Một ", "Hai ", "Ba ", "Bốn ", "Năm ", "Sáu ", "Bảy ", "Tám ", "Chín "];
        const teens = ["", "Mười một ", "Mười hai ", "Mười ba ", "Mười bốn ", "Mười lăm ", "Mười sáu ", "Mười bảy ", "Mười tám ", "Mười chín "];
        const tens = ["", "Mười ", "Hai Mươi ", "Ba Mươi ", "Bốn Mươi ", "Năm Mươi ", "Sáu Mươi ", "Bảy Mươi ", "Tám Mươi ", "Chín Mươi "];
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
    // Connect FireBase
    // const app = initializeApp(firebaseConfig);
    // const auth = initializeAuth(app,{
    // });
    const [dataJar,setDataJar] = useState([]);
    const [dataJarTemp,setdataJarTemp] = useState([]);
    const [valuesDefaut,setvaluesDefaut] = useState("");

    const onDateChange =(date) => {
       setDate(date);
       setModalVisible(!modalVisible);
      }
    const clearField = ()=>{
        setMoney(0);
        setDate("");
        setNoteGD("");
    }
    const onHanldSave = ()  =>{
        var mess = "";
        if(money == 0){
            mess += "Số tiền phát sinh giao dịch không được bằng 0";
        }
        if(dateGD == ""){
            mess += "\nNgày giao dịch không được rỗng ";
        }
        if(noteGD == ""){
            mess += "\nGhi chú giao dịch không được rỗng ";
        }
        if(money == 0 || noteGD == "" || dateGD == "") {
            Alert.alert("Thông báo",mess);
        }
        if(money != 0 && noteGD != "" && dateGD != ""){
        }
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
                        <TouchableOpacity onPress={hanldTaiSan} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorTS}}>
                            <Text style={{fontSize:16}}>Tài sản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldMoUoc} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorMoUoc}}>
                            <Text style={{fontSize:16}}>Mơ ước</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hanldNo} style={{flex:0.33333,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorNo}}>
                            <Text style={{fontSize:16}}>Nợ</Text>
                        </TouchableOpacity>
                    </View>
                    {   typeBasket == 4 &&
                        <View style={[styles.containerTop,{marginLeft:40,marginRight:40}]}>
                            <TouchableOpacity onPress={hanldTaiSanNap} style={{flex:0.5,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorTSNap}}>
                                <Text style={{fontSize:16}}>Nạp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={hanldTaiSanRut} style={{flex:0.5,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorTSRut}}>
                                <Text style={{fontSize:16}}>Rút</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {   typeBasket == 2 &&
                        <View style={[styles.containerTop,{marginLeft:40,marginRight:40}]}>
                            <TouchableOpacity onPress={hanldNoThem} style={{flex:0.5,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorNoThem}}>
                                <Text style={{fontSize:16}}>Thêm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={hanldNoGiam} style={{flex:0.5,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:colorNoGiam}}>
                                <Text style={{fontSize:16}}>Giảm</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.containerInputMoney}>
                        <View style={{flex:0.2,justifyContent:'flex-start',alignItems:'center',}}>
                                <Text style={{fontSize:16}}>Số tiền</Text>
                        </View>
                        <View style={{flex:0.6,justifyContent:'center',alignItems:'center',}}>
                            <TextInput keyboardType='number-pad' onChangeText={x=> {
                                (x>10000000001)? Alert.alert("Lỗi",`Không nhập quá 10 tỷ`) :setMoney(x)
                            }} value={money} placeholder="0" placeholderTextColor={'#000'} style={{fontSize:30,flex:1,}}/>
                        </View>
                        <View style={{flex:0.2,justifyContent:'center',alignItems:'center',}}>
                                <View style={{width:50,height:30,backgroundColor:'#F0A587',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:16,fontWeight:'700'}}>VNĐ</Text>
                                </View>
                        </View>
                    </View>
                    {money != null && 
                        <View style={styles.containerMoneyWords}>
                                <Text style={{fontSize:16,fontStyle:'italic',textAlign:'center'}}>{wordsMoney}</Text>
                        </View>
                    }
                    <View style={styles.containerJar}>
                        <SelectDropdown 
                            data={dataJar} 
                            defaultButtonText={valuesDefaut} 
                            buttonTextStyle = {{fontSize:16,}}
                            onSelect={(selectedItem, index) => { 
                                setvaluesDefaut(selectedItem);
                                (index == 0) ?  setColorSelect("#FF9999") : (index == 1)? setColorSelect("#6699FF") : 
                                (index == 2)? setColorSelect("#FF6600") : (index == 3) ? setColorSelect("#00EE00") :
                                (index == 4) ? setColorSelect("#8DEEEE") : setColorSelect("#F4A460")
                                dataJarTemp.map((item,index)=>{
                                    if(selectedItem == item.name){
                                        setisJar(item.id)
                                        settotalIncome(item.totalIncome);
                                        settotalSpending(item.totalSpending);
                                        setNameJar(item.name);
                                        SetprecentJar(item.precent);
                                    }
                                })
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
                                            <Text style={{fontSize:22,marginLeft:20}}>{valuesDefaut}</Text>
                                            <Text style={{fontSize:16,marginLeft:20,marginTop:20,}}>Nhấn để thay đổi</Text>
                                        </View>
                                    </View>
                                );
                            }}
                            buttonStyle = {styles.containerSelectDropDown}
                            />
                    </View>
                    <View style={styles.containerNote}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}  style={{height:60,display:'flex',flexDirection:'row',borderRadius:20,}}>
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
                            <View style={{height:50,display:'flex',flexDirection:'row'}}>
                                <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                                        <Image source={require('../../../assets/icons/note.png')}/>
                                </View>
                                <View  style={{flex:0.8,justifyContent:'center',borderBottomWidth:1}}>
                                    <TextInput value={noteGD} onChangeText={x=>setNoteGD(x)} placeholder='Nhập chú thích giao dịch' style={{fontSize:16,marginLeft:10,marginRight:20,}}/>
                                </View>
                            </View>
                            <View style={{marginBottom:20}}>

                            </View>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack();
                        }} style={styles.buttonStyle}>
                            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onHanldSave} style={styles.buttonStyle}>
                            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default ExchangeOther;