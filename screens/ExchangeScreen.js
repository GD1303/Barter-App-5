import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import db from '../Config';
import AppHeader from '../components/AppHeader';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userName : firebase.auth().currentUser.email,
            itemName: '',
            description: '',
        }
    }

    addItem = (itemName, description) => {
        var userName = this.state.userName;
        db.collection('requests').add({
            'username': userName,
            'itemName': itemName,
            'description': description,
        });

        this.setState({
            itemName: '',
            description: '',
        })

        return alert(
            'Item now ready for exchange.',
            '',
            [{
                text: 'OK',
                onPress: () => {
                    this.props.navigation.navigate('Home')
                }
            }]
        )
    }

    render() {
        return(
            <View style = { styles.container }>
                <AppHeader title = 'Exchange Screen' />
                <KeyboardAvoidingView style = { styles.profileContainer }>
                    <TextInput
                        style = { styles.formTextInput }
                        placeholder = 'Item Name'
                        onChangeText = {(text) => {
                            this.setState({
                                itemName: text
                            })
                        }}
                        value = { this.state.itemName } />
                    <TextInput
                        style = {[ styles.formTextInput, { height: 100 } ]}
                        placeholder = 'Description'
                        numberOfLines = { 4 }
                        onChangeText = {(text) => {
                            this.setState({
                                description: text
                            })
                        }}
                        value = { this.state.description }
                        multiline />
                    <TouchableOpacity
                        style = { styles.button }
                        onPress = {() => {
                            this.addItem(this.state.itemName, this.state.description)
                        }}>
                        <Text style = { styles.buttonText }>
                            Add Item
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe0b2',
        alignItems: 'center',
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        marginTop: 25,
    },
    formTextInput: {
        width: 300,
        height: 35,
        borderWidth: 1.5,
        borderColor: "#ffab91",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 5,
        color: "black",
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "#ffffff",
        elevation: 10,
    },
    buttonText: {
        color: "#ff5722",
        fontSize: 18,
        fontWeight: "bold",
    },
})