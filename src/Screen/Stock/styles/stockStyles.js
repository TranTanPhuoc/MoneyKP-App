import {Platform, StatusBar, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5FA',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerheader:{
      height:50,
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'row',
    },
    containerheader_icon:{
      flex:0.2,
      justifyContent:'center',
      marginLeft:20,
    },
    containerheader_title:{
      flex:0.6,
      justifyContent:'center',
      alignItems:'center'
    },
    fontTitle:{
      fontSize:18,
      fontWeight:'500'
    },
    viewBody:{
      marginLeft:10,
      marginRight:10,
      marginTop:20,
    },
    bodyContainerSearch:{
       height: 50, 
       borderRadius:20,
       backgroundColor:'#fff',
       paddingHorizontal:20,
       display:'flex',
       flexDirection:'row',
       alignItems:'center',
       marginBottom:20,
    },
    bodyContainerField:{
       height: 100, 
       flex:1,
       paddingHorizontal:5,
    },
});
export default styles;