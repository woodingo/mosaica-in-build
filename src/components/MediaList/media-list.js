import React from 'react'
import PropTypes from 'prop-types'
import { Card, Menu, Icon, Dropdown } from 'antd'

const MediaList = ({
  actionFunc,
  actionMenu,
  data,
  loading,
  messages
}) => {
  const onClick = ({ item, key }) => actionFunc[key](item.props.recordKey)

  const getMenus = record => (
    <Menu onClick={onClick}>
      {actionMenu.map(menu => (
        <Menu.Item key={menu.key} recordKey={record.key}>
          <span>{messages[menu.name] || menu.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  const actionDropdown = record => (
    <Dropdown overlay={getMenus(record)} >
      <a className="ant-dropdown-link">
        <Icon type="down" style={{ fontSize: 16 }} />
      </a>
    </Dropdown>
  )

  return (
    <div>
      {data.map(record => (
        <Card key={record.key}>
          {record.name}
          {actionDropdown(record)}
        </Card>
      ))}
    </div>
  )
}

MediaList.defaultProps = {
  loading: true,
  messages: {
    delete: 'Delete',
    addButton: 'Add Media',
    delButton: 'Delete Media'
  }
}

MediaList.propTypes = {
  actionFunc: PropTypes.object.isRequired,
  actionMenu: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  messages: PropTypes.object
}

export default MediaList
