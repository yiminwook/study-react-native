import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, useColorScheme, Platform, FlatList } from 'react-native';
import InputForm from '../components/InputForm';
import TodoItem from '../components/TodoItem';
import { useSelector } from '../redux/store';
import { ScreenProps } from '../types/Navigation';

const Main = ({ route, navigation }: ScreenProps<'Main'>) => {
  const theme = useColorScheme();
  const todos = useSelector(state => state.todo.todos);
  const completedTodos = todos.filter(todo => todo.isDone);
  const uncompletedTodos = todos.filter(todo => !todo.isDone);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} hidden={false} barStyle={theme === 'light' ? 'light-content' : 'dark-content'} />
      <Text style={styles.pageTitle}>Todo App</Text>
      <View style={styles.listView}>
        <Text style={styles.listTitle}>할 일</Text>
        {uncompletedTodos.length !== 0 ? (
          <FlatList
            data={uncompletedTodos}
            keyExtractor={props => `todo-${props.id}`}
            renderItem={props => <TodoItem {...props.item} />}
          />
        ) : (
          <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
        )}
      </View>
      <View style={styles.separator} />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>완료된 일</Text>
        {completedTodos.length !== 0 ? (
          <FlatList
            data={completedTodos}
            keyExtractor={props => `todo-${props.id}`}
            renderItem={props => <TodoItem {...props.item} />}
          />
        ) : (
          <Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>
        )}
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
  emptyListText: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373',
  },
});

export default Main;
