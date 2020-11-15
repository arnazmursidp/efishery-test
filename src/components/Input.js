import { PureComponent } from 'react'
import { TextField } from '@material-ui/core'

class Input extends PureComponent {
  render() {
    const {
      label,
      placeholder,
      onChange,
      value,
      name,
      styling,
      style,
      size
    } = this.props
    return (
      <div className="Input">
        <TextField
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          variant={styling || 'outlined'}
          size={size || 'small'}
          fullWidth
          style={style}
          label={label || placeholder}
        />
      </div>
    ) 
  }
}

export default Input
