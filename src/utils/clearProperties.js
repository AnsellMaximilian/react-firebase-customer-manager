const clearProperties = (obj, properties) => {
  return Object.keys(obj)
    .filter((key) => {
      return !properties.includes(key);
    })
    .reduce((newObj, key) => {
      return { ...newObj, [key]: obj[key] };
    }, {});
};

export default clearProperties;
