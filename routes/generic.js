//Load base mocks.
const mocks = require('../mocks/base.json');

const {
  isEquivalent
} = require('../lib/equivalent.js');

const {
  parse
} = require('../lib/models.js');

//RANDOMIZED response.
const random = (res,models,modelKey,http) =>{

  //If the model is incorrect.
  const modelVal = models[modelKey];

  if (!modelVal)
    res.status(500).json({detaile:"Model response not found"});
  else{

    const randomSelection = modelVal[Math.floor(Math.random()*modelVal.length)];
    res.status(http||200).json(randomSelection);

  }    

}

//MATCH response.
const match = (req,res,models,params) =>{

  const {
    body
  } = req;
  
  //Find the match param with the response.
  const selected = params.find(e => isEquivalent(e.matchWith,body));
  
  if (!selected)
    return res.status(200).json({match:false,detail:"No match response"});

  const {
    matchWith,
    response
  } = selected;

  const {
    http,
    model
  } = response;

  //Parse model notations.
  const parsedModel = parse(model);

  //Find if the model is correct.
  const modelToUse = models[parsedModel.key];

  if (!modelToUse)
    return res.status(500).json({detail:"Response model not found"});

  //If there are elements.
  if ((!modelToUse.length)||(modelToUse.length==0))
    return res.status(500).json({detail:"Response model - empty"});

  //Return the mock response.
  return res.status(http||200).json(models[parsedModel.key][parsedModel.ix||0]);

}

//Direct response.
const direct = (res,models,model,http)=>{

  //If the model is incorrect.
  const parsed   = parse(model);
  const modelVal = models[parsed.key];

  if (!modelVal)
    res.status(500).json({detaile:"Model response not found"});
  else
    res.status(http||200).json(modelVal[parsed.ix]);

}

//Generate a generic controller for each route key.
const routeController = (routeParam,models) => (req,res)=>{

  //If the response is defined.
  if (routeParam.response){

    const {
      model,
      isRandom,
      isMatch,
      options,
      http
    } = routeParam.response;
    
    //* RANDOM response - return randomized model responses.
    if (isRandom&&model)
      random(res,models,model,http);

    //* MATCH response - match response with a custom model response.
    if (isMatch)
      match(req,res,models,options);

    //* Direct response - return a response matching path with model.
    if ((!isMatch)&&(!isRandom))
      direct(res,models,model,http);

    console.log('> ROUTE requested:',routeParam);

  }
  else
    res.status(500).json({detail:"Bad route key structure"});

};

//Generate routes using the base json.
const bindRoutes = (router)=>{

  mocks.routes.forEach((route)=>{

    if (route.type=='GET')
      router.get(route.path,routeController(route,mocks.models));

    if (route.type=='POST')
      router.post(route.path,routeController(route,mocks.models));

    if (route.type=='PUT')
      router.put(route.path,routeController(route,mocks.models));    

    if (route.type=='DELETE')
      router.delete(route.path,routeController(route,mocks.models));    

    if (route.type=='PATCH')
      router.patch(route.path,routeController(route,mocks.models));
    
  });

}

module.exports = {
  bindRoutes
};