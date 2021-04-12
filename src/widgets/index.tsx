import EmptyWidget from '../widgets/EmptyWidget';
import ListWidget from '../widgets/ListWidget';
import FormWidget from '../widgets/FormWidget';
export { EmptyWidget, ListWidget, FormWidget };

const widgetList: { [key: string]: JSX.Element } = {
  default: <EmptyWidget />,
  list: <ListWidget />,
  form: <FormWidget />,
};

export const renderWidget = (widget?: string) => {
  try {
    if (!widget) return widgetList.default;
    return widgetList[widget];
  } catch (error) {
    return widgetList.default;
  }
};
