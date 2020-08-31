import React from 'react';
import { SafeAreaView, FlatList, Button, Text } from 'react-native';
import {
  usePlacesQuery,
  useCreatePlaceMutation
} from '../graphql/graphql-generated';
import { CardView } from '../components';

interface Props {}

const Places: React.FC<Props> = () => {
  const { data, refetch } = usePlacesQuery();
  const [createPlace] = useCreatePlaceMutation();
  return (
    <SafeAreaView>
      {
        (!data) ?
        <Text style={{flex:1, alignSelf: 'center', justifyContent: "center"}} >Sorry,there is no data</Text>
        
        :

      <FlatList
        
        data={data && data.places ? data.places : []}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CardView {...(item as any)} />}

      />
    }
    </SafeAreaView>
  );
};
export default Places;


-------------


data.places.map(place => (
  <View key={place.id}>
  <Text> Place title : {place.title}</Text>
  <Text> Description : {place.description}</Text>
  <Text> imageUrl : {place.imageUrl}</Text>
  <Text> creationDate : {place.creationDate}</Text>
  <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}}></View>
  </View>
  ))