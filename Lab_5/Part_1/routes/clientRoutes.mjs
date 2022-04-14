import ClientsController from '../controllers/ClientsController.mjs'

const clientsController = new ClientsController();

export default (app) => {
  //get all clients
  app.get('/api/clients', clientsController.all)
  //get one client by id
  app.get('/api/clients/:id', clientsController.details)
  //add a client
  app.post('/api/clients', clientsController.create_client)
  //edit the id client
  app.put('/api/clients/:id', clientsController.edit)
  //delete the id client
  app.delete('/api/clients/:id', clientsController.delete)
}
