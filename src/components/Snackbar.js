import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

function CSnackbar (props) {
  const { color, isOpened, autoHideDuration, onClose, text } = props

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={autoHideDuration || 1000}
      onClose={onClose}
    >
      <Alert severity={color || 'success'}>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default CSnackbar
