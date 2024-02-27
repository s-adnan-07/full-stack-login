import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../components/Copyright'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import getUserData from '../handlers/getUserData'
import { registerUrl } from '../constants'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import ValidationList from '../components/ValidationList'
import passwordValid from '../handlers/checkPassword'
import {
  handleSignUpErrors,
  SuccessResponse,
} from '../handlers/handleServerMessages'
import ErrorList from '../components/ErrorList'

const SignUp = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showlist, setShowlist] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState('')

  // This hooks are just to show error messages
  // The values in the form are sent to server
  const [password, setPassword] = useState('test')
  const [email, setEmail] = useState('test')
  const [firstName, setFirstName] = useState('test')

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(e.target.value)
    setErrors([])
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(e.target.value)
    setShowlist(!passwordValid(password))
    setErrors([])
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user_data = getUserData(data)
    setShowlist(false)

    console.log(registerUrl)
    try {
      const { data } = await axios.post<SuccessResponse>(registerUrl, user_data)
      setSuccess(data.message)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (e) {
      const serverErrors = handleSignUpErrors(e)
      setErrors(serverErrors)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} hidden={!success && true}>
              <Paper
                elevation={3}
                sx={{ paddingX: 2, paddingY: 1, bgcolor: 'green' }}
              >
                <Typography color="white">{success}, redirecting...</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!firstName && true}
                helperText={!firstName && 'First Name is required'}
                onClick={() => (setFirstName(''), setErrors([]))}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!email && true}
                helperText={!email && 'Email is required'}
                onClick={() => (setEmail(''), setErrors([]))}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                error={!password && true}
                helperText={!password && 'Password is Required'}
                onChange={handlePasswordChange}
                onClick={() => {
                  if (password === 'test') setPassword('')
                  setShowlist(!passwordValid(password))
                  setErrors([])
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} hidden={!errors && true}>
              <ErrorList errors={errors} />
            </Grid>
            <Grid item xs={12} hidden={!showlist && true}>
              <ValidationList password={password} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default SignUp
