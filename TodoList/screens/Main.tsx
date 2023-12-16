import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, useColorScheme, Platform } from 'react-native';
import InputForm from '../components/InputForm';
import TodoItem from '../components/TodoItem';

const Main = () => {
  const theme = useColorScheme();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} hidden={false} barStyle={theme === 'light' ? 'light-content' : 'dark-content'} />
      <Text style={styles.pageTitle}>Todo App</Text>
      <View style={styles.listView}>
        <Text style={styles.listTitle}>할 일</Text>
        <TodoItem />
      </View>
      <View style={styles.separator} />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>완료된 일</Text>
      </View>
      <InputForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#f7f8fa',
  },
  pageTitle: {
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 54,
    fontWeight: '600',
  },
  separator: {
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  },
  listView: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 41,
    fontWeight: '500',
  },
});

export default Main;
