import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Divider from "@material-ui/core/Divider";
import firebase from 'firebase';

import db from '../Config';
import AppHeader from '../components/AppHeader';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allRequests: [],
        }
        this.requestRef = null;
    }

    getAllRequests = () => {
        this.requestRef = db.collection('requests')
        .onSnapshot((snapshot) => {
            var allRequests = snapshot.docs.map(document => document.data());
            this.setState({
                allRequests: allRequests,
            })
        })
    }

    componentDidMount = () => {
        this.getAllRequests();
    }

    componentWillUnmount = () => {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, i }) => (
        <ListItem
            key = { i }
            title = { item.itemName }
            subtitle = { item.description }
            titleStyle = {{ color: 'black', fontWeight: 'bold' }}
            rightElement = {
                <TouchableOpacity style = { styles.exchangeButton }>
                    <Text style = {{ color: 'white' }}>
                        Exchange
                    </Text>
                </TouchableOpacity>
            }
            bottomDivider />
    )

    render() {
        return(
            <View style = { styles.container }>
                <AppHeader title = 'Home' />
                <View style = {{ flex: 1 }}>
                    {
                        this.state.allRequests.length === 0
                        ? (
                            <View style = {{
                                flex: 1,
                                fontSize: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style = {{ fontSize: 20 }}>
                                    List of all Barter
                                </Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor = { this.keyExtractor }
                                data = { this.state.allRequests }
                                renderItem = {({ item, i }) => (
                                    <View style = { styles.renderContainer }>
                                        <View>
                                            <Text style = {{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                                                { item.itemName }
                                            </Text>
                                            <Text style = {{ marginBottom: 20 }}>
                                                { item.description }
                                            </Text>
                                        </View>
                                        <View style = {{ marginTop: -60, marginLeft: 150 }}>
                                            <TouchableOpacity style = { styles.exchangeButton }>
                                                <Text style = {{ color: "#ff5722", fontSize: 18, fontWeight: '300', padding: 20, }}>
                                                    Exchange
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style = {{ borderBottomWidth: 1, marginTop: 20 }} />
                                    </View>
                                )} />
                        )
                    }
                </View>
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
    exchangeButton: {
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        elevation: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ff5722',
    },
    renderContainer: {
        alignItems: 'left',
        justifyContent: 'center',
        borderColor: 'black',
    }
})