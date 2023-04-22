import { ScrollView, View } from 'react-native';
import { Text, SafeAreaView, Alert, Image, } from 'react-native';
import styles from "./styles/SetPercentJarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
// Import FireBase
import { initializeAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../firebase/ConnectFirebase";
import { colorJar } from '../../../assets/AppColors/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { reload_IU } from '../../redux/action/ActionRedux';
function SetPercentJar({ navigation,route }) {
    const { month, year } = route.params;
    const width = Dimensions.get('window').width;
    var tong = 0;
    const [dataPieChart, setdataPieChart] = useState([]);
    const idReload = useSelector(state => state.reload.idReload);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    // Biểu đồ tròn
    // Connect FireBase
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
    });
    const idUser = auth.currentUser.uid;
    const accessToken = `Bearer ${auth.currentUser.stsTokenManager.accessToken}`;
    const chartConfigPie = {
        backgroundColor: '#e26a00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        borderWidth: 0.5,
    };

    const updateItemPopulation = (item, x) => {
        (x != 0) ? item.population = x : item.population = 0;
        setData([...data]);
    };
    const updateItemName = (item, x) => {
        item.name = x
        setData([...data]);
    };

    const hanldSave = () => {
        const listdata = data.map((item) => {
            return {
                id: item.id,
                userId: item.userId,
                name: item.name,
                precent: item.population,
                availableBalances: item.availableBalances,
                totalSpending: item.totalSpending,
                totalIncome: item.totalIncome,
                type: item.type,
                monthNumber: item.month,
                yearNumber : item.year
            };
        });
        if (tong == 100) {
            axios({
                url: 'http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/create-list-basket',
                method: 'POST',
                headers: {
                    authorization: accessToken
                },
                data: listdata,
            }).then(() => {
                Alert.alert("Thông báo", "Cập nhật thành công");
                dispatch(reload_IU(idReload + 1));
                navigation.navigate("Tabs");
            }).catch((err) => {
                console.log(err)
            });
        }
        else {
            Alert.alert("Thông báo", "Tổng tỉ lệ phải bằng 100");
        }
    }
    const deleteItem = (item) => {
        if (item.population == 0 && tong == 100) {
            Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa lọ không ?", [
                {
                    text: 'Thoát',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: () => {
                        axios.delete(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/${item.id}`, {
                            headers: { authorization: accessToken },
                        }).then((res) => {
                            const newData = data.filter(i => i.id !== item.id);
                            setData(newData);
                            dispatch(reload_IU(idReload+1));
                            navigation.navigate("Tabs");

                        }).catch((err) => {
                            console.log(err)
                        })
                    },
                    style: 'delete',
                },
            ]);

        } else {
            Alert.alert("Thông báo", "Lọ có phần trăm bằng 0 mới được xóa và tổng phần trăm các lọ bằng 100");
        }

    };


    useEffect(() => {
        axios.post(`http://ec2-54-250-86-78.ap-northeast-1.compute.amazonaws.com:8080/api/basket/get-all-by-userId-and-type-by-time/${idUser}/1`, {
            monthNumber: parseInt(month),
            yearNumber: parseInt(year)
        }, {
            headers: { authorization: accessToken },
        })
            .then((res) => {
                setdataPieChart(res.data.map((item, index) => {
                    let randomColor = colorJar[index]
                    var obj = { id: item.id, name: item.name, population: item.precent, color: randomColor, legendFontColor: '#000', legendFontSize: 15 };
                    return obj;
                }));
                setData(res.data.map((item, index) => {
                    var objItem = {
                        id: item.id,
                        userId: item.userId,
                        name: item.name,
                        population: item.precent,
                        availableBalances: item.availableBalances,
                        totalSpending: item.totalSpending,
                        totalIncome: item.totalIncome,
                        type: item.type,
                        year : item.yearNumber,
                        month: item.monthNumber,
                    };
                    return objItem;
                }));
            }).catch((err) => {
                console.log(err);
            })
    }, [idReload]);
    const hanldhanldAddJar = () => {
        navigation.navigate("Jar",{ month : month , year : year});
    }
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.containerheader}>
                <View style={styles.containerheader_icon}>
                    <TouchableOpacity onPress={() => {
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
                        height={200}
                        width={width}
                        chartConfig={chartConfigPie}
                        accessor="population"
                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={hanldhanldAddJar} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Thêm lọ mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {data.map((item, index) => {
                    tong += parseInt(item.population);
                    return (
                        <View key={item.id} style={styles.containerItem}>
                            <View style={{ flex: 0.7, alignItems: 'center', height: "100%", display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 10, }}>{index + 1}.</Text>
                                <TextInput onChangeText={x => updateItemName(item, x)} style={{ fontSize: 16, fontWeight: '500',borderWidth:0.5,flex:1,height:40,marginHorizontal:10,paddingHorizontal:10,borderRadius:5}}>{item.name}</TextInput>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', height: "100%", alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                                <View style={{ flex: 0.75, borderWidth: 0.3, marginRight: 20, paddingTop: 5, paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput keyboardType='number-pad' onChangeText={x => updateItemPopulation(item, x)} style={{ fontSize: 16, fontWeight: '500' }}>
                                        {item.population}
                                    </TextInput>
                                </View>
                                {
                                    (index == 0) ? <View style={{ flex: 0.2, alignItems: 'center' }} /> :
                                        <TouchableOpacity onPress={() => deleteItem(item)} style={{ flex: 0.25, alignItems: 'center' }}>
                                            <Feather name="x" size={24} color="red" />
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>
                    );
                })}
                <View style={{ borderWidth: 0.5, marginLeft: 10, marginRight: 10, }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.75 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Tổng cộng: </Text>
                    </View>
                    <View style={{ flex: 0.25 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{tong}</Text>
                    </View>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', margin: 20, marginBottom: 20, justifyContent: 'center' }}>
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={hanldSave} style={styles.buttonStyle}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default SetPercentJar;