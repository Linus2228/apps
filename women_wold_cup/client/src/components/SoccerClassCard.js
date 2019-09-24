import React from 'react'
import axios from 'axios'
import PlayerData from './PlayerData'

class SoccerClassCard extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/players').then(res => this.setState({ data: res.data }))
  }

  render() {
    return <div>{this.state.data && (<PlayerData data={this.state.data} />: null)}</div>
  }
}

export default SoccerClassCard
