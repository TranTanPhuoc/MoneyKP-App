import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/ExchangeStyles";
function Exchange(){
    return(
        <SafeAreaView style={styles.container} >
            <Text>Exchange</Text>
        </SafeAreaView>
    );
}

  
export default Exchange;