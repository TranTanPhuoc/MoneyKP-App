import { Button, DatePickerAndroid, ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/ChartStyles";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Modal } from 'react-native';
// Import FireBase
import{initializeAuth,signInWithEmailAndPassword,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Chart({navigation,route}){
   const {id,name} = route.params;
   const dataTK = ['Tất cả','Theo tháng','Theo năm'];
   const dataJar = ['Tất cả','Thu nhập','Chi tiêu'];

const [dataChart,setdataChart] = useState([]);
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
    };
    const [valuesDefaut,setvaluesDefaut] = useState("Tất cả");
    const [selectDefaut,setselectDefaut] = useState("Tất cả");
    const idReload = useSelector(state => state.reload.idReload);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [month,setMonth] = useState(0);
    const [year,setYear] = useState(2023);
    const onDateChange = (event, selectedDate) => {
        if (selectedDate) {
          const newDate = new Date(selectedDate);
          setSelectedDate(newDate);
        }
      };
    const hanldChon = ()=>{
        setShowPicker(false);
        setMonth(selectedDate.getMonth() + 1);
        setYear(selectedDate.getFullYear());
    }
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    useEffect(()=>{
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/transaction/get-all-by-userId-and-basketId/${idUser}/${id}`,{
            headers: { authorization: accessToken },
        }).then((res)=>{
            setdataChart(res.data.map((item,index)=>{
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
    return(
        <SafeAreaView style={styles.container} >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPicker}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                                <View style={{justifyContent:'flex-start',flex:1,marginLeft:30,height:30}}>

                                </View>
                                <View style={{justifyContent:'flex-end',flex:1,marginRight:30,}}>
                                    <TouchableOpacity onPress={hanldChon}>
                                        <Text style={{fontSize:24,color:'#0099FF',textAlign:'right',fontWeight:'normal'}}>Chọn</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="spinner"
                                onChange={onDateChange}
                            />
                        </View>
                    </View>
            </Modal>
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
                <View style={styles.containerItem}>
                        <SelectDropdown 
                            data={dataTK} 
                            defaultButtonText={valuesDefaut} 
                            buttonTextStyle = {{fontSize:16,}}
                            onSelect={(selectedItem, index) => { 
                                setvaluesDefaut(selectedItem);
                            }} 
                            renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'filter' : 'filter'} color={'black'} size={20} />;
                            }}
                            renderCustomizedButtonChild= {value =>{
                                return (
                                    <View style={{ flexDirection: 'row',alignItems:'center',display:'flex',justifyContent:"center"}}>
                                            <Text style={{fontSize:20}}>{valuesDefaut}</Text>
                                    </View>
                                );
                            }}
                            buttonStyle = {styles.containerSelectDropDown}
                        />

                        <SelectDropdown 
                        data={dataJar} 
                        defaultButtonText={selectDefaut} 
                        buttonTextStyle = {{fontSize:16,}}
                        onSelect={(selectedItem, index) => { 
                            setselectDefaut(selectedItem);
                        }} 
                        renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-down' : 'chevron-right'} color={'black'} size={16} />;
                        }}
                        renderCustomizedButtonChild= {value =>{
                            return (
                                <View style={{ flexDirection: 'row',alignItems:'center',display:'flex',justifyContent:"center"}}>
                                        <Text style={{fontSize:20}}>{selectDefaut}</Text>
                                </View>
                            );
                        }}
                        buttonStyle = {styles.containerSelectDropDown}
                    />
                </View>
                {
                    (valuesDefaut == "Theo tháng" || valuesDefaut == "Theo năm" ) &&
                    <View style={styles.containerItemSelect}>
                        <TouchableOpacity style={styles.buttom} onPress={() => setShowPicker(true)} >
                                <Text>
                                    Chọn tháng
                                </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold',marginTop:10,}}>Tháng: {selectedDate.toLocaleDateString('VN', { month: 'long', year: 'numeric' })}</Text>
                    </View>
                }
                {
                    dataChart.map((item,index)=>{
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
                                        <Text style={{color:'#339900',fontSize:20,fontWeight:'bold'}}>+ {moneyFormat(item.moneyTransaction)}</Text> : 
                                        <Text style={{color:'#EE0000',fontSize:20,fontWeight:'bold'}}>- {moneyFormat(item.moneyTransaction)}</Text>
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

  
export default Chart;