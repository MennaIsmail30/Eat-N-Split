
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
  function handleShowAdd() {
    setShowAddFriend((show) => !show)

  }
  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false)
  }
  return (
    <>
      <div className='app'>
        <div className='sidebar'>
          <FriendsList friends={friends} />
          {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}
          {/* {showAddFriend && null} */}
          <Button onClick={handleShowAdd}>{showAddFriend ? "close" : "Add friend"}</Button>
        </div>
        <FormSplitBill />
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

function FriendsList({ friends }) {
  // const friends = initialFriends;

  return (<>
    <ul>

      {friends.map((friend) =>
        <Friend friend={friend} key={friend.id} />)}
    </ul>

  </>)
}
function Friend({ friend }) {
  return (
    <>
      <li>
        <img src={friend.image} alt='img' />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (<p className='red'>You owe   {friend.name} {Math.abs(friend.balance)}€</p>)}
        {friend.balance > 0 && (<p className='green'>  {friend.name} owes {Math.abs(friend.balance)}€</p>)}
        {friend.balance === 0 && (<p > You and   {friend.name} are even</p>)}

        <Button>Select</Button>
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
function FormSplitBill() {
  return (<>
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>
      <label>💰 Bill value</label>
      <input type='number' />
      <label>🧍‍♀️ your expense</label>
      <input type='number' />
      <label>👭X's expense</label>
      <input type='number' disabled />
      <label>🤑Who is paying the bill ?</label>
      <select>
        <option value="you">you</option>
        <option value="friend">X </option>
      </select>
      <Button>Spilt bill</Button>
    </form>

  </>)
}