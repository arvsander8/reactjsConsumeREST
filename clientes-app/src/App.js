import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      clients: [],
      newClientData:{
        id: 2,
        nombre: '',
        apellido: ''
      },
      editClientData: {
        id: '',
        nombre: '',
        apellido: ''
      },
      deleteClientData: {
        id: ''
      },
      newClientModal: false,
      editClientModal: false
    }

  }


  toggleNewClientModal() {
    this.setState({
      newClientModal: ! this.state.newClientModal
    });
  }

  toggleEditClientModal() {
    this.setState({
      editClientModal: ! this.state.editClientModal
    });
  }

  updateClient() {
    //let { nombre, apellido } = this.state.editClientData;

    axios.put('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla', this.state.editClientData)
    .then((response) => {
      

      this.setState({
        editClientModal: false, editClientData: { id: '', nombre: '', apellido: '' }
      });
      this._refreshClients();
    });
  }

  editClient(id, nombre, apellido) {
    this.setState({
      editClientData: { id, nombre, apellido }, editClientModal: ! this.state.editClientModal
    });
  }


  deleteClient(id) {

    axios.delete('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla' , {data:{"id": id}}).then((response) => {
      this._refreshClients();
    });
  }

  addClient() {
    axios.post('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla', this.state.newClientData)
      .then((response) => {
        let { clients } = this.state;

        clients.push(response.data);

      this.setState({ clients, newClientModal: false, newClientData: {
        id: 2,
        nombre: '',
        apellido: ''
      }});
      this._refreshClients();
    });
  }
  
  componentWillMount(){
    this._refreshClients();
  }

  _refreshClients(){
          /*fetch('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla')
      .then( res => res.json())
      .then( res => {
          this.setState({
            clientes: res,
            isLoaded: true
          });
      })
      .catch( error => {
        console.log(error);
      }) */

      axios.get('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla')
        .then((response) => {
          this.setState({
            clients: response.data
          })
        });
  }

  render() {

    let clients = this.state.clients.map((client) => {
      return(
        <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nombre}</td>
              <td>{client.apellido}</td>
              <td>
                <Button color="success" size='sm' className="mr-2" onClick={this.editClient.bind(this, client.id, client.nombre, client.apellido)}>Edit</Button>
                <Button color="danger" size='sm' onClick={this.deleteClient.bind(this, client.id)}>Delete</Button>
              </td>
            </tr>
      );
    });

    
    return (
      <div className="App container">
        <h1>Ejemplo de Clientes</h1>
        
        <Button className="my-3" color="primary" onClick={this.toggleNewClientModal.bind(this)}>Nuevo Cliente</Button>


        <Modal isOpen={this.state.newClientModal} toggle={this.toggleNewClientModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewClientModal.bind(this)}>Agregar Cliente</ModalHeader>
          <ModalBody>
          <FormGroup>
              <Label for="ide">Id</Label>
              <Input id="ide" value={this.state.newClientData.id} onChange={(e) => {
                let { newClientData } = this.state;

                newClientData.id = e.target.value;

                this.setState({ newClientData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="nombre">Nombres</Label>
              <Input id="nombre" value={this.state.newClientData.nombre} onChange={(e) => {
                let { newClientData } = this.state;

                newClientData.nombre = e.target.value;

                this.setState({ newClientData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellidos</Label>
              <Input id="apellido" value={this.state.newClientData.apellido} onChange={(e) => {
                let { newClientData } = this.state;

                newClientData.apellido = e.target.value;

                this.setState({ newClientData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addClient.bind(this)}>Agregar Cliente</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewClientModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.editClientModal} toggle={this.toggleEditClientModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditClientModal.bind(this)}>Editar un Cliente</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="nombre">Nombres</Label>
            <Input id="nombre" value={this.state.editClientData.nombre} onChange={(e) => {
              let { editClientData } = this.state;

              editClientData.nombre = e.target.value;

              this.setState({ editClientData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="apellido">Apellidos</Label>
            <Input id="apellido" value={this.state.editClientData.apellido} onChange={(e) => {
              let { editClientData } = this.state;

              editClientData.apellido = e.target.value;

              this.setState({ editClientData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateClient.bind(this)}>Atualizar Cliente</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditClientModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>



        <Table>
          <thead>
            <tr>
              <th> # --> </th>
              <th> Nombres </th>
              <th> Apellidos </th>
              <th> Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
