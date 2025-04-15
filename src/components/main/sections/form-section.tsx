import { FC } from 'react';
import { observer } from "mobx-react-lite";
import { getAvatar } from "@/configs/index";
import { getQueryParams } from "@/utils/common";
import ReqStore from "@/stores/req-store";
import Form01Render from '@/components/render/form-render/form-01-render';
import ChatStore from "@/stores/chat-store";
import ViewStore from "@/stores/view-store";

interface FormSectionProps {
  onRequest: (message: string) => void;
}

const FormSection: FC<FormSectionProps> = ({ onRequest }) => {
  if (!ViewStore.showForm) {
    return null;
  }

  return (
    <Form01Render
      avatar={getAvatar}
      onCancel={() => ViewStore.setShowForm(false)}
      onSendMessage={(message, data) => {
        ViewStore.setFormData(data);
        ViewStore.setShowForm(false);
        ChatStore.setShowWelcome(false);
        ReqStore.setChatting(true);
        onRequest(message);
        ChatStore.setSenderContent("");
      }}
    />
  );
};

export default observer(FormSection);