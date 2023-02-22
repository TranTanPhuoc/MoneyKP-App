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
  containerMoney:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#fff',
    borderRadius:20,
    shadowOffset:{
        width:0,
        height:1,
    },
    shadowColor:'#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent:'center'
  },
  containerBody:{
    backgroundColor:'#fff',
    shadowOffset:{
        width:0,
        height:1,
    },
    shadowColor:'#999999',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  }
});

export default styles;