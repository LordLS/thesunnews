import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {history} from '../helpers/history'

const DeleteModal = ({func}) => {
  const [open, setOpen] = React.useState(false)

  function handleButtonDelete() {
      func()
      setOpen(false)
      history.push('/')
      window.location.reload(false)
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button color='red'>Delete</Button>}>
        
      <Header icon>
        <Icon name='archive' />
        Confirm you want to DELETE this post
      </Header>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='red' inverted onClick={handleButtonDelete}>
          <Icon name='checkmark' /> DELETE
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteModal