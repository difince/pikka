import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';

import * as pikkaService from './services/pikka-service-localstore';

export default class ActionBar extends Component {

    savePikka() {
        pikkaService.savePikka(this.props.pikka);
        this.props.navigator.navigate('PikkaList');
        // this.props.navigator.push({name: 'pikka-list'});
        // alert(this.props.mobilePhone);
        //this.openURL('sms:' + this.props.mobilePhone);
    }

    deletePikka() {
        pikkaService.deletePikka(this.props.pikka);
        this.props.navigator.navigate('PikkaList', { });
        // this.props.navigator.push({name: 'pikka-list'});
        // alert(this.props.email);
        // this.openURL('mailto:' + this.props.email);
    }

    // openURL(url) {
    //     Linking.canOpenURL(url).then(supported => {
    //         if (!supported) {
    //             console.log('Can\'t handle url: ' + url);
    //         } else {
    //             return Linking.openURL(url);
    //         }
    //     }).catch(err => console.error('An error occurred', err));
    // }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.savePikka.bind(this)} style={styles.action}>
                    <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deletePikka.bind(this)} style={styles.action}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FAFAFF',
        paddingVertical: 8
    },
    action: {
        flex: 1,
        alignItems: 'center'
    },
    actionText: {
        color: '#007AFF'
    },
    icon: {
        height: 20,
        width: 20
    }
});