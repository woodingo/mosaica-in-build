import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'


const MediaModal = ({
  mode,
  modalVisible,
  onCreate,
  onEdit,
  onHideModal,
  form,
  loading,
  messages
}) => {
  const switchMode = (m) => {
    const props = {}
    switch (m) {
    case 'add':
      props.title = messages.addTitle
      props.action = onCreate
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
      <div></div>
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
