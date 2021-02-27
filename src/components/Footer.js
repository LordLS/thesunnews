import React from 'react'
import {
    Header,
    List,
    Segment,
    Grid
  } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'



const Footer = () => {
  const style ={
    padding: '3em 0em',
    marginTop: "20%",
  }
    return (
      <Segment inverted vertical style={style}>
      <div style={{ margin: '1em'}}>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Columns' />
              <List link inverted>
                <List.Item as={NavLink} to='/Business'>Business</List.Item>
                <List.Item as={NavLink} to='/World'>World</List.Item>
                <List.Item as={NavLink} to='/Sport'>Sport</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                The Sun News
              </Header>
              <p>
                The whole world brought to you
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Segment>
    )

}

export default Footer