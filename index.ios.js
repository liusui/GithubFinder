/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    TextInput,
} from 'react-native';
var BASE_URL = "https://api.github.com/search/users?q=";

export default class GithubFinder extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    render() {
        var content;
        if (this.state.dataSource.getRowCount() === 0) {
            content = <Text>Please enter a searchTerm to search RESULTS!</Text>
            console.log("22222222222222222222")
        } else {
            content = <ListView
                ref="listView"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
            />
            console.log("-----------------------")
        }

        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="search for a project"
                    style={styles.searchBarInput}
                    onEndEditing={this.onSearchChange}
                />
                {content}
            </View>
        );
    }

    onSearchChange(event: object) {
        var searchTerm = event.nativeEvent.text.toLowerCase();
        var queryUrl = BASE_URL + encodeURIComponent(searchTerm);
        fetch(queryUrl)
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.items) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                    });
                    console.log(responseData);
                }
            })
    }

    renderRow(repo: object) {
        return (
            <View>
                <View style={styles.row}>
                    <Image
                        source={{uri : repo.avatar_url}}
                        style={styles.profpic}
                    />
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>{repo.repos_url}</Text>
                        <Text style={styles.subtitle}>{repo.login}</Text>
                    </View>
                </View>
                <View style={styles.cellBorder}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    customimg: {
        width: 200,
        height: 200,
    },
    searchBarInput: {
        marginTop: 20,
        padding: 5,
        fontSize: 15,
        height: 30,
        backgroundColor: '#c2eac0',
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    cellBorder: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: 1,
        marginLeft: 4,
    },
    profpic: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    cellBorder: {
        backgroundColor: '#333333',
        height: 1,
        marginLeft: 4,
    },
});

AppRegistry.registerComponent('GithubFinder', () => GithubFinder);
