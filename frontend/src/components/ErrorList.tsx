import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Props = {
  errors: string[]
}

const ErrorList = ({ errors }: Props) => {
  return (
    <Stack spacing={1}>
      {errors.map((error) => (
        <Paper elevation={3} sx={{ paddingX: 2, paddingY: 1, bgcolor: 'red' }}>
          <Typography color="white">{error}</Typography>
        </Paper>
      ))}
    </Stack>
  )
}

export default ErrorList
