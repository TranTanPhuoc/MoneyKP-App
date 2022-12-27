import {  Text, SafeAreaView, ScrollView, View, Image, FlatList,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/HomeStyles";
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';
import 'intl/locale-data/jsonp/en';
import { AntDesign } from '@expo/vector-icons';
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

function Home(){

    const data = [
        {id:1,name:'Thu nhập',price:10000000,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
        {id:2,name:'Chi tiêu',price:4000000,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
    ];
    const data2 = [
        {id:3,name:'Tài sản',price:20000000,color:'#03fc41',icon:require('../../../assets/icons/add.png')},
        {id:4,name:'Khoản nợ',price:0,color:'#fc3030',icon:require('../../../assets/icons/minus.png')},
    ];
    const dataListJar = [
        {id:1,name:'Thiết yếu',price:0,color:'#FF9999'},
        {id:2,name:'Giáo dục',price:0,color:'#6699FF'},
        {id:3,name:'Tiết kiệm',price:0,color:'#FF6600'},
        {id:4,name:'Hưởng thụ',price:0,color:'#00EE00'},
        {id:5,name:'Đầu tư',price:0,color:'#8DEEEE'},
        {id:6,name:'Thiện tâm',price:0,color:'#F4A460'},
    ];
    const dataJar = [
        {id:1,name:'Thiết yếu',tl:35,color:'#FF9999'},
        {id:2,name:'Giáo dục',lt:20,color:'#6699FF'},
        {id:3,name:'Tiết kiệm',lt:10,color:'#FF6600'},
        {id:4,name:'Hưởng thụ',lt:5,color:'#00EE00'},
        {id:5,name:'Đầu tư',lt:20,color:'#8DEEEE'},
        {id:6,name:'Thiện tâm',lt:10,color:'#F4A460'},
    ];
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      });
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
                                    <Text style={{color:'#000',fontSize:18,marginTop:10,marginLeft:10, marginRight:10,}}>{formatter.format(item.price)}</Text>
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
                                    <Text style={{color:'#000',fontSize:18,marginTop:10,marginLeft:10, marginRight:10,}}>{formatter.format(item.price)}</Text>
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
                                        <View key={item.id} style={styles.containerListJarItem_Item}>
                                                <View style={{flex:0.2,height:"100%",justifyContent:'center',marginLeft:10,}}>
                                                    <View style={{backgroundColor:item.color,height:50,width:50,borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                                            <Image source={require('../../../assets/icons/jar.png')} style={{tintColor:'#000'}}/>
                                                    </View>
                                                </View>
                                                <View style={{flex:0.7,height:"100%",}}>
                                                    <View style={{flex:0.4,justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                                                        <Text style={{color:'#FF4040',fontSize:18,}}>{formatter.format(item.price)}</Text>
                                                    </View>
                                                    <View style={{flex:0.2,justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <Text style={{color:'#000',fontSize:18,}}>Khả dụng</Text>
                                                        <Text style={{color:'#000',fontSize:18,}}>10%</Text>
                                                    </View>
                                                    <View style={{flex:0.3,alignItems:'center',display:'flex',flexDirection:'row'}}>
                                                        <View style={{backgroundColor:'red',width:"10%",height:5,borderRadius:20}}>

                                                        </View>
                                                        <View style={{backgroundColor:'blue',width:"90%",height:5,borderRadius:20,}}>

                                                        </View>
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
                    <Text style={{color:'#000',fontSize:24,marginLeft:10, marginRight:10,}}>Cơ cấu các hủ</Text>
                    <View style={styles.containerListJars}>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Home;