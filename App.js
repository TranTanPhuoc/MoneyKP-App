import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './src/BottomTabBar/Tabs';
import ForgotPassword from './src/Screen/Auth/ForgotPassword';
import Login from './src/Screen/Auth/Login';
import Register from './src/Screen/Auth/Register';
import Exchange from './src/Screen/Exchange/Exchange';
import History from './src/Screen/History/History';
import Home from './src/Screen/Home/Home';
import DetailJar from './src/Screen/Jar/DetailJar';
import Jar from './src/Screen/Jar/Jar';
import SetPercentJar from './src/Screen/Jar/SetPercentJar';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName={'Tabs'} screenOptions={{headerShown:false}}>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='Register' component={Register}/>
              <Stack.Screen name='Tabs' component={Tabs}/>
              <Stack.Screen name='Home' component={Home}/>
              <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
              <Stack.Screen name='Jar' component={Jar}/>
              <Stack.Screen name='SetPercentJar' component={SetPercentJar}/>
              <Stack.Screen name='History' component={History}/>
              <Stack.Screen name='DetailJar' component={DetailJar}/>
              <Stack.Screen name='Exchange' component={Exchange}/>
          </Stack.Navigator>
          {/* <Tabs/> */}
      </NavigationContainer>
  );
}