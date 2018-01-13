import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

import styles from './mass-medias-toolbar.less'

const MassMediasToolbar = ({
  messages
}) => {
  return (
    <div>
      <Button
        className={styles.button}
        type="primary"
        icon="plus-circle-o"
      >
        {messages.addButton}
      </Button>
    </div>
  )
}

MassMediasToolbar.propTypes = {
  messages: PropTypes.object
}

MassMediasToolbar.defaultProps = {
  messages: {
    addButton: 'Add User',
    ok: 'OK',
    cancel: 'Cancel'
  }
}

export default Form.create()(MassMediasToolbar)
