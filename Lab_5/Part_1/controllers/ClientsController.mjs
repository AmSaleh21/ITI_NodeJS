import client from '../models/client.mjs';
 

class ClientsController {

  //get all clients
  all = (req, res, next) => {
    const limit = parseInt(req.query.limit) || '';
    client.find({}).limit(limit)
      .then(clients => res.status(200).send(clients))
      .catch(next);
  }
  //get one based on it's id
  details = (req, res, next) => {
    const clientId = req.params.id;
    client.findById({ _id: clientId })
      .then(client => res.status(200).send(client))
      .catch(next);
  }
  //post: insert new client in the db
  create_client = (req, res, next) => {
    const clientProps = req.body;
    client.create(clientProps)
      .then(client => res.status(201).send(client))
      .catch(next);
  }
  //put: edit based on id
  edit = (req, res, next) => {
    const clientId = req.params.id;
    const clientProps = req.body;
    
    client.findByIdAndUpdate({ _id: clientId }, clientProps)
      .then(() => client.findById({ _id: clientId }))
      .then(client => res.status(200).send(client))
      .catch(next);
  }
  //delete: delete based on id
  delete = (req, res, next) => {
    const clientId = req.params.id;
    client.findByIdAndRemove({ _id: clientId })
      .then(client => res.status(204).send(client))
      .catch(next);
  }

}

//imported in routes/clientRoutes
export default ClientsController;