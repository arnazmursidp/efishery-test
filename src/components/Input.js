import { Component } from 'react'

class Input extends Component {
  render() {
    const { placeholder, onChange, value } = this.props
    return (
      <div className="Input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    ) 
  }
}

export default Input
