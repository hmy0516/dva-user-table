import React from "react";
import UserModal from "./UserModal";
import { connect } from "dva";
import { Input, Table, Divider, Button, Popconfirm, Tag } from "antd";

const { Search } = Input;

class Users extends React.PureComponent {
  componentDidMount() {
    //   apis.testCnode().then((res)=>{
    //       console.log(res)
    //   })
    this.props.dispatch({
      type: "users/showAll",
      userList: [
        {
          key: 1,
          index: "1",
          name: "John Brown",
          sex: "女",
          job: "会计",
          birthday: "2019/11/21",
          hobby: ["羽毛球", "篮球"]
        },
        {
          key: 2,
          index: "2",
          name: "Jim Green",
          sex: "男",
          job: "老师",
          birthday: "2019/11/21",
          hobby: ["篮球", "乒乓球"]
        },
        {
          key: 3,
          index: "3",
          name: "Joe Black",
          sex: "女",
          job: "司机",
          birthday: "2019/11/21",
          hobby: ["羽毛球", "乒乓球"]
        }
      ]
    });
  }
  createHandler = ({ values }) => {
    this.props.dispatch({
      type: "users/create",
      payload: values
    });
  };
  editHandler = ({ key, values }) => {
    this.props.dispatch({
      type: "users/edit",
      payload: { key, values }
    });
  };
  deleteHandler = (key) => {
    console.log('deleteHandler',key);
    this.props.dispatch({
      type: "users/remove",
      payload: { key }
    });
  };
  searchHandler = value => {
    console.log("searchHandler", value);
    this.props.dispatch({
      type: "users/search",
      payload: value
    });
  };
  render() {
    console.log("zujian propds", this.props);
    const { userList } = this.props;
    const columns = [
      //   {
      //     title: "序号",
      //     dataIndex: "index",
      //     key: "index"
      //   },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex"
      },
      {
        title: "职业",
        dataIndex: "job",
        key: "job"
      },
      {
        title: "出生日期",
        dataIndex: "birthday",
        key: "birthday"
      },
      {
        title: "爱好",
        dataIndex: "hobby",
        key: "hobby",
        render: hobby => (
          <span>
            {hobby.map(hobby => {
              return <Tag key={hobby}>{hobby.toUpperCase()}</Tag>;
            })}
          </span>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <UserModal record={record} onOk={this.editHandler}>
              <Button className="btn-table-edit">编辑</Button>
            </UserModal>

            <Divider type="vertical" />
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={() => this.deleteHandler(record.key)}
            >
              <Button>删除</Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <div>
        <div style={{ margin: 40 }}>
          <UserModal record={{}} onOk={this.createHandler}>
            <Button type="primary" style={{ marginRight: 40 }}>
              增加
            </Button>
          </UserModal>
          <Search
            placeholder="input search text"
            onSearch={value => {
              this.searchHandler(value);
            }}
            style={{ width: 400 }}
            enterButton
          />
        </div>
        <Table
          columns={columns}
          dataSource={userList}
          rowKey={(record, index) => `complete${record.id}${index}`}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("mapStateToProps",state)
  return {
    userList: state.users.userList
  };
};
export default connect(mapStateToProps)(Users);
