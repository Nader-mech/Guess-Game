import React, { useState , useEffect} from 'react'
import {
    View, StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import Card from '../compenents/Card'
import Colors from '../constants/constants'
import Input from '../compenents/input'
import NumberContainer from '../compenents/NumberContainer'
import BodyText from '../compenents/BodyText'
import TitleText from '../compenents/TitleText'
import MainButton from '../compenents/MainButton'

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)


    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('')
    }
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
    
        Dimensions.addEventListener('change', updateLayout)
        return(
            Dimensions.removeEventListener('change', updateLayout)
        )
    
    
    })
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()

    }
    let confirmOutput
    if (confirmed) {
        confirmOutput = <Card style={styles.summaryContainer}>
            <BodyText>You selected </BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME </MainButton>
        </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game! </TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSumbit autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttoncontainer}>
                                <View style={{width:buttonWidth}}><Button color={Colors.accent} title='Reset' onPress={resetInputHandler} /></View>
                                <View style={{width:buttonWidth}}><Button color={Colors.primary} title='Confirm' onPress={confirmInputHandler} /></View>
                            </View>
                        </Card>
                        {confirmOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '90%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttoncontainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,

    },
    // button: {
    // width: '45%'
    // width: Dimensions.get('window').width / 4
    // }, 
    input: {
        width: 50,
        textAlign: 'center'
    }, summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }

})


export default StartGameScreen