const getUserData = (data: FormData) => ({
  firstName: data.get('firstName'),
  lastName: data.get('firstName'),
  email: data.get('email'),
  password: data.get('password'),
})

export default getUserData
