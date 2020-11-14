import { Component } from 'react'

class Button extends Component {
  render() {
    const { onClick, text } = this.props
    return (
      <div className="Button">
        <button onClick={onClick}>
          {text}
        </button>
      </div>
    ) 
  }
}

export default Button
