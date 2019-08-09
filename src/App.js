import React from 'react';
import './App.css';
import * as request from 'superagent'

class App extends React.Component {


  state = {
    //msg to send
    message: '',
    //msg sent
    messages: []
  }


  source = new EventSource('http://localhost:5000/stream')

  componentDidMount() {
    this.source.onmessage = (event) => {
      //  const newMessages = [
      //    ...this.state.messages,
      //    event.data
      //  ]
      //  console.log('event test', event)

      console.log('event.data', event.data)

      const messages = JSON.parse(event.data)
      this.setState({ messages: messages })
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    // console.log('this.state.messgae',this.state.message)

    const response = await request
      .post('http://localhost:5000/message')
      .send({ message: this.state.message })

    this.setState({ message: '' })

    console.log('response test', response)

  }

  onChange = (event) => {
    const { value } = event.target
    this.setState({ message: value })

  }

  render() {
    const messages = this.state.messages
      .map((message, index) => <p key={index}> {message.text} </p>)

    const form = <form onSubmit={this.onSubmit}>
      <input type='text'
        value={this.state.message}
        onChange={this.onChange} />
      <button type='submit'>send</button>
    </form>

    return <main>
      {form}
      {messages}</main>
  }
}

export default App;
