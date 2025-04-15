import { FC } from 'react';
import { Form, Input, Upload, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Profile: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Form layout="vertical">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Upload showUploadList={false}>
                <Avatar size={80} icon={<UserOutlined />} />
              </Upload>
            </div>
            <Form.Item label="昵称" name="nickname">
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item label="豆包号" name="username">
              <Input disabled placeholder="juyufeng" />
            </Form.Item>
            <Button type="primary" block>保存修改</Button>
          </Form>
        </AppViewLayout>
      }
    />
  );
};

export default Profile;