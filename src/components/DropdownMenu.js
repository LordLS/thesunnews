import React from 'react'
import { NavLink } from 'react-router-dom'
import {Dropdown} from 'semantic-ui-react'



const DropdownWriter = () => {
    return (
    <>
    <Dropdown.Item as={NavLink} to='/createpublication'>Create a Publication</Dropdown.Item>
    <Dropdown.Item as={NavLink} to='/mypublication'>My Publication</Dropdown.Item>
    </>)
}

const DropdownModerator = () => {
    return (
    <>
    <Dropdown.Item as={NavLink} to='/pendingPublication/'>Review Publication</Dropdown.Item>
    </>
    )

}

const DropdownCoordinator = () => {
    return (
    <>
    <Dropdown.Item as={NavLink} to='/createColumn/'>Create a Column</Dropdown.Item>
    <Dropdown.Item as={NavLink} to='/myColumn/'>My Columns</Dropdown.Item>
    </>
    )
}


export const ProfileMenu = {
    writer: <DropdownWriter />,
    coordinator: <DropdownCoordinator />,
    moderator: <DropdownModerator />,
}