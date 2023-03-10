import { Platform, StatusBar, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    scrollview: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 80,
    },
    containerTop: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    containerTopImage: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTopName: {
        flex: 0.6,
        marginLeft: 10,
        width:"100%",
    },
    containerTopIcon: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    containerInfoWallet: {
        marginTop: 15,
        flex: 1,
    },
    containerItem: {
        flex: 0.5,
        backgroundColor: '#E6E6FA',
        height: 80,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
    },
    containerItemTop: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerListJar: {
        marginTop: 20,
    },
    containerListJarItem: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#E6E6FA",
        borderRadius: 40,
    },
    containerListJarItem_Item: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        flex: 1,
    },
    containerListJars: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#f5866e',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
    },
});

export default styles;