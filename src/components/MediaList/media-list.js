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
  const cardActions = record => (
    actionMenu.map(action => (
      <a key={action.key} onClick={() => actionFunc[action.key](record.key)}>
        {action.key}
      </a>
    ))
  )

  return (
    <div>
      {data.map(record => (
        <Card title={record.name} extra={cardActions(record)} key={record.key}>
          Some content goes here...
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
