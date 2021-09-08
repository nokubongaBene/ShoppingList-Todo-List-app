import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/task';
import Dialog from "react-native-dialog";


export default function App() {

  const [task, setTask]= useState();
  const [taskItems, setTaskItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [taskIndex, setIndex]= useState(0);
  const [updateTask, setUpdate]= useState();
  

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completedList = (index) =>{
    setUpdate(taskItems[index]);
    setVisible(true);
    setIndex(index);

  }
  
    const showDialog = () => {
      setVisible(true);
    };

    const handleUpdate = () => {
      let updated = taskItems;
      updated[taskIndex]= updateTask;
      setUpdate(updated);
      setVisible(false);
     }
  
    const handleDelete = () => {
      let itemCopy = [...taskItems];
      itemCopy.splice(taskIndex, 1);
      setTaskItems(itemCopy);
      setVisible(false);
    };

    const handleCancel = () => {
      setVisible(false);
    };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.tasksWrapper}>
<Text style={styles.sectionTitle}>Shopping List</Text>
      <View style={styles.items}>
      <Dialog.Container visible={visible}>
      <Dialog.Title>Update/Delete List</Dialog.Title>
      <Dialog.Input label="update" placeholder="Update here" value={updateTask} onChangeText={text => setUpdate(text)} />
      <Dialog.Button label= "Update" onPress={handleUpdate} />
      <Dialog.Button label="Delete" onPress={handleDelete} />
      <Dialog.Button label="Cancel" onPress={handleCancel} />
     
    </Dialog.Container>
        {/*this is where the task will go*/}
        {
          
          taskItems.map((item, index) => {
            return (
            <TouchableOpacity key={index} onPress={() => completedList(index)}>
            <Task text={item}/>
            </TouchableOpacity>
            )
           
          })
        }
        {/* <Task text={'Task 1'} />
        <Task text={'Task 2'} /> */}


        </View>

      </View>
      </ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height" }
      style={styles.writeTaskWrapper}>

      <TextInput style={styles.input} placeholder='Add a Task' value={task} onChangeText={text => setTask(text)}/>

      <TouchableOpacity onPress={() => handleAddTask()} >
      <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#000000',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
    
  },
  addWrapper:{
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText:{},
});
