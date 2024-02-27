import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={12}>
        <Typography variant="h2" fontWeight={700} paddingX={4} paddingY={6}>
          Welcome To the Application
        </Typography>
      </Paper>
    </Container>
  )
}

export default Home
