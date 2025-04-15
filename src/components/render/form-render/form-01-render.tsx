import React, { CSSProperties } from 'react';
import AiChatLayout from '../render-layout/ai-chat-layout';
import { Form, Input, Select, InputNumber } from 'antd';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { getQueryParams } from "@/utils/common";

// 修改接口定义，添加 onCancel 属性
interface Form01RenderProps {
  avatar: string;
  onSendMessage?: (message: string, formData?: any) => void;
  onCancel?: () => void;  // 添加这行
}

// 定义样式对象
const styles: {[key: string]: CSSProperties} = {
  cancelButton: {
    backgroundColor: '#fff',
    color: 'rgb(26,176,110)',
    border: '1px solid rgb(26,176,110)',
    padding: '4px 8px',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  submitButton: {
    backgroundColor: 'rgb(26,176,110)',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  }
};

// 修改组件参数，添加 onCancel
const Form01Render: React.FC<Form01RenderProps> = ({ avatar, onSendMessage, onCancel }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();  // 调用父组件的 onCancel 方法
  };

  const generatePrompt = (values: any) => {
    const parts = [`会员的意向城市${values.hometown || ''} `];
    // 性别
    if (values.gender) {
      parts.push(`性别:${values.gender === 'male' ? '男' : '女'} `);
    }
    // 年龄
    if (values.age) {
      parts.push(`年龄:${values.age}岁 `);
    }
    // 学历
    if (values.education) {
      parts.push(`学历:${values.education} `);
    }
    // 户籍地
    if (values.birthplace) {
      parts.push(`户籍地:${values.birthplace} `);
    }
    // 出道年
    if (values.startYear) {
      parts.push(`${values.startYear}年开始从事蓝领工作 `);
    }
    // 特殊情况
    if (values.special) {
      parts.push(`特殊情况:${values.special} `);
    }
    // 其他
    if (values.other) {
      parts.push(`其他: ${values.other}`);
    }

    return parts.join('，') + '，请帮他推荐企业';
  };

  const handleSubmit = async (values: any) => {
    console.log('提交的表单数据:', JSON.stringify(values));
    // age 必须在 16~80之间 否则提示, 请填写正确年龄
    if (values.age && (values.age < 16 || values.age > 80)) {
      toast('请填写正确年龄');
      console.log('年龄错误');
      return;
    }

    // 出道年必须在 1960-今年之间 否则提示, 请填写正确出道年
    if (values.startYear && (values.startYear < 1960 || values.startYear > new Date().getFullYear())) {
      toast('请填写正确出道年');
      console.log('出道年错误');
      return;
    }

    // 如果不存在身份证号, 则性别、年龄、学历、户籍地、出道年、特殊情况中至少需填写一项
    if (!values.idCard) {
      const requiredFields = ['gender', 'age', 'education', 'birthplace', 'startYear', 'special'];
      if (!requiredFields.some(field => values.hasOwnProperty(field) && values[field])) {
        console.log("若不填写身份证号，则性别、年龄、学历、户籍地、出道年、特殊情况中至少需填写一项。");
        toast('若不填写身份证号，则性别、年龄、学历、户籍地、出道年、特殊情况中至少需填写一项。');
        return;
      }
      console.log('提交的表单数据4');
    }
    
    try {
      const params = {
        MbrMobile: values.phone,
        ResType: 21,
        LocCity: values.hometown,
        MemberName: values.name,
        ConversationIdList: []
      };
      // if (response?.Code === 0) {
      //   const prompt = generatePrompt(values);
      //   // 修改这里，传递表单数据
      //   onSendMessage?.(prompt, {
      //     phone: values.phone,
      //     hometown: values.hometown,
      //     name: values.name
      //   });
      // } else {
      //   toast(response?.Desc || '提交失败');
      // }
    } catch (error) {
      console.error('提交失败:', error);
      toast('提交失败');
    }
  };

  return (
    <AiChatLayout avatar={avatar}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="hometown" label="意向城市" rules={[{ required: true, message: '请输入意向城市' }]}>
              <Input placeholder="请输入意向城市" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <div style={{color:'rgb(88, 188, 88)', marginBottom:'16px', marginTop:'-10px', fontSize:'12px'}}>
            若不填写身份证号，则性别、年龄、学历、户籍地、出道年、特殊情况中至少需填写一项。
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="gender" label="性别">
              <Select placeholder="请选择性别">
                <Select.Option value="male">男</Select.Option>
                <Select.Option value="female">女</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="age" label="年龄">
              <InputNumber type='number' style={{ width: '100%' }} placeholder="请输入年龄" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="education" label="学历">
              <Input placeholder="请输入学历" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="birthplace" label="户籍地">
              <Input placeholder="请输入户籍地" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="startYear" label="出道年">
              <InputNumber style={{ width: '100%' }} placeholder="请输入出道年" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="special" label="特殊情况">
              <Input placeholder="请输入特殊情况" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={16}>
            <Form.Item
              name="idCard"
              label="身份证号"
              rules={[
                { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号' }
              ]}
            >
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          </Col>
        </Row>


        <Row>
          <Col span={24}>
            <Form.Item name="other" label="其他">
              <Input.TextArea rows={2} placeholder="请输入其他信息" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelButton}
            >
              取消
            </button>
            <button
              type="submit"
              style={styles.submitButton}
            >
              确认
            </button>
          </div>
        </Form.Item>
      </Form>
    </AiChatLayout>
  );
};

export default Form01Render;