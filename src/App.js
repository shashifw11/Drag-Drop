import logo from './logo.svg';
import './App.css';
import {Container , Stack, Flex , List , ListItem , Heading} from "@chakra-ui/react" ; 
import { Card } from './Components/card';
import {useState} from "react" ; 
import { useDrop } from 'react-dnd'

function App() {

  const [data , setData] = useState([
       {name : "book1"},
       {name : "book2"},
       {name : "book3"},
       {name : "book4"},
       {name : "book5"},
       {name : "book6"}
  ])

  const [team , setTeam] = useState([]);

  const [{isOver} , addToTeamRef] = useDrop({
    accept : "data" , 
    collect : (monitor)=>({isOver : !!monitor.isOver()}) ,
  }) ; 

  const [{isOver:isCardOver} , removeFromTeamRef] = useDrop({
    accept : "team" , 
    collect : (monitor)=>({isOver : !!monitor.isOver()}),
  }) ; 

  const moveCardToTeam = (item)=>{
      setData(prev=>prev.filter((_,i)=>i !== item.index)) ; 
      setTeam((prev)=>[...prev,item]);
  }
  const removeCardToTeam = (item)=>{
    console.log(item)
    setTeam(prev=>prev.filter((_,i)=>i !== item.index)) ; 
      setData((prev)=>[...prev,item]);
  }

  return (
   <Container maxW = "800px">
    <Flex justify= "space-between" height = "90vh" align = "cenetr">
      <Stack width = "300px">
        <Heading fontSize = "3xl" color = "yellow.800" textAlign = "center">
          List 1
        </Heading>
        <List 
        p="4" 
        minH = "70vh" 
        boxShadow="xl" 
        borderRadius = "md" 
        ref = {removeFromTeamRef}>

        {data.map((item , i)=>{
           return   <Card 
                      key = {i} 
                      item = {item} 
                      type = "data" 
                      index = {i}  
                      onDropCard = { moveCardToTeam }/>
        })}
        </List>
      </Stack>
      <Stack width = "300px">
      <Heading fontSize = "3xl" color = "sky" textAlign = "center">
          List 2
        </Heading>
        <List 
        p="4" 
        minH = "70vh" 
        boxShadow="xl" 
        borderRadius = "md" 
        ref = {addToTeamRef}>

        {team.map((e,i)=>{
           return   <Card 
                      key = {e.name}
                      item = {e}
                      type = "team" 
                      index = {i} 
                      onDropCard = { removeCardToTeam }/>
                 })}
        </List>
      </Stack>
    </Flex>
   </Container>
  );
}

export default App;
