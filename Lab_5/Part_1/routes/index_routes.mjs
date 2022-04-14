//first route
export default (app) => {
  app.get('/', (req, res) => {
    res.send({"welcome":""})
  })
}
