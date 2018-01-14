import { Card } from 'antd';
import React from 'react';

import styles from './MediaCard.less'

const MediaCard = ({ item, actions }) => {
  return (
    <Card title={item.name} extra={actions} className={styles.normal}>
      {item.description}
    </Card>
  )
};

export default MediaCard;
