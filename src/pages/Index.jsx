import { Container, VStack, Heading, Input, Button, List, ListItem, ListIcon, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTasks = [...tasks, { id: Date.now(), text: input, completed: false }];
      setTasks(newTasks);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading mb={4}>Todo List</Heading>
        <VStack width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button colorScheme="blue" onClick={handleAddTask}>Add Task</Button>
        </VStack>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(task.id)}>
                {task.text}
              </Checkbox>
              <ListIcon as={FaTrash} color="red.500" cursor="pointer" onClick={() => handleDeleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;