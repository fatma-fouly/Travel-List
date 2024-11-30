import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export default function App() {

const [Items, setItems] = useState([]);

  function handleAddItems(item){
  setItems((Items) => [...Items , item])
  }
  function handleDelete(id){
    setItems ((Items) => Items.filter(item => item.id !== id) )
  }

  function handleTogglePacked(id){
  setItems(Items => Items.map(item => item.id === id ? {...item , packed: !item.packed} : item))
  }
  return (
   <>
    <div >
      <Logo />
      <Form onAddItem = {handleAddItems}  />
      <PackList Items={Items} onDelete ={handleDelete} ontoggle = {handleTogglePacked}  />
      <Statics items = {Items} />
    </div>
    </>
  );
}


function Logo(){
return  <h1> 🏝️ Far Away 🧳 </h1>
}

function Form({onAddItem}){
const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState(1);

function handleSubmit(e){
  e.preventDefault();
  if (!description) {return} ;
  
  const newItem = {quantity , description , packed :false , id: Date.now()};
  // console.log(newItem);
  setDescription("");
  setQuantity(1);
  onAddItem(newItem);
}

return(
  <form onSubmit={handleSubmit} className='add-form'>
    <h3>   What do you need in your trip? 😍 </h3>
    <select value={quantity} onChange={(e) => {
        setQuantity(e.target.value)
      }}>
     {Array.from( {length : 20} , (_ , i) => i + 1 ).map((num) => (
      <option value={num} key={num}>  {num}  </option>
      ))}
    </select>
    <input type='text' placeholder='item..' value={description} onChange={(e) => { 
       setDescription(e.target.value)
    }}></input>
    <button>Add</button>
  </form>
)
}
function PackList({Items , onDelete , ontoggle }){
return (
 <div className='list'>
  <ul>
    {Items.map((i) => (
      <Item   item={i}  key={i.id} onDelete={onDelete} ontoggle = {ontoggle}/>
    ))}
    </ul> 
 </div>
)
}
function Item({item , onDelete , ontoggle}){
return (
<>
<li>
<input type='checkbox' value={item.packed}  onChange={() => {ontoggle(item.id)}} />  
<span style={item.packed ? {textDecoration :"line-through"} : {}} >{item.quantity} {item.description} </span>
<button onClick={() => onDelete(item.id)} > ❌ </button>
</li>
</>
)
}
function Statics( {items} ){
  if(!items.length){
   return <footer className='stats'>
      <em> Start adding some items in your list ✈️</em>
      </footer>
  }
  const numItem = items.length;
  const packedItems = items.filter((item) => item.packed).length;
return (
  <footer className='stats'>
    <em> { numItem === packedItems ? "You got everything , Ready to go ✈️ "   : ` You have ${numItem} item for your list , and you already packed ${packedItems} items`} </em>
  </footer>
)

}

