import {  Text, SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "./styles/HomeStyles";
function Home(){
    return(
        <SafeAreaView style={styles.container} >
            <Text>Home</Text>
        </SafeAreaView>
    );
}

  
export default Home;