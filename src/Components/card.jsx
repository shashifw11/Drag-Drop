import {ListItem} from "@chakra-ui/react" ; 
import { useDrag } from 'react-dnd'

export const Card = ({item,type,index,onDropCard})=>{

   const  [isDraggble,dragRef] = useDrag({

    type : type , 
    item : ()=>({...item,index}),
    end: (item,monitor)=>{
        const dropResult = monitor.getDropResult();
         if(dropResult && item){
            onDropCard(item)
         }
    },
    collect :(monitor)=>{
        isDragging :monitor.isDragging()
    }, 
})
     return (
        <ListItem  ref = {dragRef} p = "2" borderRadius = "md" boxShadow = "md" mb = "2" textAlign = "center">
          {item.name}
        </ListItem>
     )
}