import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/WalletStyles";
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
// Import FireBase
import{initializeAuth,signInWithEmailAndPassword,} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useState } from 'react';
import { useEffect } from 'react';
function Wallet(){
    const width = Dimensions.get('window').width;
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app,{
    });
    const idUser = auth.currentUser.uid;
    const idReload = useSelector(state => state.reload.idReload);
    const [idIU,setIdIU] = useState(idReload);
    const accessToken =`Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const [dataIncomeAndSpending,setdataIncomeAndSpending] = useState([]);
    const [totalIncome,settotalIncome] = useState(10);
    const [totalSpending,settotalSpending] = useState(5);
    // Data biểu đồ tròn
    const [total,settotal] = useState(0);
    const [dataPieChart,setdataPieChart] = useState([
        {id:1,name:"Thu nhập",population:50,color:colorJar[0],legendFontColor: '#000',legendFontSize: 15},
        {id:2,name:"Chi tiêu",population:50,color:colorJar[1],legendFontColor: '#000',legendFontSize: 15},
    ]);
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
    // Định dạng tiền tệ VNĐ
    const moneyFormat = (amount) => {
        return amount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 3,
        });
      };
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false ,
        borderWidth:0.5,
      };
      useEffect(()=>{
        setdataIncomeAndSpending(
            [
                {id:1,name:'Thu nhập',price:totalIncome,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
                {id:2,name:'Chi tiêu',price:totalSpending,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
            ]
        )
     },[totalIncome,totalSpending])
    useEffect(()=>{
        
        axios.get(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type/${idUser}/1`,{
            headers: { authorization: accessToken },
        })
        .then((res)=>{
                var totalIncomeItem = 0;
                var totalSpendingItem = 0;
                res.data.map((item)=>{
                    totalIncomeItem += item.totalIncome;
                })
                settotalIncome(totalIncomeItem);
                res.data.map((item)=>{
                    totalSpendingItem += item.totalSpending
                })
                settotalSpending(totalSpendingItem);
        }).catch((err)=>{
            console.log(err);
        })
    },[idReload])
    useEffect(()=>{
        const totalMoney = totalIncome + totalSpending;
        var precentIncome = 100;
        var precentSpeeding = 0;
        if(totalIncome == 0 && totalSpending == 0){
            precentIncome = 100;
            precentSpeeding = 0;
        }
        else{
            precentIncome = totalIncome/totalMoney *100;
            precentSpeeding = totalSpending/totalMoney *100;
        }
        
        setdataPieChart([
            {id:1,name:"Thu nhập",population:precentIncome,color:colorJar[0],legendFontColor: '#000',legendFontSize: 15},
            {id:2,name:"Chi tiêu",population:precentSpeeding,color:colorJar[1],legendFontColor: '#000',legendFontSize: 15},
        ]);
        settotal(totalIncome-totalSpending);
    },[totalIncome,totalSpending])
    return(
        <SafeAreaView style={styles.container} >
            <ScrollView   style={styles.scrollview}>
                <LinearGradient colors={['#c2387c','#8390e6']} style={styles.containerHeader}>
                    <View style={styles.containerHeaderTop}>
                            <PieChart
                                data={dataPieChart}
                                height={150}
                                width={width}
                                chartConfig={chartConfigPie}
                                accessor="population"
                                paddingLeft='10'
                                />
                    </View>
                    <View style={styles.containerHeaderBottom}>
                            <Text style={{color:"#fff",fontSize:20,}}>Tài sản</Text>
                            <Text style={{color:"#fff",fontSize:20,}}>{moneyFormat(total)}</Text>
                    </View>
                </LinearGradient>
                <ScrollView scrollEnabled={false} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}} style={styles.containerInfoWallet}>
                    {
                        dataIncomeAndSpending.map((item)=>{
                            return (
                                <View key={item.id} style={styles.containerItem}>
                                    <View style={styles.containerItemTop}>
                                        <View style={{display:'flex',flexDirection:'row'}}>
                                            <Image source={require('../../../assets/icons/wallet.png')} style={{height:20,width:20,tintColor:item.color}}/>
                                            <Text style={{color:'#000',fontSize:20,marginLeft:10,}}>{item.name}</Text>
                                        </View>
                                        <Image source={item.icon} style={{height:20,width:20,tintColor:'#000',}}/>
                                    </View>
                                    <Text style={{color:'#000',fontSize:20,marginTop:10,marginLeft:10, marginRight:10,}}>{moneyFormat(item.price)}</Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:22,marginLeft:10, marginRight:10,}}>Thống kê tài sản</Text>
                    <View style={styles.containerListJars}>
                    <LineChart
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
                    <Text style={{color:'#000',fontSize:22,marginLeft:10, marginRight:10,}}>Thống kê tài sản nợ</Text>
                    <View style={styles.containerListJars}>
                    <LineChart
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
                {/* <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Cơ cấu tài sản</Text>
                    <View style={styles.containerListJars}>
                        <PieChart
                            data={dataPieChart}
                            height={300}
                            width={width}
                            chartConfig={chartConfigPie}
                            accessor="population"
                            paddingLeft='30'
                            />
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Wallet;