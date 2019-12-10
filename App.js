import React, {useState} from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import Header from './compenents/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOver from './screens/GameOver'
import * as Font from 'expo-font'
import {AppLoading} from'expo'

const fetchFonts= () => {
 return   Font.loadAsync({
     'open-sans':require('./assets/Fonts/OpenSans-Regular.ttf'), 
    'open-sans-bold':require('./assets/Fonts/OpenSans-Bold.ttf'), 

  })
}


export default function App() {
  const [userNumber , setUserNumber] = useState()
   const[guessRounds,setGuessRounds]=useState(0)
   const[dataLoaded , setDataLoaded]=useState(false)

   if(!dataLoaded){
     return (
     <AppLoading
      startAsync={fetchFonts}
       onFinish={() => setDataLoaded(true)} /> 
     )
   }

   const configureNewGameHandler = () => {
     setGuessRounds(0)
     setUserNumber(null)
    setGuessRounds(0)

   }

const gameOverHandler = (numOfRnds) => {
  setGuessRounds(numOfRnds)
}


  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber)
  } 
   let content = <StartGameScreen onStartGame={startGameHandler}/>
   

   if(userNumber && guessRounds <=0){
    content=<GameScreen  userchoice={userNumber} onGameOver={gameOverHandler} />
   }else if (guessRounds >0){
     content=<GameOver userNumber={userNumber} roundsNumber={guessRounds} onRestart={configureNewGameHandler}/>
   }
  
  return (
    <SafeAreaView style={styles.screen}>
    <Header title='Guess A Number!'/>
    {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
 