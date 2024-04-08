
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    inputs: {
        width: "90%",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 10,
    },
    contentHome: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20
    },
    headerHome: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    icon: {
        flex: 1,
        alignItems: 'flex-end'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
    },
    contentDetail:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:30,
        alignItems:'center',
      },
      nombre:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
      },
      text:{
        marginBottom:10,
        fontWeight:'bold',
        fontSize:18
      }
})