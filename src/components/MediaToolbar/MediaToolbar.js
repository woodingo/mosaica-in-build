import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import MediaModal from '../MediaModal';

import styles from './MediaToolbar.less';

const MediaToolbar = ({
  mode,
  logoUrl,
  initMedia,
  modalVisible,
  onShowAddModal,
  onHideModal,
  onCreate,
  onEdit,
  onLogoUpload,
  form,
  loading,
  uploadLogoProgress,
  messages
}) => {
  const handleShowAddModal = () => {
    onShowAddModal()
  }

  const modelProps = {
    mode,
    logoUrl,
    initMedia,
    modalVisible,
    onCreate,
    onEdit,
    onLogoUpload,
    onHideModal,
    form,
    loading,
    uploadLogoProgress
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

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      url: Form.createFormField({
        value: props.logoUrl
      }),
      name: Form.createFormField({
        ...props.currentMedia.name
      }),
      description: Form.createFormField({
        ...props.currentMedia.description
      })
    };
  }
})(MediaToolbar)
