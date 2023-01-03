import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Account from '../Screen/Account/Account';
import Exchange from '../Screen/Exchange/Exchange';
import Home from '../Screen/Home/Home';
import Info from '../Screen/Info/Info';
import Wallet from '../Screen/Wallet/Wallet';

const Tab = createBottomTabNavigator();
const CustomTabBar = ({children,onPress})=>{
    <TouchableOpacity style={{top:-30,justifyContent:'center',alignItems:'center',...styles.shadow}} onPress={onPress}>
        <View style={{height:70,width:70,borderRadius:35,}}>
            {children}
        </View>
    </TouchableOpacity>
}

const Tabs = () =>{
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                position:'absolute',
                elevation:0,
                height:60,
                ...styles.shadow
            }
        }}>
            <Tab.Screen name='Home' component={Home} options={{headerShown:false,tabBarIcon:({focused})=>(
                    <Image source={require('../../assets/icons/home.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#000': '#748c94'}}/>
            )}}/>
            <Tab.Screen name='Wallet' component={Wallet}  options={{tabBarIcon:({focused})=>(
                    <Image source={require('../../assets/icons/wallet.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#000': '#748c94'}}/>
            )}}/>
             <Tab.Screen name='Exchange' component={Exchange}  options={{tabBarIcon:({focused})=>(
                    <LinearGradient colors={['#8b60f0', '#703050', '#c2387c','#8390e6']} style={{height:60,width:60,justifyContent:'center',alignItems:'center',top:-30,borderRadius:50,}}>
                        <Image source={require('../../assets/icons/plus.png')} resizeMode="contain" style={{width:25,height:25,tintColor: '#fff'}}/>
                    </LinearGradient>
                    )
                    }}/>
            <Tab.Screen name='Info' component={Info}  options={{tabBarIcon:({focused})=>(
                    <Image source={require('../../assets/icons/info.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#000': '#748c94'}}/>
            )}}/>
            <Tab.Screen name='Settings' component={Account}  options={{tabBarIcon:({focused})=>(
                    <Image source={require('../../assets/icons/user.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#000': '#748c94'}}/>
            )}}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    }
})

export default Tabs;