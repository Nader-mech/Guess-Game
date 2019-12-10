import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions } from 'react-native'
import NumberContainer from '../compenents/NumberContainer'
import Card from '../compenents/Card'
import defaultstyles from '../constants/default-styles'
import MainButton from '../compenents/MainButton'
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../compenents/BodyText'
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    else {
        return rndNum
    }
}

const renderListItem = (value, numOfround) => {
    return (
        <View key={value} style={styles.ListItem}>
            <BodyText>#{numOfround}</BodyText>
            <BodyText>{value}</BodyText>

        </View>
    )
}

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userchoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [avaDeviceWidth , setAvaDeviceWidth]=useState(Dimensions.get('window').width)
    const [avaDeviceHeight, setAvaDeviceHeight]= useState(Dimensions.get('window').height)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const { userchoice, onGameOver } = props

     useEffect(() => {
         const DetectWidth = () => {
          setAvaDeviceWidth(Dimensions.get('window').width)
            setAvaDeviceHeight(Dimensions.get('window').height)
         }
         Dimensions.addEventListener('change' , DetectWidth)

         return(
             Dimensions.removeEventListener('change' , DetectWidth) 
         )
     })


    useEffect(() => {
        if (currentGuess === userchoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userchoice, onGameOver])
    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < props.userchoice) ||
            (direction === 'greater' && currentGuess > props.userchoice)) {
            Alert.alert('plz be Honest', 'Dont lie', [{ text: 'sorry', style: 'cancel' }])
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }
    let listContainerStyle = styles.Listcontainer
    if (avaDeviceWidth < 350) {
        listContainerStyle = styles.ListContainerBig
    }
    if (avaDeviceHeight  < 500) {
        return (
            <View style={styles.screen}>
                <Text style={defaultstyles.title}> Opponent's Guess</Text>
                <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
                </View>
                <View style={styles.Listcontainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) =>
                            renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={defaultstyles.title}> Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonConatiner}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white' />

                </MainButton>
            </Card>
            <View style={styles.Listcontainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
        width: 300,
        maxWidth: '90%'

    }, ListItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'

    }, list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    Listcontainer: {
        flex: 1,
        width: '60%'
    }, ListContainerBig: {
        flex: 1,
        width: '80%'
    }, controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        alignItems:'center'
    }

})


export default GameScreen