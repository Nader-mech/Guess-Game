import React from 'react'
import {View , Text ,StyleSheet , Button , Image , Dimensions , ScrollView , SafeAreaView} from 'react-native'
import BodyText from '../compenents/BodyText'
import  TitleText from '../compenents/TitleText'
import Colors from '../constants/constants'
import MainButton from '../compenents/MainButton'
const GameOver = (props) => {
return( 
    <SafeAreaView>
    <ScrollView>
    <View style={styles.screen}>
    <TitleText> The game is over </TitleText>
    <View style={styles.imageContainer}>
    <Image
     source={require('../assets/success.png')} 
    // source={{uri:'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}}
    style={styles.image} 
    resizeMode='cover' />
    </View>
    <View style={styles.resultConatiner}>
    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highLighted}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highLighted}>{props.userNumber} </Text></BodyText>
    </View>
    <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
    </ScrollView>
    </SafeAreaView>
)

}

const styles= StyleSheet.create({
    screen:{
        flex:1, 
        padding:10,
        justifyContent:'center',
        alignItems:'center'

    }, 
    image:{
        width:'100%',
        height:'100%',

    },
    imageContainer:{
        borderRadius:Dimensions.get('window').width*0.7 / 2 ,
        borderWidth: 3 ,
        borderColor:'black',
        width: Dimensions.get('window').width*0.7 ,
        height:Dimensions.get('window').width*0.7 ,
        overflow:'hidden' ,
        marginVertical:Dimensions.get('window').height / 20,
       
        },
        highLighted:{
            color:Colors.primary ,
            fontFamily:'open-sans-bold',
            

    },
    resultConatiner:{
        marginHorizontal:10, 
        marginVertical:Dimensions.get('window').height / 40
    }, 
    resultText:{
       textAlign:'center',
       fontSize:20
    }
})

export default GameOver 