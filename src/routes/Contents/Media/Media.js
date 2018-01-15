import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';

import MediaToolbar from '../../../components/MediaToolbar';
import MediaList from '../../../components/MediaList';

import styles from './Media.less';

class Media extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  get mediaToolbarProps() {
    return {
      mode: this.props.media.mode,
      initMedia: this.props.media.selectedMedia,
      modalVisible: this.props.media.modalVisible,
      loading: this.props.loading,
      onShowAddModal: this.props.onShowAddModal,
      onHideModal: this.props.onHideModal,
      onCreate: this.props.onCreate,
      onEdit: this.props.onEdit
    }
  }

  get mediaListProps() {
    return {
      data: this.props.media.list,
      actionFunc: {
        delete: this.props.onDelete,
        edit: this.props.onShowEditModal
      },
      actionMenu: [
        {
          key: 'delete',
          name: 'delete'
        },
        {
          key: 'edit',
          name: 'edit'
        }
      ]
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <MediaToolbar {...this.mediaToolbarProps} />
        <MediaList {...this.mediaListProps} />
      </div>
    )
  }
}

Media.childContextTypes = {
  currentLanguage: PropTypes.string
}

const mapStateToProps = state => ({
  currentLanguage: state.app.currentLanguage,
  media: state.media,
  loading: state.loading.models.media
});

const mapDispatchToProps = dispatch => ({
  onSelectedChange: keys => dispatch({ type: 'media/onSelectedChange', selectedKeys: keys }),
  onShowAddModal: () => dispatch({ type: 'media/showAddModal' }),
  onShowEditModal: (key) => {
    dispatch({ type: 'media/getSelectedMedia', payload: { key } })
    dispatch({ type: 'media/showEditModal' })
  },
  onHideModal: () => dispatch({ type: 'media/hideModal' }),
  onCreate: value => dispatch({
    type: 'media/addMedia',
    payload: { media: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onDelete: key => dispatch({
    type: 'media/delMedia',
    payload: { key },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  }),
  onEdit: value => dispatch({
    type: 'media/editMedia',
    payload: { media: value },
    onSuccess: msg => message.success(msg),
    onError: msg => message.error(msg)
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Media)
