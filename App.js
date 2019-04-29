import React from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  Linking,
  WebView,
  Dimensions
} from "react-native";
import {
  List,
  ListItem
} from 'react-native-elements'
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import {
  TabView,
  SceneMap
} from 'react-native-tab-view';
import * as WeChat from 'react-native-wechat';
WeChat.registerApp('wx777228fb29e9499e');
class HomeScreen extends React.Component {
    constructor() {
      super()
      this.state = {
        data: [1, 2, 3],
        loaded: false,
        index: 0,
        routes: [{
            key: 'first',
            title: 'First'
          },
          {
            key: 'second',
            title: 'Second'
          },
          {
            key: 'personinfo',
            title: '个人信息'
          }
        ],
      }
    }
    fetchData() {
      fetch('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=2b2948520c40479aa9f2b380d0fbe79c').then(response => response.json()).then(value => {
        this.setState({
          data: value.articles,
          loaded: true
        });
      })
    }
    openUrl() {
      let url = 'http://www.google.com';
      Linking.openURL(url)
    }
    componentDidMount() {
      this.fetchData()
    }
    FirstRoute = () => {
      return ( < FlatList data = {
          this.state.data
        }
        extraData = {
          this.state
        }
        renderItem = {
          this.renderItem
        }
        />);  
      }
      renderItem = ({
        item
      }) => {
        const {
          navigate
        } = this.props.navigation;
        return ( <
          ListItem title = {
            item.author
          }
          subtitle = {
            item.publishedAt
          }
          leftAvatar = {
            {
              source: {
                uri: item.urlToImage
              }
            }
          }
          onPress = {
            () => navigate('Another', {
              goUrl: item.url
            })
          }
          />
        )
      }
      render() {
        return ( <
          TabView navigationState = {
            this.state
          }
          renderScene = {
            ({
              route
            }) => {
              switch (route.key) {
                case 'first':
                  return this.FirstRoute();
                default:
                  return this.FirstRoute();
              }
            }
          }
          onIndexChange = {
            index => this.setState({
              index
            })
          }
          initialLayout = {
            {
              width: Dimensions.get('window').width
            }
          }
          tabBarPosition = {'bottom'}
          />
        );
      }
    }
    class AnotherScreen extends React.Component {
      async sharewt() {
        try {
          let result = await WeChat.shareToTimeline({
            type: 'text',
            description: 'hello, wechat'
          });
          console.log('share text message to time line successful:', result);
        } catch (e) {
          if (e instanceof WeChat.WechatError) {
            console.error(e.stack);
          } else {
            throw e;
          }
        }
      }
      render() {
        this.sharewt()
        const {
          navigation
        } = this.props
        const itemurl = navigation.getParam('goUrl');
        return ( <
          WebView source = {
            {
              uri: itemurl
            }
          }
          style = {
            {
              marginTop: 20
            }
          }
          />
        );
      }
    }
    class UserScreen extends React.Component {
      render() {

      }
    }
    const AppNavigator = createStackNavigator({
      Home: {
        screen: HomeScreen
      },
      Another: {
        screen: AnotherScreen
      }
    });

    export default createAppContainer(AppNavigator);