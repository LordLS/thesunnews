import React from 'react'
import {Icon, Item, Divider} from 'semantic-ui-react'
import {parseIsoTimetoString} from '../helpers/timeConverter'
import { NavLink } from 'react-router-dom'

const ListPub = ({publications}) => {
    return(
      <Item.Group>
        {publications && (publications.map(pub => (
          <div key={pub.id}>
          <Item.Image size='small' src={pub.thumbnail} />
          <Item.Content>
          <NavLink to={`/${pub.section}/${pub.id}`}><Item.Header as='h1'>{pub.title}</Item.Header></NavLink>
            <Item.Extra><Icon name='time'/> : {parseIsoTimetoString(pub.date_time_posted)} | {pub.section}</Item.Extra>
          </Item.Content>
          <Divider />
          </div>
        )))}
      </Item.Group>
    )
}

export default ListPub