import { useEffect, useState } from "react"
import { Form } from "./Form"
import { sleep } from "./lib/utils"
import { IFormData } from "./types"

async function getUser() {
  await sleep()
  return{
    name: "Luisa",
    age: 25,
    zipcode: "15377654",
    street: "Rua 1",
    city: "Cidade 2",
  }
}

function App() {
  const [user, setUser] = useState({} as IFormData)

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log('Terminou de buscar o user')
        setUser(data)
      })
  }, [])

  return (
    <Form user={user}/>
  )
}

export default App
