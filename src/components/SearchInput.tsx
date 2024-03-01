import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View, FlatList, Text} from 'react-native';
import {getLocations} from '../api';
import {SearchResult} from '../types';

const SearchInput = ({navigation}: {navigation: any}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<
    SearchResult[] | null
  >(null);
  const [queryTimeout, setQueryTimeout] = React.useState<NodeJS.Timeout | null>(
    null,
  );

  const handleInputChange = (text: string) => {
    setSearchQuery(text);
    getSearchResults();
  };

  const getSearchResults = () => {
    if (queryTimeout !== null) {
      clearTimeout(queryTimeout);
    }

    const timeout = setTimeout(async () => {
      if (searchQuery !== '') {
        const results = await getLocations(searchQuery);
        setSearchResults(results);
        return;
      }

      setSearchResults(null);
    }, 300);

    setQueryTimeout(timeout);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchQuery('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={handleInputChange}
        style={styles.input}
        placeholder="Enter location name"
        placeholderTextColor="#F0F0F0"
      />

      {searchQuery && searchResults && searchResults?.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <Text
              onPress={() =>
                navigation.navigate('SelectedLocation', {
                  coordinates: item.geometry.coordinates,
                  location_name: item.place_name,
                })
              }
              style={styles.result}>
              {item.place_name}
            </Text>
          )}
          keyExtractor={item => item.id}
          style={styles.resutlList}
        />
      ) : (
        searchQuery && (
          <View style={styles.resutlList}>
            <Text style={styles.result}>No matched locations</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative',
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 12,
    color: '#FFF',
    borderColor: '#FFF',
  },
  resutlList: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  result: {
    color: '#000',
    padding: 8,
    fontSize: 18,
  },
});

export default SearchInput;
