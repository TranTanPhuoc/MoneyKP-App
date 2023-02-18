import { ScrollView, View } from 'react-native';
import {  Text, SafeAreaView, Alert, Image,} from 'react-native';
import styles from "./styles/DetailJarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
function DetailJar({navigation,route}){
    const {id,name} = route.params;
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
                        Chi tiết lọ
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <View style={styles.viewBody}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Exchange");
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>1. Thu nhập, chi tiêu, chuyển tiền</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("History",{id:id,name:name});
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>2. Xem lịch sử giao dịch</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Chart",{id:id,name:name});
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>3. Thống kê chi tiêu theo tháng, năm</Text>
                </TouchableOpacity>
            </View>
           
        </SafeAreaView>
    );
}

  
export default DetailJar;