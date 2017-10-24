import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

import * as SnmpService from './services/snmp';

var toggleImages = [
    require('./assets/off.png'),
    require('./assets/on.png')
];

export default class PikkaListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {toggleState: 0};

        SnmpService.show(this.props.data.ip,
                            this.props.data.port,
                            this.props.data.oid,
                            this.props.data.snmpVersion,
                            this.props.data.community)
        .then(toggleSnmpState => {
            this.setState(previousState => {
                return { toggleState: toggleSnmpState };
            });
        // }, err => {
        //     this.setState(previousState => {
        //         return { toggleState: 0 };
        //     });
        });
    }

    updateState() {
        SnmpService.show(this.props.data.ip,
                            this.props.data.port,
                            this.props.data.oid,
                            this.props.data.snmpVersion,
                            this.props.data.community)
        .then(toggleSnmpState => {
            this.setState(previousState => {
                return { toggleState: toggleSnmpState };
            });
        // }, err => {
        //     this.setState(previousState => {
        //         return { toggleState: 0 };
        //     });
        });
    }

    showDetails() {
        const { navigate } = this.props.parent.props.navigation;
        navigate('PikkaDetails', { data: this.props.data });
        // this.props.navigator.push({name: 'details', data: this.props.data});
    }

    togglePikka() {
        SnmpService.toggleState(this.props.data.ip,
                            this.props.data.port,
                            this.props.data.oid,
                            this.props.data.snmpVersion,
                            this.props.data.community,
                            this.state.toggleState==0?1:0)
        SnmpService.show(this.props.data.ip,
                            this.props.data.port,
                            this.props.data.oid,
                            this.props.data.snmpVersion,
                            this.props.data.community)
        .then(toggleSnmpState => {
            this.setState(previousState => {
                return { toggleState: toggleSnmpState };
            });
        // }, err => {
        //     this.setState(previousState => {
        //         return { toggleState: 0 };
        //     });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.info} onPress={this.showDetails.bind(this)} underlayColor={'#EEEEEE'}>
                    <View style={styles.info}>
                        <Image source={{uri: this.props.data.picture}} style={styles.picture} />
                        <View>
                            <Text>{this.props.data.name}</Text>
                            <Text style={styles.title}>{this.props.data.ip}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                
                <View style={styles.controls}>
                    <TouchableHighlight onPress={this.updateState.bind(this)} underlayColor={'white'}>
                        <Image source={require('./assets/refresh.jpg')} style={styles.picture}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.togglePikka.bind(this)} underlayColor={'white'}>
                        <Image source={toggleImages[this.state.toggleState]} style={styles.picture}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },    
    info: {
        flex: 4,
        flexDirection: 'row',
        padding: 8
    },    
    controls: {
        flexDirection: 'row',
        flex: 2
    },
    picture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8
    },
    title: {
        color: '#848484'
    }
});
