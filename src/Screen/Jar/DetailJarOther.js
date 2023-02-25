import {  View } from 'react-native';
import {  Text, SafeAreaView} from 'react-native';
import styles from "./styles/DetailJarStyles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
function DetailJarOther({navigation,route}){
    const {id,name,money} = route.params;
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
                        {name}
                    </Text>
                </View>
                <View style={styles.containerheader_icon}>

                </View>
            </View>
            <View style={styles.viewBody}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("JarOther",{id:id,name:name});
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>1. Thêm {name} mới</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("ExchangeOther",{id:id,name:name});
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>2. Thêm giao dịch mới</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("DetailOther",{id:id,name:name,money:money});
                }} style={styles.button}>
                    <Text style={{fontSize:18,marginLeft:20,}}>3. Xem biểu đồ</Text>
                </TouchableOpacity>
            </View>
           
        </SafeAreaView>
    );
}

  
export default DetailJarOther;