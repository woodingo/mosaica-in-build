import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

import MassMediasToolbar from '../../../components/MassMediasToolbar'

import styles from './mass-medias.less'

class MassMedias extends React.Component {
  getChildContext() {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <MassMediasToolbar />
      </div>
    )
  }
}

MassMedias.childContextTypes = {
  currentLanguage: PropTypes.string
}

const mapStateToProps = state => ({
  currentLanguage: state.app.currentLanguage
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MassMedias)
