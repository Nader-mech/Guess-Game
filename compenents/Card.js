import React from 'react'
import {StyleSheet , View} from 'react-native'


const Card = (props) => {
    return (
        <View style={{...styles.Card,...props.style}}>{props.children}</View>
    )
} 
   
const styles=StyleSheet.create({
    Card:{
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: 'white',
        padding:20 ,
        borderRadius:10 ,
}

})


export default Card