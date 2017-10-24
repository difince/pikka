import React, {Component} from 'react';
// import NavigationExperimental from 'react-native-deprecated-custom-components';
import { StackNavigator } from 'react-navigation';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PikkaList from './PikkaList';
import PikkaDetails from './PikkaDetails';

const PikkaAppNav = StackNavigator({ 
    PikkaList: { screen: PikkaList }, 
    PikkaDetails: { screen: PikkaDetails },
});

export default class PikkaApp extends Component {
    // renderScene(route, navigator) {
    //     switch (route.name) {
    //         case 'pikka-list':
    //             return <PikkaList navigator={navigator} />
    //         case 'details':
    //             return <PikkaDetails navigator={navigator} data={route.data} />
    //     }
    // }

    render() {
        return <PikkaAppNav />;


        // return (
        //     <Navigator
        //         initialRoute={{name: 'pikka-list', title: 'Pikka List'}}
        //         renderScene={this.renderScene}
        //         navigationBar={
        //             <Navigator.NavigationBar
        //                 routeMapper={{
        //                     LeftButton: (route, navigator, index, navState) => {
        //                         if (route.name === 'pikka-list') {
        //                             return null;
        //                         } else {
        //                             return (
        //                                 <TouchableOpacity onPress={() => navigator.pop()}>
        //                                     <Image source={require('./assets/back.png')} style={styles.backButton} />
        //                                 </TouchableOpacity>
        //                             );
        //                         }
        //                     },
        //                     RightButton: (route, navigator, index, navState) => {
        //                         return null;
        //                     },
        //                     Title: (route, navigator, index, navState) => {
        //                         return (<Text style={styles.title}>{route.title}</Text>);
        //                     },
        //                 }}
        //                 style={styles.navBar}
        //             />
        //         }
        //     />
        // )
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#FAFAFF',
        height: 60,
    },
    backButton: {
        marginTop: 8,
        marginLeft: 12,
        height: 24,
        width: 24
    },
    title: {
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold'
    }
});