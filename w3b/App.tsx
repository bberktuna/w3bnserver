import React from 'react';
import { StyleSheet, Text, ScrollView, View, SafeAreaView, FlatList } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { CardView } from './src/components';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
};
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Places} from './src/screens/Places';


const client = new ApolloClient({
  uri: 'https://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
});



export default function App() {

  return (
  <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
    <View style={styles.container}>
        <Places />
      </View>
    </PaperProvider>
  </ApolloProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: 40
  }
});