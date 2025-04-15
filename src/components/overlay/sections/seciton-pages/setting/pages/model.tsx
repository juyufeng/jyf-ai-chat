import { FC } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import ThreeColumnLayout from '@/components/overlay/sections/layout/three-column-layout';
import ViewStore from '@/stores/view-store';
import { useAppStyle } from "@/styles/app.styles";
import AppViewLayout from '@/components/overlay/sections/layout/app-view-layout';

const Model: FC = () => {
  const { overlayStyle } = useAppStyle();
  const overlay = overlayStyle({ isShowMenu: ViewStore.isMenuVisible() });

  return (
    <ThreeColumnLayout
      width={Number(overlay.width)}
      height={Number(overlay.height)}
      centerContent={
        <AppViewLayout>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <Statistic title="模型版本" value="1.0.0" />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic title="训练数据量" value={1000000} suffix="条" />
              </Card>
            </Col>
          </Row>
        </AppViewLayout>
      }
    />
  );
};

export default Model;