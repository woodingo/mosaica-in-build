import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import MediaModal from '../MediaModal';

import styles from './MediaToolbar.less';

const MediaToolbar = ({
  mode,
  initMedia,
  modalVisible,
  onShowAddModal,
  onHideModal,
  onCreate,
  onEdit,
  form,
  loading,
  messages
}) => {
  const handleShowAddModal = () => {
    onShowAddModal()
  }

  const modelProps = {
    mode,
    initMedia,
    modalVisible,
    onCreate,
    onEdit,
    onHideModal,
    form,
    loading
  }
  return (
    <div className={styles.normal}>
      <Button
        className={styles.button}
        type="primary"
        icon="plus-circle-o"
        onClick={handleShowAddModal}
      >
        {messages.addButton}
      </Button>
      <MediaModal {...modelProps} />
    </div>
  )
}

MediaToolbar.propTypes = {
  messages: PropTypes.object
}

MediaToolbar.defaultProps = {
  messages: {
    addButton: 'Add User',
    ok: 'OK',
    cancel: 'Cancel'
  }
}

export default Form.create()(MediaToolbar)
