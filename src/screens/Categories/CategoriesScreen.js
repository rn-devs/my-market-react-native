import React from 'react';
import {
  FlatList,
  Text,
  ScrollView,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { Tile } from 'react-native-elements';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };

  constructor(props) {

    super(props);
    this.state = {
      categories: []
    }
  }

  getData(categories){
    // console.log("hello")
    this.setState({
      categories: categories
    })
  }

  componentDidMount(){
    // console.log(this.state)

    fetch("http://192.168.43.72:3000/api/search/getCategories")
    .then(response => response.json())
    .then((categories) => this.getData(categories))
    .catch(err => console.log(err));
  }



  render() {
    const { navigate } = this.props.navigation;
    
    const renderMenuItem = ( item ) => {
      return(
        <View style={styles.card}>
          <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)'
          >
            <View style={styles.categoriesItemContainer}>
              <Tile
                key={item.index}
                title={item.item.toUpperCase()}
                featured
                onPress={() => navigate('ItemsList', { itemType: item.item })}
                imageSrc={require('../../image.png')}
              />
            </View>
          </TouchableHighlight>
        </View>
      )
    };
    const data = this.state.categories;
    if(data != undefined)
      return (
        <ScrollView>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderMenuItem}
            keyExtractor={item => item}
          />
        </ScrollView>
      );
      else
    return(
      <View>
        <Text>Check Your Network</Text>
      </View>
    )
  }
}
