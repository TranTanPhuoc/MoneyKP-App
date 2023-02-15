import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/HistoryStyles";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
function History({navigation}){
   const [History,setHistory] = useState("");
   const dataTK = ['Tất cả','Theo tháng','Theo năm'];
   const dataJar = ['Tất cả','Thu nhập','Chi tiêu'];
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
    const [valuesDefaut,setvaluesDefaut] = useState("Tất cả");
    const [selectDefaut,setselectDefaut] = useState("Tất cả");
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