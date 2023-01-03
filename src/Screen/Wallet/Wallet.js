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

function Wallet(){
    const width = Dimensions.get('window').width;
    const data = [
        {id:1,name:'Thu nhập',price:10000000,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
        {id:2,name:'Chi tiêu',price:4000000,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
    ];
    const dataListJar = [
        {id:1,name:'Tài sản',price:0,color:'#FF9999',icon:require('../../../assets/icons/wallet.png')},
        {id:2,name:'Giấc mơ',price:0,color:'#6699FF',icon:require('../../../assets/icons/dream.png')},
        {id:3,name:'6 hủ',price:0,color:'#FF6600',icon:require('../../../assets/icons/jar.png')},
        {id:4,name:'Khoản nợ',price:0,color:'#F4A460',icon:require('../../../assets/icons/debts.png')},
    ];

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
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });

    const dataPieChart = [
        {id:1,name:'Tài sản',population:50,color:'#FF9999',legendFontColor: '#000',legendFontSize: 15},
        {id:2,name:'Giấc mơ',population:0,color:'#6699FF',legendFontColor: '#000',legendFontSize: 15},
        {id:3,name:'6 hủ',population:50,color:'#FF6600',legendFontColor: '#000',legendFontSize: 15},
        {id:4,name:'Khoản nợ',population:0,color:'#F4A460',legendFontColor: '#000',legendFontSize: 15},
    ];
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false ,
        borderWidth:0.5,
      };
    return(
        <SafeAreaView style={styles.container} >
            <ScrollView   style={styles.scrollview}>
                <LinearGradient colors={['#c2387c','#8390e6']} style={styles.containerHeader}>
                    <View style={styles.containerHeaderTop}>
                        
                    </View>
                    <View style={styles.containerHeaderBottom}>
                            <Text style={{color:"#fff",fontSize:24,}}>Tài sản</Text>
                    </View>
                </LinearGradient>
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
                                    <Text style={{color:'#000',fontSize:18,marginTop:10,marginLeft:10, marginRight:10,}}>{formatter.format(item.price)}</Text>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Danh sách Tài sản</Text>
                    <View style={styles.containerListJarItem}>
                            {
                                dataListJar.map((item)=>{
                                    return (
                                        <View key={item.id} style={styles.containerListJarItem_Item}>
                                                <View style={{flex:0.2,height:"100%",justifyContent:'center',marginLeft:10,}}>
                                                    <View style={{backgroundColor:item.color,height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                                            <Image source={item.icon} style={{tintColor:'#000'}}/>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.7,height:"100%",justifyContent:'center'}}>
                                                    <View style={{justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                                                        <Text style={{color:'#FF4040',fontSize:18,}}>{formatter.format(item.price)}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.1,height:"100%",justifyContent:'center',alignItems:'center'}}>
                                                    <AntDesign name="right" size={14} color="#000" />
                                                </View>
                                        </View>
                                    );
                                })
                            }
                    </View>
                </View>
                <View style={styles.containerListJar}>
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Thống kê tài sản</Text>
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
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Thống kê tài sản nợ</Text>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Wallet;