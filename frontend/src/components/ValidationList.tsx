import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useEffect, useState } from 'react'
import ValidIcon from './ValidIcon'
import InValidIcon from './InValidIcon'
import {
  contains1Letter,
  contains1Number,
  contains1SpChar,
  contains1UpperCaseLetter,
  minimum8Characters,
} from '../handlers/checkPassword'

type Props = {
  password: string
}

const ValidationList = ({ password }: Props) => {
  const [minimum, setMinimum] = useState(false)
  const [number, setNumber] = useState(false)
  const [letter, setLetter] = useState(false)
  const [upperCaseLetter, setupperCaseLetter] = useState(false)
  const [spChar, setSpChar] = useState(false)

  useEffect(() => {
    setMinimum(minimum8Characters(password))
    setNumber(contains1Number(password))
    setLetter(contains1Letter(password))
    setupperCaseLetter(contains1UpperCaseLetter(password))
    setSpChar(contains1SpChar(password))
  }, [password])

  return (
    <List dense>
      <ListItem>
        <ListItemIcon>{minimum ? <ValidIcon /> : <InValidIcon />}</ListItemIcon>
        <ListItemText>Minimum 8 Characters</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{number ? <ValidIcon /> : <InValidIcon />}</ListItemIcon>
        <ListItemText>At least 1 number</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{letter ? <ValidIcon /> : <InValidIcon />}</ListItemIcon>
        <ListItemText>At least 1 letter</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          {upperCaseLetter ? <ValidIcon /> : <InValidIcon />}
        </ListItemIcon>
        <ListItemText>At least 1 upper case letter</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>{spChar ? <ValidIcon /> : <InValidIcon />}</ListItemIcon>
        <ListItemText>At least 1 special character</ListItemText>
      </ListItem>
    </List>
  )
}

export default ValidationList
