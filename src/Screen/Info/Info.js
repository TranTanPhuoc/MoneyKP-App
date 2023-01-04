import {  Text, SafeAreaView, ScrollView, View,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/InfoStyles";
function Info(){
    return(
        <SafeAreaView style={styles.container} >
            <ScrollView   style={styles.scrollview}>
                <View style={{marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'justify'}}>Phương pháp 6 lọ là một phương pháp quản lý chi tiêu cá nhân mà người dùng chia chi tiêu của họ vào 6 lọ để giúp họ quản lý tài chính một cách hiệu quả hơn. 
                    Tuy nhiên, tên của các lọ có thể khác nhau tùy theo người dùng. Ví dụ, bạn có thể chia các lọ như sau:</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>1.  Chi tiêu cần thiết: Đây là các chi tiêu không thể tránh khỏi, chẳng hạn như tiền điện, nước, điện thoại và tiền ăn mặc.</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>2.  Chi tiêu giáo dục: Đây là tiền được dành cho việc học tập và giáo dục, chẳng hạn như học phí, sách và các chi phí khác liên quan đến giáo dục.</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>3.  Tiền tiết kiệm: Đây là tiền được gửi vào tài khoản tiết kiệm hoặc các loại tiền gửi khác như tiền gửi lãi suất cao.</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>4.  Chi tiêu hưởng thụ: Đây là các chi tiêu dành cho việc hưởng thụ cuộc sống, chẳng hạn như đi du lịch, mua sắm và tham gia các hoạt động giải trí.</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>5.  Chi tiêu đầu tư: Hộp này dành cho các khoản tiền đầu tư vào các loại tài sản như bất động sản, cổ phiếu, hoặc quỹ đầu tư.</Text>
                </View>
                <View style={{marginLeft:20,marginTop:10,}}>
                    <Text style={{fontSize:18,fontWeight:'normal',textAlign:'justify'}}>6.  Chi tiêu thiện tâm: Hộp này dành cho các khoản chi tiêu liên quan đến việc giúp đỡ người khác và hoạt động từ thiện.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

  
export default Info;