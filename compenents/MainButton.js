import React from 'react'
import {View , Text , StyleSheet , TouchableOpacity , Platform , TouchableNativeFeedback} from 'react-native'
import Colors from '../constants/constants'


const MainButton = (props) => {
    let ButtonCompenent = TouchableOpacity
    if(Platform.OS ==='android' && Platform.Version >= 21){
        ButtonCompenent = TouchableNativeFeedback
    }
return(
    <View style={styles.buttoncontainer}>
<ButtonCompenent onPress={props.onPress}>
<View style={styles.button}>
<Text style={styles.buttonText}>{props.children}</Text>
</View>
</ButtonCompenent>
</View>
)
}

const styles= StyleSheet.create({
    buttoncontainer:{
        borderRadius:25 , 
        overflow:'hidden'
    },
button:{
 backgroundColor:Colors.primary,
 paddingVertical:12,
 paddingHorizontal:30,
 borderRadius:25 

}, 
buttonText:{
    color:'white',
    fontFamily:'open-sans',
    fontSize:18

}
})

export default MainButton