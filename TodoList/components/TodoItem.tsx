import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CheckBox from '../assets/checkBox.svg';

const TodoItem = () => {
  return (
    <View style={styles.itemContainer}>
      <CheckBox />
      <Pressable style={styles.itemCheckBox} hitSlop={10}></Pressable>
      <Text style={[styles.itemText, styles.itemTextChecked]}>코딩하기</Text>
      <Pressable style={[styles.deleteButton, styles.deleteButtonDone]} hitSlop={10}></Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {},
  itemCheckBox: {},
  itemText: {},
  itemTextChecked: {},
  deleteButton: {},
  deleteButtonDone: {},
});
