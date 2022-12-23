import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/InfoStyles";
function Info(){
    return(
        <SafeAreaView style={styles.container} >
            <Text>Info</Text>
        </SafeAreaView>
    );
}

  
export default Info;