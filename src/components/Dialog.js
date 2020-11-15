import { Dialog } from '@material-ui/core'

function CDialog (props) {
  const { isOpened, onClose, children } = props

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth
    >
      {children}
    </Dialog>
  )
}

export default CDialog
