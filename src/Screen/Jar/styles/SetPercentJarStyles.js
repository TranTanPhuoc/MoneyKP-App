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
      display:'flex',
      flexDirection:'row',
      height:220,
      justifyContent:'flex-start',
      alignItems:'center'
   },
   containerButton:{
    height:80,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonStyle:{
    backgroundColor: '#f5866e',
    height:50,
    width:200,
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
    alignItems:'center'
  },
  bodyView:{
    height:300,
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
  },
  scrollView:{
    flex:1,
    marginTop:10,
    backgroundColor:"#fff",
    marginRight:10,
    marginLeft:10,
    borderRadius:20,
    shadowOffset:{
      width:0,
      height:1,
    },
    shadowColor:'#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom:20,
  },
  containerItem:{
    height:60,
    display:'flex',
    flexDirection:'row',
    flex:1,
    marginRight:20,
    marginLeft:20,
  }
});

export default styles;