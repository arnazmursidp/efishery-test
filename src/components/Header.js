import { AppBar, Toolbar, Typography } from '@material-ui/core'

function Header (props) {
  const { title } = props
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header