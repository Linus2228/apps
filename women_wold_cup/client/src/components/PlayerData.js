import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card } from 'semantic-ui-react'

const PlayerData = ({ data }) => {
  return (
    <Card.Group>
      {data && data.map(player => {
        return (
          <Card key={player.id}>
            <Card.Content>
              <Card.Header>{player.name}</Card.Header>
              <Card.Meta>Searches: {player.searches}</Card.Meta>
              <Card.Description>{player.country}</Card.Description>
            </Card.Content>
          </Card>
        )
      })}
    </Card.Group>
  )
}

export default PlayerData
