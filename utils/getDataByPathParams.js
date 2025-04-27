export const getDataByPathParams = (data, locationType, locationName) =>
  data.filter(
    (destination) =>
      destination[locationType].toLowerCase() === locationName.toLowerCase()
  )
