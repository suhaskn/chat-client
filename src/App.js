import React from 'react';
import './App.css';
import { allMessages } from './actions'
import { connect } from 'react-redux'
import MessageForm from './components/MessageForm'
import UserForm from './components/UserForm'

class App extends React.Component {


  state = {
    //msg to send
    message: ''
    //msg sent
 
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
      // this.setState({ messages: messages })
      this.props.allMessages(messages)
    }
  }

  render() {
    const messages = this.props.messages
      .map((message, index) => <p key={index}>{message.user} : {message.text} </p>)

    return <main>
      <MessageForm user={this.props.user}/>
      <UserForm user ={this.props.user} />
      {messages}</main>
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = {
  allMessages
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
