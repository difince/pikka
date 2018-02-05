import React, {Component} from 'react';
import SortableListView from 'react-native-sortable-listview'
import {View, ListView, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';
import PikkaListItem from './PikkaListItem';
import * as pikkaService from './services/pikka-service-localstore';

export default class PikkaList extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.title: 'Pikka List',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            config: pikkaService.defaultConfig(),
            isLoading: true,
            dataOrder: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
    }

    componentWillMount() {
        this.refresh();
    }

    refresh() {
        pikkaService.findAll().then(pikkas => {
            this.setState({
                isLoading: false,
                dataSource: pikkas
            });
        });
        pikkaService.getSortedKeys().then(ids => {
            this.setState({
                dataOrder: ids
            });
        });
        pikkaService.getConfig().then(config => {
            this.props.navigation.setParams({title: config.listTitle});
            this.state.config = config;
        });
    }

    search(key) {
        pikkaService.findByName(key).then(pikkas => {
            this.setState({
                dataSource: pikkas
            });
        });
    }

    addPikka() {
        const { navigate } = this.props.navigation;
        navigate('PikkaDetails', { } );
    }

    config() {
        const { navigate } = this.props.navigation;
        navigate('PikkaConfig', { navigation: this.props.navigation });
    }

    render() {
        if (this.state.isLoading) return (<View><Text>Loading...</Text></View>);

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <SearchBar onChange={this.search.bind(this)}  style={styles.searchBar}/>
                </View>

                <View style={styles.list}>
                    <SortableListView
                        data={this.state.dataSource}
                        order={this.state.dataOrder}
                        // order={Object.keys(this.state.dataSource)}
                        onRowMoved={e => {
                            this.state.dataOrder.splice(e.to, 0, this.state.dataOrder.splice(e.from, 1)[0]);
                            pikkaService.updateKeys(this.state.dataOrder).then(ids => {
                                //this.refresh();
                            });
                        }}
                        renderRow={row => <PikkaListItem data={row} parent={this} sortHandlers={this.props.sortHandlers}/>}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.config.bind(this)}>
                        <Image source={require('./assets/config.png')} style={styles.configicon, styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.addPikka.bind(this)}>
                        <Image source={require('./assets/add.png')} style={styles.addicon, styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 8
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA',
    },
    header: {
        minHeight: 60,
        alignItems: 'center'
    },
    searchBar: {
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    list: {
        flex: 8
    },
    icon: {
        height: 50,
        width: 50
    },
    addicon: {
        flex: 1
    },
    configicon: {
        flex: 1
    }
});