import React from 'react';
import { SafeAreaView, FlatList, Text, View, ScrollView } from 'react-native';
import { usePlacesQuery, usePlaceQuery } from '../graphql/graphql-generated';
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper"


const CardView = ({title, description, imageUrl, onPress, user}: any) => {
  <Card onPress={() => onPress && onPress() }>

      <Card.Cover source={{ uri: imageUrl || "https://picsum.photos/700"}} />
      
      <Card.Content>
          <Title> {title} </Title>
          <Paragraph> {description} </Paragraph>
      </Card.Content>
  </Card>
}


const Places = () => {
  
  const { data, loading, error} = usePlacesQuery()

  
  return (
    (!data?.places) ? <Text> no data </Text> :
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      
      <SafeAreaView>
      <FlatList

        data={data && data.places ? data.places : []}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CardView {...(item as any)} />}
        
      />
    </SafeAreaView>
    </View>
    
    
    
  );
};

export {Places}