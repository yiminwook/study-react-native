import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CheckBoxChecked from '../assets/checkBoxChecked.svg';
import CheckBoxUnChecked from '../assets/checkBoxUnChecked.svg';
import DeleteButton from '../assets/deleteIcon.svg';
import { useDispatch } from '../redux/store';
import { deleteTodo, updateTodo } from '../redux/slice/todoSlice';

interface TodoItemProps {
  id: number;
  text: string;
  isDone: boolean;
}

const TodoItem = ({ id, text, isDone }: TodoItemProps) => {
  const dispatch = useDispatch();

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ id, isDone: !isDone }));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
  };

  return (
    <View style={styles.itemContainer}>
      <Pressable style={styles.itemCheckBox} hitSlop={10} onPress={handleUpdateTodo}>
        {isDone ? <CheckBoxChecked style={styles.itemCheckBoxChecked} /> : <CheckBoxUnChecked />}
      </Pressable>
      <Text style={[styles.itemText, isDone ? styles.itemTextChecked : null]}>{text}</Text>
      <Pressable
        style={[styles.deleteButton, isDone ? styles.deleteButtonDone : null]}
        hitSlop={10}
        onPress={handleDeleteTodo}
      >
        <DeleteButton />
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F7F8FA',
  },
  itemCheckBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
  },
  itemCheckBoxChecked: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  itemText: {
    marginRight: 'auto',
    paddingRight: 25,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373',
  },
  itemTextChecked: {
    opacity: 0.3,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    opacity: 0.8,
  },
  deleteButtonDone: {
    opacity: 0.3,
  },
});
