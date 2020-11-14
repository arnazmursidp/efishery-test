import { Component } from 'react'

class Input extends Component {
  render() {
    const { placeholder, onChange, value, name } = this.props
    return (
      <div className="Input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    ) 
  }
}

export default Input
