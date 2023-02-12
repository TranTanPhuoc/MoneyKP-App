import {  Text, SafeAreaView, ScrollView, View, Image, FlatList, Dimensions, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/HomeStyles";
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';
import 'intl/locale-data/jsonp/en';
import { AntDesign } from '@expo/vector-icons';
import { PieChart, BarChart } from "react-native-chart-kit";
// Import FireBase
import{initializeAuth,signInWithEmailAndPassword,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Home({navigation}){
    const { height, width } = Dimensions.get('window');
    const idReload = useSelector(state => state.reload.idReload);
    const [idIU,setIdIU] = useState(idReload);
    const data = [
        {id:1,name:'Thu nhập',price:10000000,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
        {id:2,name:'Chi tiêu',price:4000000,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
    ];
    const data2 = [
        {id:3,name:'Tài sản',price:20000000,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
        {id:4,name:'Khoản nợ',price:0,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
    ];
    const [dataListJar,setdataListJar] = useState([]);
    // Data biểu đồ tròn
    const [dataPieChart,setdataPieChart] = useState([]);
    
    
    // Data biểu đồ cột
    const dataLineChart = {
        labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4','Tuần 5'],
        datasets: [
            {
              data: [20, 45, 28, 80, 99],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2 // optional
            },
            {
              data: [30, 55, 38, 90, 109],
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              strokeWidth: 2 // optional
            }
          ]
      };
    // Định dạng tiền tệ VNĐ
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
      };

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
      // Biểu đồ cột
      const chartConfigBarChart = {
        backgroundGradientFrom: '#9E9E9E',
        backgroundGradientTo: '#B8B8C8',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
        }
      };
    // const [widthTotalIncome,setWidthIcome] = useState(0);
     // Connect FireBase
     const app = initializeApp(firebaseConfig);
     const auth = initializeAuth(app,{
     });
    useEffect(()=>{
        const idUser = auth.currentUser.uid;
        const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/1`,{
            headers: { authorization: accessToken },
        })
        .then((res)=>{
                setdataListJar(res.data);
                setdataPieChart(res.data.map((item)=>{
                    let randomColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                    var obj = {id:item.id,name:item.name,population:item.precent,color:randomColor,legendFontColor: '#000',legendFontSize: 15};
                    return obj;
                }));
        }).catch((err)=>{
            console.log(err);
        })
    },[idReload])
        

    

  
     return(
        <SafeAreaView style={styles.container} >
            <ScrollView   style={styles.scrollview}>
                <View style={styles.containerTop}>
                    <View style={styles.containerTopImage}>
                        <Image source={{uri:'https://res.cloudinary.com/drljnqaai/image/upload/v1671783897/KhoaLuan/313270093_816356566288400_2893180884073968601_n.jpg_gufop7.jpg'}} style={{height:60,width:60,borderRadius:40,}}/>
                    </View>
                    <View style={styles.containerTopName}>
                        <View style={{flex:0.2,justifyContent:'flex-end'}}>
                            <Text style={{color:'#000',fontSize:18,}}>Chào buổi chiều !</Text>
                        </View>
                        <View style={{flex:0.8,justifyContent:'center'}}>
                            <Text style={{color:'#000',fontSize:24,fontWeight:'bold'}}>Trần Tấn Phước </Text>
                        </View>
                    </View>
                    <View style={styles.containerTopIcon}>
                        <View style={{margin:10,}}>
                            <Image style={{tintColor:'#000',height:24,width:24}} source={require('../../../assets/icons/support.png')} />
                        </View>
                        <View style={{margin:10,}}>
                        <Image style={{tintColor:'#000',height:24,width:24}} source={require('../../../assets/icons/bell.png')} />
                        </View>
                    </View>
                </View>
                <ScrollView scrollEnabled={false} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}} style={styles.containerInfoWallet}>
                    {
                        data.map((item)=>{
                            return (
                                <View key={item.id} style={styles.containerItem}>
                                    <View style={styles.containerItemTop}>
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                            <Image source={require('../../../assets/icons/wallet.png')} style={{height:20,width:20,tintColor:item.color}}/>
                                            <Text style={{color:'#000',fontSize:18,marginLeft:10,}}>{item.name}</Text>
                                        </View>
                                        <Image source={item.icon} style={{height:20,width:20,tintColor:'#000',}}/>
                                    </View>
                                    <View>
                                        <Text style={{color:'#000',fontSize:18,marginTop:10,marginLeft:10, marginRight:10,}}>{moneyFormat(item.price)}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <ScrollView scrollEnabled={false} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}} style={styles.containerInfoWallet}>
                    {
                        data2.map((item)=>{
                            return (
                                <View key={item.id} style={styles.containerItem}>
                                    <View style={styles.containerItemTop}>
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                            <Image source={require('../../../assets/icons/wallet.png')} style={{height:20,width:20,tintColor:item.color}}/>
                                            <Text style={{color:'#000',fontSize:18,marginLeft:10,}}>{item.name}</Text>
                                        </View>
                                        <Image source={item.icon} style={{height:20,width:20,tintColor:'#000',}}/>
                                    </View>
                                    <Text style={{color:'#000',fontSize:18,marginTop:10,marginLeft:10, marginRight:10,}}>{moneyFormat(item.price)}</Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Danh sách hũ</Text>
                    <View style={styles.containerListJarItem}>
                            {
                                dataListJar.map((item)=>{
                                    return (
                                        <TouchableOpacity onPress={()=>{
                                            navigation.navigate("DetailJar");
                                        }} key={item.id} style={styles.containerListJarItem_Item}>
                                                <View style={{flex:0.2,height:"100%",justifyContent:'center',marginLeft:10,}}>
                                                    <View style={{backgroundColor:item.color,height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                                            <Image source={require('../../../assets/icons/jar.png')} style={{tintColor:'#000'}}/>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.7,height:"100%",}}>
                                                    <View style={{flex:0.4,justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                                                        <Text style={{color:'#FF4040',fontSize:16,}}>{moneyFormat(item.totalIncome)}</Text>
                                                    </View>
                                                    <View style={{flex:0.2,justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <Text style={{color:'#000',fontSize:18,}}>Khả dụng</Text>
                                                        <Text style={{color:'#000',fontSize:16,}}>{(item.totalIncome == 0 && item.totalSpending == 0)? 0 : ((item.totalIncome-item.totalSpending)/item.totalIncome * 100).toFixed(2)} %</Text>
                                                    </View>
                                                    <View style={{flex:0.3,alignItems:'center',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <Text style={{color:'#000',fontSize:18,}}>Tiền khả dụng: </Text>
                                                        <Text style={{color:'red',fontSize:16,}}>{moneyFormat(item.totalIncome-item.totalSpending)}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                                                    <AntDesign name="right" size={14} color="#000" />
                                                </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Báo cáo thu chi</Text>
                    <View style={styles.containerListJars}>
                    <BarChart
                        data={dataLineChart}
                        width={width-40}
                        height={200}
                        chartConfig={chartConfigBarChart}
                        withInnerLines={false}
                        withOuterLines={false}
                        withDots={false}
                        withShadow={false}
                        fromZero={true}
                        bezier
                    />
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Cơ cấu các hủ</Text>
                    <View style={styles.containerListJars}>
                        <PieChart
                            data={dataPieChart}
                            height={250}
                            width={width}
                            chartConfig={chartConfigPie}
                            accessor="population"
                            paddingLeft='10'
                            />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Home;