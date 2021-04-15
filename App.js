/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React , { useState } from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   TouchableOpacity,
 } from 'react-native';
 
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
import Board from './components/Board/Board';

const App: () => React$Node = () => {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const playBox = (no) => {
    return(
      <Box 
        no={no}
        boxInfo={{boxes, setBoxes}}
        turn={{ isXTurn, setIsXTurn }}
        winner={winner}
      />
    )
  }

  const winPosition = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const calculateWin = () => {
    for (let i=0;  i<winPosition.length; i++) {
      if( 
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]]
        && boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
       ) {
         setWinner(boxes[winPosition[i][0]]);
         return;
       }
    }
  }

  useEffect(() => {
    calculateWin();
  }, [isXTurn])

  const resetValues = () => {
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXChance(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"  backgroundColor='red'/>
      <View style={styles.featureContainer}>
        {winner !== null 
        ? <Text style={[styles.primaryText, styles.winnerText]}>{winner} WINNER</Text>
        : <Text style={styles.primaryText}>Turn: {isXTurn ? 'X' : 'O'}</Text>
        }
        <Ionicons 
          style={styles.resetIcon}
          name="reload-circle" 
          size={38} 
          color="black" 
          onPress={resetValues}
        />
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  playBoard: {
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'black'
  },
  rows: {
    flexDirection: 'row',
  },
  resetIcon: {
    position: 'absolute',
    right: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  winnerText: {
    color: 'darkorange',
    fontSize: 48,
  }
});