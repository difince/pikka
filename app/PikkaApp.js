import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation'; //https://reactnavigation.org/
import PikkaList from './PikkaList';
import PikkaDetails from './PikkaDetails';
import PikkaConfig from './PikkaConfig';

const PikkaAppNav = StackNavigator({
    PikkaList: { screen: PikkaList },
    PikkaDetails: { screen: PikkaDetails },
    PikkaConfig: { screen: PikkaConfig },
});

export default class PikkaApp extends Component {
    render() {
        return <PikkaAppNav />;
    }
}
