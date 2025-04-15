import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import menuStore from '@/stores/view-store';
import { useTranslation } from 'react-i18next';

interface EditTitleModalProps {
  visible: boolean;
  onCancel: () => void;
  chatId: string;
  initialTitle: string;
}

const EditTitleModal: React.FC<EditTitleModalProps> = ({ 
  visible, 
  onCancel, 
  chatId, 
  initialTitle 
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialTitle);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await menuStore.updateChatTitle(chatId, title);
      onCancel();
    } catch (error) {
      console.error(t('editModal.updateFailed'), error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSave();
    }
  };

  return (
    <Modal
      title={t('editModal.title')}
      open={visible}
      onCancel={onCancel}
      width={300}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('editModal.cancel')}
        </Button>,
        <Button 
          key="save" 
          type="primary" 
          loading={loading}
          onClick={handleSave}
        >
          {t('editModal.save')}
        </Button>,
      ]}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('editModal.placeholder')}
      />
    </Modal>
  );
};

export default EditTitleModal;