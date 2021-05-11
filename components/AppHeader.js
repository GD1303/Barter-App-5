import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component {
    render() {
        return(
            <View style = { styles.textContainer }>
                <Text style = { styles.title }>
                    Barter
                </Text>
                <Text style = { styles.text }>
                    { this.props.title }
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#ffe0b2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 60,
        fontWeight: 300,
        fontFamily: "AvenirNext-Heavy",
        color: "#ff9800",
    },
    text: {
        color: '#ff8a65',
        padding: 5,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});