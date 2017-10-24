import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, ListView, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ActionBar from './ActionBar';
import PikkaListItem from './PikkaListItem';
import * as pikkaService from './services/pikka-service-localstore';

export default class PikkaDetails extends Component {
    static navigationOptions = { title: 'Pikka Details', };

    constructor(props) {
        super(props);
        pikkaService.findById(this.props.navigation.state.params.data.name).then(pikka => {
            this.setState({
                pikka: pikka
            });
        });
    }

    render() {
        if (this.state && this.state.pikka) {
            let pikka = this.state.pikka;
            return ( 
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={{uri: pikka.picture}} style={styles.picture} />
                        <ActionBar pikka={pikka} navigator={this.props.navigation}/>
                    </View>
                    <ScrollView >
                        <View >
                            <Text>Name: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.name}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.name = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                        <View >
                            <Text>Ip: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.ip}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.ip = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>

                        <View >
                            <Text>Snmp Port: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.port}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.port = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                        
                        <View >
                            <Text>Snmp OID: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.oid}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.oid = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                        
                        <View >
                            <Text>Snmp Version: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.snmpVersion}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.snmpVersion = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                        
                        <View >
                            <Text>Snmp Community: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.community}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.community = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                        
                        <View >
                            <Text>Picture: </Text>
                            <TextInput style={styles.input}
                                   underlineColorAndroid = "transparent"
                                   placeholderTextColor = "#9a73ef"
                                   autoCapitalize = "none"
                                   value={pikka.picture}
                                   onChangeText={(text) => this.setState(pikka => {
                                                            this.state.pikka.picture = text;
                                                            return { pikka: this.state.pikka};
                                                          })}
                                   />
                        </View>
                    </ScrollView>

                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
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
    picture: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    input: {
        height: 40,
        padding: 11,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderColor: 'gray',
        borderWidth: 1
    },
});