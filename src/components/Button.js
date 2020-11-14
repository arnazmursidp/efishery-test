import { PureComponent } from 'react'
import { Button } from '@material-ui/core'

class CButton extends PureComponent {
  render() {
    const { onClick, text, color } = this.props
    return (
      <div className="Button">
        <Button
          variant="contained"
          color={color || 'primary'}
          onClick={onClick}
        >
            {text}
        </Button>
      </div>
    ) 
  }
}

export default CButton
