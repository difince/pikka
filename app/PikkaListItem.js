import React, { Component } from 'react';
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
        navigate('PikkaDetails', { data: this.props.data, parent: this.props.parent});
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
        if (this.props.data == null) return (<View><Text></Text></View>);

        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.info} onPress={this.showDetails.bind(this)} underlayColor={'#ffffff'}
                                    {...this.props.sortHandlers}>
                    <View style={styles.info}>
                        <Image source={{uri: this.props.data.picture}} style={styles.picture} />
                        <View>
                            <Text>{this.props.data.name}</Text>
                            <Text style={styles.title}>{this.props.parent.state.config.showIp ? this.props.data.ip : ''}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                
                <View style={styles.controls}>
                    <TouchableHighlight onPress={this.togglePikka.bind(this)} underlayColor={'white'}>
                        <Image source={toggleImages[this.state.toggleState]} style={styles.picture}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.updateState.bind(this)} underlayColor={'white'}>
                        <Image source={require('./assets/refresh.png')} style={styles.picture}/>
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
    },    
    info: {
        flex: 5,
        flexDirection: 'row',
        margin: 5
    },    
    controls: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    picture: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginRight: 8
    },
    title: {
        color: '#848484'
    }
});
