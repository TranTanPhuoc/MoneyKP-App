import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2b2b4f',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollview:{
       marginLeft:10,
       marginRight:10, 
       marginBottom:80,
    },
    containerTop:{
        marginTop: 10,
        display:'flex',
        flexDirection:'row',
        flex:1,
    },
    containerTopImage:{
        flex:0.15,
        justifyContent:'center',   
        alignItems:'center'
    },
    containerTopName:{
        flex:0.6,
        marginLeft:10,
    },
    containerTopIcon:{
        flex:0.25,
        justifyContent:'center',   
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
    },
    containerInfoWallet:{
        marginTop:15,
        flex:1,
    },
    containerItem:{
        flex:0.5,
        backgroundColor:'#48485e',
        height:80,
        margin:5,
        borderRadius:10,
        
    },
    containerItemTop:{
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    containerListJar:{
        marginTop:20,
    },
    containerListJarItem:{
        marginTop:10,
        height:600,
        width: "100%",
        backgroundColor:"#48485e",
        borderRadius:40,
    },
    containerListJarItem_Item:{
        height:100,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
        marginLeft:15,
        flex:1,
    },
    containerListJars:{
        marginTop:10,
        height:400,
        width: "100%",
        backgroundColor:"#48485e",
        borderRadius:40,
    }
});

export default styles;