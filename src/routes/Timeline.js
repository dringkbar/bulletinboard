import React, { Component } from 'react';
import { Table, Divider, Form, Input, Modal, Button } from 'antd';

import './Timeline.css';

const { TextArea } = Input;

class Timeline extends Component {
    state = {
        isUpdate: false,
        visibleUpload: false,
        visibleData: false,
        key: 3,
        dataKey: 0,
        data: [
            {
                key: '1',
                name: '엑쫄짱',
                title: '안뇽',
                date: '2019-08-19',
                content: '희희'
            },
            {
                key: '2',
                name: '김가나',
                title: '하위',
                date: '2019-08-20',
                content: 'asdf',
            },
            {
                key: '3',
                name: '김리린',
                title: '우냥냥',
                date: '2019-08-21',
                content: 'qwer'
            },
        ],

    };
    // handleUpdate = (dataIndex, e) => {
    //     e.stopPropagation();
    //     const { data, isUpdate } = this.state;
    //     this.setState({
    //         isUpdate: true
    //     });
    //     this.props.form.setFieldsValue({
    //         nickname: data[dataIndex - 1].name,
    //         title: data[dataIndex - 1].title,
    //         content: data[dataIndex - 1].content,
    //     });
    //     this.showUploadModal();

    // }
    handleRemove = (dataIndex, e) => {
        e.stopPropagation();
        const { data } = this.state;
        const result = data.filter(item => item.key !== dataIndex);
        this.setState({
            data: result,
        })
    }
    handleUploadCancel = e => {
        console.log(e);
        this.setState({
            visibleUpload: false,
        });
    };

    handleDataCancel = e => {
        console.log(e);
        this.setState({
            visibleData: false,
        });
    };

    showUploadModal = () => {
        this.setState({
            visibleUpload: true,
        });
    };

    showDataModal = (key) => {
        this.setState({
            visibleData: true,
            dataKey: key,
        });
    }

    getCurrentDate = () => {
        let newDate = new Date()
        let nDate = newDate.getDate();
        let nMonth = newDate.getMonth() + 1;
        let nYear = newDate.getFullYear();

        return `${nYear}-${nMonth < 10 ? `0${nMonth}` : `${nMonth}`}-${nDate}`
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { data, isUpdate } = this.state;
        const { form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    visibleUpload: false,
                    visibleData: false,
                    data: data.concat({
                        key: ++this.state.key,
                        name: values.nickname,
                        title: values.title,
                        content: values.content,
                        date: this.getCurrentDate(),
                    }),
                })
                form.resetFields();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit,
            showDataModal,
            showUploadModal,
            handleUploadCancel,
            handleDataCancel } = this;
        const { visibleData, visibleUpload, data } = this.state;

        const columns = [
            {
                title: '#',
                dataIndex: 'key',
                width: '5%',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.key - b.key,
            },
            {
                title: 'Nickname',
                dataIndex: 'name',
                key: 'name',
                width: '10%',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                width: '55%',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                width: '15%',
            },
            {
                title: 'Action',
                key: 'action',
                width: '15%',
                render: (record) => (
                    <span>
                        {/* <a onClick={(e) => this.handleUpdate(record.key, e)}>Update</a> */}
                        {/* <Divider type="vertical" /> */}
                        <a onClick={(e) => this.handleRemove(record.key, e)}>Delete</a>
                    </span>
                ),
            },
        ];

        return (
            <div>
                <Button type="primary" onClick={showUploadModal}>
                    게시글 업로드
                </Button>
                <Modal
                    title="게시글 업로드"
                    visible={visibleUpload}
                    onCancel={handleUploadCancel}
                    footer={null}
                >
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '제목 넣어 바부야' }],
                            })(
                                <Input size="large" placeholder="제목을 입력해" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '닉네임 넣어 바부야' }],
                            })(
                                <Input size="large" placeholder="닉네임을 입력해" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: '닉네임 넣어 바부야' }],
                            })(
                                <TextArea rows={4} placeholder="내용을 입력해" />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="upload-button">업로드</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title={data.filter((datum) => {
                        return datum.key === this.state.dataKey;
                    }).map((datum) => {
                        return datum.title;
                    })}
                    visible={visibleData}
                    onCancel={handleDataCancel}
                    footer={null}
                >
                    {data.filter((datum) => {
                        return datum.key === this.state.dataKey;
                    }).map((datum) => {
                        return (
                            <div>
                                <div className="spread">
                                    <p>{datum.name}</p>
                                    <p>{datum.date}</p>
                                </div>
                                <p className="content">{datum.content}</p>
                            </div>
                        );
                    })}
                </Modal>
                <Table rowClassName="timeline-row" columns={columns} dataSource={data} onRow={(record) => {
                    return {
                        onClick: e => {
                            e.preventDefault();
                            showDataModal(record.key);
                        }
                    };
                }} />
            </div>
        );
    }
}

export default Form.create()(Timeline);