import React from 'react'
import { Message } from 'semantic-ui-react'

const Mess = ({message, info, positive, warning, negative}) => {
    <Message info positive warning negative>{message}</Message>
}
export default Mess;