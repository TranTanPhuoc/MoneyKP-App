import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/SetPercentJarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
function SetPercentJar({navigation}){
const width = Dimensions.get('window').width;
   var tong = 0;
   const dataPieChart = [
    {id:1,name:'Thiết yếu',population:35,color:'#FF9999',legendFontColor: '#000',legendFontSize: 15},
    {id:2,name:'Giáo dục',population:20,color:'#6699FF',legendFontColor: '#000',legendFontSize: 15},
    {id:3,name:'Tiết kiệm',population:10,color:'#FF6600',legendFontColor: '#000',legendFontSize: 15},
    {id:4,name:'Hưởng thụ',population:5,color:'#00EE00',legendFontColor: '#000',legendFontSize: 15},
    {id:5,name:'Đầu tư',population:20,color:'#8DEEEE',legendFontColor: '#000',legendFontSize: 15},
    {id:6,name:'Thiện tâm',population:10,color:'#F4A460',legendFontColor: '#000',legendFontSize: 15},
    ];
    const [data, setData] = useState(dataPieChart);
    // Biểu đồ tròn
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false ,
        borderWidth:0.5,
    };
   
      const updateItemPopulation = (item, x) => {
        (x!=0)? item.population =x : item.population = 0;
        setData([...data]);
    };
      const updateItemName = (item, x) => {
        item.name =x 
        setData([...data]);
    };

    useEffect(()=>{
        console.log(data);
    },[data])
    const hanldSave = ()=>{
        (tong == 100)? Alert.alert("Thông báo","Lưu thành công") : Alert.alert("Thông báo", "Tổng tỉ lệ phải bằng 100");
    }
    const deleteItem = (item) => {
        const newData = data.filter(i => i.id !== item.id);
        setData(newData);
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
                        Tỉ lệ phân bổ các lọ
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <View style={styles.bodyView}>
                <View style={styles.viewBody}>
                    <PieChart
                        data={dataPieChart}
                        height={220}
                        width={width-40}
                        chartConfig={chartConfigPie}
                        accessor="population"
                        paddingLeft='30'
                    /> 
                </View>
                <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Thêm hủ mới</Text>
                        </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {data.map((item,index)=>{
                    tong += parseInt( item.population);
                    return(
                        <View key={item.id} style={styles.containerItem}>
                            <View style={{flex:0.7,alignItems:'center',height:"100%",display:'flex',flexDirection:'row'}}>
                                <Text style={{fontSize:20,fontWeight:'500',marginRight:10,}}>{index+1}.</Text>
                                <TextInput onChangeText={x => updateItemName(item, x)} style={{fontSize:20,fontWeight:'500'}}>{item.name}</TextInput>
                            </View>
                            <View style={{flex:0.3,justifyContent:'center',height:"100%",alignItems:'center',display:'flex',flexDirection:'row'}}>
                                <View style={{flex:0.8,}}>
                                    <TextInput keyboardType='number-pad'  onChangeText={x => updateItemPopulation(item, x)}  style={{fontSize:20,fontWeight:'500'}}>
                                        {item.population}
                                    </TextInput>
                                </View>
                                {
                                    (index == 0)? <View style={{flex:0.2,alignItems:'center'}}/> :  
                                <TouchableOpacity onPress={()=>deleteItem(item)} style={{flex:0.2,alignItems:'center'}}>
                                    <Feather name="x" size={24} color="red" />
                                </TouchableOpacity>
                                }
                                
                            </View>
                        </View>
                    );
                })}
                <View style={{borderWidth:0.5}}>
                   
                </View>
                <View style={{display:'flex',flexDirection:'row',margin:20,marginBottom:20,alignItems:'center',justifyContent:'space-between'}}>
                   <View style={{flex:0.7}}>
                   <Text style={{fontSize:20,fontWeight:'500'}}>Tổng cộng: </Text>
                   </View>
                   <View style={{flex:0.3}}>
                   <Text style={{fontSize:20,fontWeight:'500'}}>{tong}</Text>
                   </View>
                   
                </View>
                <View style={{display:'flex',flexDirection:'row',margin:20,marginBottom:20,justifyContent:'center'}}>
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={hanldSave} style={styles.buttonStyle}>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Lưu tỉ lệ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default SetPercentJar;