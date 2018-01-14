import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';

import MassMediasToolbar from '../../../components/MassMediasToolbar';

import styles from './mass-medias.less';

class MassMedias extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get massMediasToolbarProps() {
    return {
      mode: this.props.massMedias.mode,
      initMedia: this.props.massMedias.selectedMedia,
      modalVisible: this.props.massMedias.modalVisible,
      loading: this.props.loading,
      onShowAddModal: this.props.onShowAddModal,
      onHideModal: this.props.onHideModal,
      onCreate: this.props.onCreate,
      onEdit: this.props.onEdit
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <MassMediasToolbar {...this.massMediasToolbarProps} />
      </div>
    )
  }
}

MassMedias.childContextTypes = {
  currentLanguage: PropTypes.string
}

const mapStateToProps = state => ({
  currentLanguage: state.app.currentLanguage,
  massMedias: state.massMedias,
  loading: state.loading.models.massMedias
});

const mapDispatchToProps = dispatch => ({
  onSelectedChange: keys => dispatch({ type: 'massMedias/onSelectedChange', selectedKeys: keys }),
  onShowAddModal: () => dispatch({ type: 'massMedias/showAddModal' }),
  onShowEditModal: (key) => {
    dispatch({ type: 'massMedias/getSelectedUser', payload: { key } })
    dispatch({ type: 'massMedias/showEditModal' })
  },
  onHideModal: () => dispatch({ type: 'massMedias/hideModal' }),
  onCreate: value => dispatch({
    type: 'massMedias/addMedia',
    payload: { user: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onDelete: key => dispatch({
    type: 'massMedias/delMedia',
    payload: { key },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onEdit: value => dispatch({
    type: 'massMedia/editMedia',
    payload: { user: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(MassMedias)
