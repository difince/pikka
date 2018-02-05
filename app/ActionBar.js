import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';

import * as pikkaService from './services/pikka-service-localstore';

export default class ActionBar extends Component {

    navigateToList() {
        pikkaService.getSortedKeys().then(ids => {
            pikkaService.findAll().then(pikkas => {
                // console.warn("order: " + JSON.stringify(ids) + "\ndata: " + JSON.stringify(pikkas));
                this.props.navigator.navigate('PikkaList', {dataOrder: ids, dataSource: pikkas});
            });
        });

    }

    savePikka() {
        pikkaService.savePikka(this.props.pikka).then(pikka => {
            if (pikkaService.pikkaId(this.props.pikka) != pikkaService.pikkaId(this.props.pikkaOrg)) {
                pikkaService.deletePikka(this.props.pikkaOrg).then(pikka => {
                    this.navigateToList();
                });
            } else {
                this.navigateToList();
            }
        });
    }

    deletePikka() {
        pikkaService.deletePikka(this.props.pikka).then(pikka => {
            this.navigateToList();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.savePikka.bind(this)} style={styles.action}>
                    <Text style={styles.actionText}>Update</Text>
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