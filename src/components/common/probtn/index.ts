import i18next from 'i18next';

export const getPromptItems = () => [
  i18next.t('prompts.items.memberNeeds'),
];

export const promptStyles = {
  title: {
    textAlign: "left",
    color: "#999",
    fontSize: "14px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  item: {
    width: "97px",
    height: "34px",
    paddingTop: "5px",
    paddingBottom: "6px",
    fontSize: '14px',
    border: "1px solid rgb(24, 177, 111)",
    backgroundColor: "white",
    userSelect: 'none'
  },
  itemLabel: {
    fontSize: "14px",
    color: "rgb(24, 177, 111)",
  },
};
