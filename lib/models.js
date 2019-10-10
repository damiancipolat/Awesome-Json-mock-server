const parse = (strModel) => {

  const parts = strModel.split(':');

  if (parts.length>1){

    return {
      key: parts[0],
      ix: parts[1]
    };

  } else {

    return {
      key: strModel,
      ix: 0
    };

  }

}

module.exports = {
  parse
};