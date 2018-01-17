import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Icon, Progress } from 'antd'

import MediaForm from '../MediaForm';

const MediaModal = ({
  mode,
  modalVisible,
  initMedia,
  onCreate,
  onEdit,
  onLogoUpload,
  onHideModal,
  form,
  loading,
  uploadLogoProgress,
  messages
}) => {
  const switchMode = (m) => {
    const props = {}
    switch (m) {
    case 'add':
      props.title = messages.addTitle;
      props.action = onCreate;
      break
    case 'edit':
      props.title = messages.editTitle
      props.action = onEdit
      break
    default:
      props.title = ''
      props.action = () => {}
    }
    return props
  }

  const modalProps = switchMode(mode)

  const handleCancel = () => {
    onHideModal()
  }

  const handleOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        modalProps.action(values)
      }
    })
  }

  const modal = (
    <Modal
      title={modalProps.title}
      visible
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      okText={messages.ok}
      cancelText={messages.cancel}
    >
      <MediaForm form={form} initMedia={initMedia} />
      <input
        type="file"
        id="logo-upload"
        style={{ display: 'none' }}
        onChange={e => onLogoUpload(e.target.files[0])}
      />
      <label htmlFor="logo-upload">
        <Icon type="picture" />
      </label>
      <div>
        <Progress type="circle" percent={uploadLogoProgress ? +uploadLogoProgress.toFixed(0) : 0} />
      </div>
    </Modal>
  )

  return (
    <div>
      {modalVisible ? modal : null}
    </div>
  );
};

MediaModal.defaultProps = {
  mode: 'add',
  messages: {
    addTitle: 'Add Media',
    editTitle: 'Edit Media',
    ok: 'OK',
    cancel: 'Cancel'
  }
}

MediaModal.propTypes = {
  mode: PropTypes.string,
  modalVisible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  messages: PropTypes.object
};

export default MediaModal
