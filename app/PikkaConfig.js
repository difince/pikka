import React, {Component} from 'react';
import {
    View, ScrollView, CheckBox, TouchableHighlight, Text, TextInput, Image, StyleSheet, TouchableOpacity,
    ListView
} from 'react-native';
import * as pikkaService from './services/pikka-service-localstore';

export default class PikkaConfig extends Component {
    static navigationOptions = { title: 'Pikka Configuration', };

    constructor(props) {
        super(props);
        this.state = {conf: pikkaService.defaultConfig()};
        pikkaService.getConfig().then(config => {
            this.setState({
                conf: config
            });
        });
    }

    saveConfig() {
        pikkaService.saveConfig(this.state.conf).then(conf => {
            const { navigate } = this.props.navigation;
            navigate('PikkaList');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.saveConfig.bind(this)} style={styles.action}>
                        <Text style={styles.actionText}>Update</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <View >
                        <Text>List title: </Text>
                        <TextInput style={styles.input}
                               underlineColorAndroid = "transparent"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               value={this.state.conf.listTitle}
                               onChangeText={(text) => this.setState(conf => {
                                                        this.state.conf.listTitle = text;
                                                        return { conf: this.state.conf};
                                                      })}
                               />
                    </View>
                    <View style={styles.checkBoxInput} >
                        <Text>Show Ip in list: </Text>
                        <CheckBox style={styles.input}
                               underlineColorAndroid = "transparent"
                               placeholderTextColor = "#9a73ef"
                               autoCapitalize = "none"
                               value={this.state.conf.showIp}
                               onValueChange={(checked) => this.setState(conf => {
                                                        this.state.conf.showIp = checked;
                                                        return { conf: this.state.conf};
                                                      })}
                               />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 10,
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FAFAFF',
        paddingBottom: 4,
        borderBottomColor: '#F2F2F7',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    input: {
        height: 40,
        padding: 11,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1
    },
    checkBoxInput: {
        alignItems: 'baseline',
        flexDirection: 'row',
    },
    action: {
        alignItems: 'center'
    },
    actionText: {
        color: '#007AFF'
    },
});