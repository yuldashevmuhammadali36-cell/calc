import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Calculator = () => {
    
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0'); 

    const buttons = [
        ['%', '√', 'CE', 'C'], 
        ['7', '8', '9', '−'],
        ['4', '5', '6', '÷'],
        ['1', '2', '3', 'x'],
        ['.', '0', '=', '+'], 
    ];

    const evaluateExpression = (expr) => {
        try {
            let safeExpr = expr.replace(/x/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            
            
            if (safeExpr.includes('√')) {
                
                const parts = safeExpr.split('√');
                const lastNumIndex = parts.length - 1;
                const num = parseFloat(parts[lastNumIndex]);
                if (!isNaN(num) && num >= 0) {
                    safeExpr = safeExpr.replace(/√\d+/, Math.sqrt(num).toString());
                } else {
                    return 'Error';
                }
            }

            return eval(safeExpr).toString();
        } catch (e) {
            return 'Error';
        }
    };
    
    const handlePress = (value) => {
        
        if (result === 'Error') {
            setExpression(value);
            setResult(value);
            return;
        }
        
        if (value === 'C') { 
            setExpression('');
            setResult('0');
            return;
        }

        if (value === 'CE') {
            setExpression(prev => prev.slice(0, -1));
            setResult(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
            return;
        }
        
        if (value === '√') { 
            setExpression(prev => prev + '√');
            setResult(prev => prev + '√');
            return;
        }

        if (value === '=') { 
            if (expression.length === 0) return;
            
            const evaluationResult = evaluateExpression(expression);
            setResult(evaluationResult);
            setExpression(evaluationResult === 'Error' ? '' : evaluationResult); 
            return;
        }

        
        setExpression(prevExpression => prevExpression + value);
        if (result === '0' && !['.', '+', '−', '÷', 'x', '%', '√'].includes(value)) {
            setResult(value);
        } else {
            setResult(prevResult => prevResult + value);
        }
    };

    return (
        <SafeAreaView style={calculatorStyles.safeArea}>
            <View style={calculatorStyles.calculatorContainer}>
                <View style={calculatorStyles.displayContainer}>
                    <Text style={calculatorStyles.resultText} numberOfLines={1}>
                        {result}
                    </Text>
                </View>
                <View style={calculatorStyles.buttonsContainer}>
                    {buttons.map((row, rowIndex) => (
                        <View key={rowIndex} style={calculatorStyles.row}>
                            {row.map((buttonValue) => (
                                <TouchableOpacity
                                    key={buttonValue}
                                    style={[
                                        calculatorStyles.buttonBase,
                                        !isNaN(parseInt(buttonValue)) && calculatorStyles.numberButton,
                                        ['.', '0', '7', '8', '9', '4', '5', '6', '1', '2', '3', '='].includes(buttonValue) && calculatorStyles.numberButton,
                                        buttonValue === '%' && calculatorStyles.numberButton, 
                                        buttonValue === '√' && calculatorStyles.numberButton, 
                                        buttonValue === 'CE' && calculatorStyles.ceButton, 
                                        buttonValue === 'C' && calculatorStyles.darkCButton, 
                                        
                                        // Operatorlar uchun ranglar (Rasmga mos)
                                        buttonValue === '−' && calculatorStyles.minusButton, 
                                        buttonValue === '÷' && calculatorStyles.divisionButton, 
                                        buttonValue === 'x' && calculatorStyles.multiplyButton, 
                                        buttonValue === '+' && calculatorStyles.plusButton, 
                                        buttonValue === '0' && {flex: 2}, 
                                        buttonValue === '.' && {flex: 1}, 
                                        buttonValue === '=' && {flex: 1}, 
                                        buttonValue === '+' && {flex: 1},
                                    ]}
                                    onPress={() => handlePress(buttonValue)}
                                >
                                    <Text style={[
                                        calculatorStyles.buttonText,
                                        
                                        ['CE', 'C', '−', '÷', 'x', '+'].includes(buttonValue) && {color: 'white'},
                                        
                                        !['CE', 'C', '−', '÷', 'x', '+'].includes(buttonValue) && {color: '#333'},
                                    ]}>
                                        {buttonValue}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>

            </View>
        </SafeAreaView>
    );
};


const calculatorStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculatorContainer: {
        width: 320, 
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
    },
    

    displayContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 100,
        backgroundColor: '#4A90E2', 
        borderRadius: 15,
    },
    resultText: {
        fontSize: 36,
        color: 'white', 
        fontWeight: '700',
    },


    buttonsContainer: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, 
    },
    buttonBase: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginHorizontal: 5, 
        borderRadius: 10,
        // Yengil soyalar
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    
   
    numberButton: {
        backgroundColor: '#FFFFFF', 
    },
    ceButton: {
        backgroundColor: '#4A90E2', 
    },
    darkCButton: {
        backgroundColor: '#333333', 
    },
    minusButton: {
        backgroundColor: '#FF6363', 
    },
    divisionButton: {
        backgroundColor: '#4A90E2',
    },
    multiplyButton: {
        backgroundColor: '#FFC107', 
    },
    plusButton: {
        backgroundColor: '#7ED321', 
    },
    
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
    },
});

export default Calculator;