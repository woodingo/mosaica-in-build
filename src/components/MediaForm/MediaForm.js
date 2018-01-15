import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const FormItem = Form.Item

const MediaForm = ({
  layout,
  initMedia,
  messages,
  form: {
    getFieldDecorator
  }
}) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 }
    }
  }

  return (
    <Form layout={layout}>
      <FormItem hasFeedback label={messages.name} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            }
          ],
          initialValue: initMedia ? initMedia.name : ''
        })(<Input />)}
      </FormItem>
      <FormItem hasFeedback label={messages.description} {...formItemLayout}>
        {getFieldDecorator('description', {
          rules: [
            {
              required: true,
              message: messages.fieldRequired
            }
          ],
          initialValue: initMedia ? initMedia.description : ''
        })(<Input.TextArea rows={3} />)}
      </FormItem>
    </Form>
  )
}

MediaForm.defaultProps = {
  layout: 'horizontal',
  initMedia: undefined,
  messages: {
    name: 'Name'
  }
}

MediaForm.propTypes = {
  layout: PropTypes.string,
  initMedia: PropTypes.object,
  messages: PropTypes.object
}

export default Form.create()(MediaForm)
