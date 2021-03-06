const process = require('process');
const config  = require('config');

//On server internal error.
const onServerError = ()=>{

  console.log('SERVER ERROR');

}

//On server start.
const onListen = (port)=>{

  console.log('ᕦ(ò_óˇ)ᕤ - Mock server');
  console.log(`Running on port: ${port}`);
  console.log(`MOCK file: ${config.get('mocks.models')} / ROUTE file: ${config.get('mocks.routes')}`);
  
}

//When the process receive kill signal.
const onProcessKill = server =>{
  
  console.log('Finishing server'); 
  server.close(()=>process.exit(0));

}

//When in the server happen a uncaugth exception.
const onException = err =>{

  console.log({ message: 'Uncaugth exception', err});

}

module.exports = {
  onListen,
  onProcessKill,
  onServerError,
  onException
};
