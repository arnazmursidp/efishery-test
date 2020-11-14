import { PureComponent } from 'react'
import { TextField } from '@material-ui/core'

class Input extends PureComponent {
  render() {
    const {
      placeholder,
      onChange,
      value,
      name,
      styling
    } = this.props
    return (
      <div className="Input">
        <TextField
          style={{
            margin: '8px'
          }}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          variant={styling || 'outlined'}
        />
      </div>
    ) 
  }
}

export default Input
