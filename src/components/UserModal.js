import React, { Component } from "react";
import moment from "moment";
import {
  Modal,
  Input,
  Form,
  Select,
  Radio,
  Checkbox,
  Row,
  Col,
  DatePicker
} from "antd";

const FormItem = Form.Item;
const { Option } = Select;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModalHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModalHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: false
    });
  };

  okHandler = e => {
    console.log("e", e);

    if (e) e.stopPropagation();
    const {
      onOk,
      record: { key }
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
        const { sex, birthday } = values;
        values.sex=sex==="man"?"男":"女";
        values.birthday=moment(birthday).format("YYYY/MM/DD")
        onOk({ key, values });
        this.hideModalHandler();
      }
    });
  };

  render() {
    console.log("Modal", this.props);
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, sex, job, birthday, hobby } = this.props.record;
    console.log("hobby", hobby);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <span onClick={this.showModalHandler}>
        {children}
        <Modal
          title="编辑用户"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form {...formItemLayout} onSubmit={this.okHandler}>
            <FormItem label="姓名">
              {getFieldDecorator("name", {
                initialValue: name
              })(<Input />)}
            </FormItem>

            <FormItem label="性别">
              {getFieldDecorator("sex", {
                initialValue: sex === "女" ? "woman" : "man"
              })(
                <Radio.Group>
                  <Radio value="man">男</Radio>
                  <Radio value="woman">女</Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label="职业" hasFeedback>
              {getFieldDecorator("job", {
                initialValue: job
              })(
                <Select placeholder="Please select a job">
                  <Option value="会计">会计</Option>
                  <Option value="老师">老师</Option>
                  <Option value="司机">司机</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="出生日期">
              {getFieldDecorator("birthday", {
                initialValue: moment(birthday, "YYYY/MM/DD")
              })(<DatePicker />)}
            </FormItem>

            <FormItem label="爱好">
              {getFieldDecorator("hobby",{
                  initialValue: hobby,
              })(
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="羽毛球">羽毛球</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="篮球">篮球</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="乒乓球">乒乓球</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
