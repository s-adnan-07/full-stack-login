import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Copyright from '../components/Copyright'
import { useState } from 'react'
import getUserData from '../handlers/getUserData'
import axios from 'axios'
import {
  TokenResponse,
  handleSignInErrors,
} from '../handlers/handleServerMessages'
import { loginUrl } from '../constants'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useNavigate } from 'react-router-dom'
import ErrorList from '../components/ErrorList'

const SignIn = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<string[]>([])
  const [email, setEmail] = useState('test')
  const [password, setPassword] = useState('test')
  const [showPassword, setShowPassword] = useState(false)
  const signInHook = useSignIn()

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
    e.preventDefault()
    setPassword(e.target.value)
    setErrors([])
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user_data = getUserData(data)

    try {
      const { data } = await axios.post<TokenResponse>(loginUrl, user_data)
      const successfulSignIn = signInHook({
        auth: { token: data.token, type: 'Bearer' },
      })

      if (!successfulSignIn) {
        setErrors(['Something went wrong'])
        return
      }

      setTimeout(() => {
        navigate('/home', { replace: true })
      }, 1000)
    } catch (e) {
      const serverErrors = handleSignInErrors(e)
      setErrors(serverErrors)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ErrorList errors={errors} />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!email && true}
            helperText={!email && 'Email is required'}
            onClick={() => (setEmail(''), setErrors([]))}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            error={!password && true}
            helperText={!password && 'Password is Required'}
            onChange={handlePasswordChange}
            onClick={() => {
              if (password === 'test') setPassword('')
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default SignIn
