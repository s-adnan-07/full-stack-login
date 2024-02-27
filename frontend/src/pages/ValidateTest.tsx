import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

const ValidateTest = () => {
  const [minimum, setMinimum] = useState(false)
  const [number, setNumber] = useState(false)
  const [letter, setLetter] = useState(false)
  const [spChar, setSpChar] = useState(false)

  const minimum8Characters = (x: string) => x.length >= 8
  const contains1Number = (x: string) => /\d/.test(x)
  const contains1Letter = (x: string) => /[A-Za-z]/.test(x)
  const contains1SpChar = (x: string) => /[^\r\n\w]/.test(x)

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault()
    let x = e.target.value

    setMinimum(minimum8Characters(x))
    setNumber(contains1Number(x))
    setLetter(contains1Letter(x))
    setSpChar(contains1SpChar(x))
    return
  }

  return (
    <List>
      <ListItem>
        <TextField label="password" onChange={handlePasswordChange} />
      </ListItem>
      <ListItem>
        <ListItemIcon>{minimum ? <DoneIcon /> : <CloseIcon />}</ListItemIcon>
        <ListItemText>Minimum 8 Characters</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{number ? <DoneIcon /> : <CloseIcon />}</ListItemIcon>
        <ListItemText>At least 1 number</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{letter ? <DoneIcon /> : <CloseIcon />}</ListItemIcon>
        <ListItemText>At least 1 letter</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{spChar ? <DoneIcon /> : <CloseIcon />}</ListItemIcon>
        <ListItemText>At least 1 special character</ListItemText>
      </ListItem>
    </List>
  )

  // return (
  //   <Box component="form" maxWidth="xs">
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //         <TextField
  //           label="password"
  //           onChange={handlePasswordChange}
  //         />
  //       </Grid >

  //       <Grid item xs={12} sm={1}>
  //         {
  //           minimum ? <DoneIcon /> : <CloseIcon />
  //         }
  //       </Grid>
  //       <Grid item xs={12} sm={1}>
  //         Minimum 8 Characters
  //       </Grid>

  //       <Grid item xs={12} sm={1}>
  //         {
  //           letter ? <DoneIcon /> : <CloseIcon />
  //         }
  //       </Grid>
  //       <Grid item xs={12} sm={1}>
  //         At least 1 letter
  //       </Grid>

  //       <Grid item xs={12} sm={1}>
  //         {
  //           number ? <DoneIcon /> : <CloseIcon />
  //         }
  //       </Grid>
  //       <Grid item xs={12} sm={1}>
  //         AAt least 1 number
  //       </Grid>

  //       <Grid item xs={12} sm={1}>
  //         {
  //           spChar ? <DoneIcon /> : <CloseIcon />
  //         }
  //       </Grid>
  //       <Grid item xs={12} sm={1}>
  //         At least 1 special character
  //       </Grid>

  //     </Grid>
  //   </Box>
  // )
}

export default ValidateTest
