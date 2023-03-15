export const findValueKeyInNestedArr = (
  array,
  objKey,
  comparedValue,
  getValueKey,
  keySubArray,
) => {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][objKey] === comparedValue) {
        return array[i][getValueKey];
      } 
        const childrenByKey = findValueKeyInNestedArr(
          array[i][keySubArray],
          objKey,
          comparedValue,
          getValueKey,
          keySubArray,
        );
        if (childrenByKey) return childrenByKey;
      
    }
  }
  return null;
};
