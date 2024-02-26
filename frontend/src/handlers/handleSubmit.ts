import axios from 'axios'

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const url = 'http://127.0.0.1:3000/api/auth/login'
  const res = await axios.post(url, {
    email: data.get('email'),
    password: data.get('password'),
  })

  // jwt
  console.log(res.data)
  // console.log({
  //   email: data.get('email'),
  //   password: data.get('password'),
  // })
}

export default handleSubmit
