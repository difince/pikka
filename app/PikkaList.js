import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import {View, ListView, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';
import PikkaListItem from './PikkaListItem';
import * as pikkaService from './services/pikka-service-localstore';

export default class PikkaList extends Component {

    static navigationOptions = { title: 'Pikka List', };

    constructor(props) {
        super(props);
        this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
        pikkaService.findAll().then(pikkas => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(pikkas)
            });
        });
    }

    search(key) {
        pikkaService.findByName(key).then(pikkas => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(pikkas)
            });
        });
    }

    addPikka() { 
        const { navigate } = this.props.navigation;
        navigate('PikkaDetails', { data: pikkaService.defaultPikka });
        // this.props.navigator.push({name: 'details', data: pikkaService.defaultPikka});
    }

    render() {
        return (
            <View>
                <ListView style={styles.container}
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(data) => <PikkaListItem data={data} parent={this} />}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                        renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}
                        renderFooter={() => <TouchableOpacity onPress={this.addPikka.bind(this)} style={styles.action}>
                                                <Image source={require('./assets/add.png')} style={styles.icon} />
                                            </TouchableOpacity>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA',
    },
    action: {
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        height: 50,
        width: 50
    }
});