
import { useState } from 'react';
import './App.css';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAdd() {
    setShowAddFriend((show) => !show)

  }
  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false)
  }
  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend))
    setShowAddFriend(false)
  }
  function handleSplitBill(value) {
    setFriends(friends => friends.map((friend) => friend.id ===
      selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend))
    setSelectedFriend(null)
  }
  return (
    <>
      <div className='app'>
        <div className='sidebar'>
          <FriendsList friends={friends} onSelect={handleSelection} selectedFriend={selectedFriend} />
          {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}
          {/* {showAddFriend && null} */}
          <Button onClick={handleShowAdd}>{showAddFriend ? "close" : "Add friend"}</Button>
        </div>
        {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplit={handleSplitBill} />}
      </div>

    </>
  );
}
function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>{children}</button>
  )
}
export default App;

function FriendsList({ friends, onSelect, selectedFriend }) {
  // const friends = initialFriends;

  return (<>
    <ul>

      {friends.map((friend) =>
        <Friend friend={friend} key={friend.id} onSelect={onSelect} selectedFriend={selectedFriend} />)}
    </ul>

  </>)
}
function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt='img' />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (<p className='red'>You owe   {friend.name} {Math.abs(friend.balance)}€</p>)}
        {friend.balance > 0 && (<p className='green'>  {friend.name} owes {Math.abs(friend.balance)}€</p>)}
        {friend.balance === 0 && (<p > You and   {friend.name} are even</p>)}

        <Button onClick={() => onSelect(friend)} > {isSelected ? "Close" : "Select"}</Button>
      </li>

    </>
  )

}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")
  function handleSubmit(e) {

    e.preventDefault();
    if (!name || !image) return
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName("")
    setImage("https://i.pravatar.cc/48");
  }
  return (<>
    <form className='form-add-friend' method='get' onSubmit={handleSubmit}>
      <label>👫Friend nam</label>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <label>🌄 Image URL</label>
      <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />

      <Button >Add Friend</Button>

    </form>
  </>)
}
function FormSplitBill({ selectedFriend, onSplit }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user")
  const paidByFriend = bill ? bill - paidByUser : ""
  function handleSubmit(e) {
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplit(whoIsPaying === "user" ? paidByFriend : -paidByUser)

  }
  return (<>
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input type='number' value={bill} onChange={(e) => setBill(e.target.value)} />
      <label>🧍‍♀️ your expense</label>
      <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : (e.target.value))} />
      <label>👭{selectedFriend.name}'s expense</label>
      <input type='number' disabled value={paidByFriend} />
      <label>🤑Who is paying the bill ?</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="you">you</option>
        <option value="friend">{selectedFriend.name} </option>
      </select>
      <Button >Spilt bill</Button>
    </form>

  </>)
}