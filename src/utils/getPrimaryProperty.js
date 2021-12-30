/*
/   Function to return the value of specified property in an object;
/   If the property is not found the first found property is return.
/
/   @obj: Object.
/   Object whose primary property is going to be returned.
/
/   @primaryProperty: String.
/   Primary property name the value of which to return in the function
/
*/

export const getPrimaryProperty = (obj, primaryProperty) => {
  const primaryPropertyValue = obj[primaryProperty];
  if (primaryPropertyValue) return primaryPropertyValue;
  return obj[Object.keys(obj)[0]];
};
