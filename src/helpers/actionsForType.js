export const actionsTypeObject = {
  add: "add",
  remove: "remove",
  clear: "clear",
};

export const actionsForTypeWithObjKey = (props) => {
  const isDispatch = props?.dispatch ? true : false;

  switch (props.typeAction) {
    case actionsTypeObject.add:
      props.prevData[props.key] = props.data;
      isDispatch
        ? props.dispatch(props.setAction(props.prevData))
        : props.setAction(props.prevData);
      return props.prevData;
    case actionsTypeObject.remove:
      delete props.prevData[props.key];
      isDispatch
        ? props.dispatch(props.setAction(props.prevData))
        : props.setAction(props.prevData);
      return props.prevData;
    case actionsTypeObject.clear:
      isDispatch ? props.dispatch(props.setAction({})) : props.setAction({});
      return {};
    default:
      return;
  }
};
