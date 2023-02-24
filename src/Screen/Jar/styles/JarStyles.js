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
      display:'flex',
      flexDirection:'row',
      height:80,
   },
   containerButton:{
    height:80,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonStyle:{
    backgroundColor: '#f5866e',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:100,
    paddingRight:100,
    paddingTop:15,
    paddingBottom:15
  }
});

export default styles;