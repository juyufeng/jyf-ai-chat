import { FC } from 'react';
import { Skeleton } from "antd";

const SkeletonSection: FC = () => {
  return (
    <div style={{ padding: '16px', background: 'white' }}>
      <Skeleton 
        active 
        avatar={{ shape: 'circle', size: 40 }}
        paragraph={{
          rows: 7,
          width: ['100%', '80%', '60%', '40%']
        }}
        title={true}
      />
    </div>
  );
};

export default SkeletonSection;