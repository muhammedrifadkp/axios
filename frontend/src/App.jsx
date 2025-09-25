import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const [name,setNewName]= useState("")
  const [age,setNewAge]= useState("")

  // post data to backend
  async function postNewUser(){
    const res = await axios.post("http://localhost:3000/users",{name,age})
    setUsers([...users,res.data])
    setNewName("")
    setNewAge("")
  }

  // update data to backend
  async function editUser(id) {
    const newAge = prompt("Enter new Age")
    if(!newAge)return
    const res = await axios.patch(`http://localhost:3000/users/${id}`,{age:newAge})
    setUsers(users.map(user=>id===user._id?res.data:user))
  }

  async function deleteUser(id) {
    const confirmDelete = confirm("are you confirm delete this user")
    if(!confirmDelete)return;
    await axios.delete(`http://localhost:3000/users/${id}`)
    setUsers(users.filter(user=>user._id!==id));
  }

  // get users from the backend
  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => setUsers(res.data)
      )
  }, [])
  
  return (
    <div>
      <h1>GET data</h1>
      <ul>
        {
          users.map((user, i) => {
            return (<li key={i}>{user.name} | {user.age} | <button onClick={()=>{editUser(user._id)}}>edit</button> | <button onClick={()=>{deleteUser(user._id)}}>delete</button></li>)
          })
        }
      </ul>

      <input type="text" value={name} onChange={(e)=>{setNewName(e.target.value)}} />
      <input type="number" value={age} onChange={(e)=>{setNewAge(e.target.value)}} />
      <button onClick={postNewUser}>add user</button>
    </div>
  )
}

export default App
