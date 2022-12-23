import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Image, StyleSheet, View } from 'react-native';
import Account from '../Screen/Account/Account';
import Home from '../Screen/Home/Home';
import Info from '../Screen/Info/Info';
import Wallet from '../Screen/Wallet/Wallet';

const Tab = createBottomTabNavigator();
const Tabs = () =>{
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                position:'absolute',
                elevation:0,
                backgroundColor:"#424261",
                height:45,
                ...styles.shadow
            }
        }}>
            <Tab.Screen name='Home' component={Home} options={{headerShown:false,tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../assets/icons/home.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#fff': '#748c94'}}/>
                </View>
            )}}/>
            <Tab.Screen name='Wallet' component={Wallet}  options={{tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../assets/icons/wallet.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#fff': '#748c94'}}/>
                </View>
            )}}/>
            <Tab.Screen name='Info' component={Info}  options={{tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../assets/icons/info.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#fff': '#748c94'}}/>
                </View>
            )}}/>
            <Tab.Screen name='Account' component={Account}  options={{tabBarIcon:({focused})=>(
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../assets/icons/user.png')} resizeMode="contain" style={{width:22,height:22,tintColor:focused? '#fff': '#748c94'}}/>
                </View>
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