import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      clientes: [],
      isLoaded: false
    }

  }

  
  componentDidMount(){
    fetch('https://epgk5i5g2h.execute-api.us-east-1.amazonaws.com/desarrollo/leertabla')
      .then( res => res.json())
      .then( res => {
          this.setState({
            clientes: res,
            isLoaded: true
          });
      })
      .catch( error => {
        console.log(error);
      }) 

  }


  render() {

    let clientes = this.state.clientes.map((cliente) => {
      return(
        <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>
                <Button color="success" size='sm' className="mr-2">Edit</Button>
                <Button color="danger" size='sm'>Delete</Button>
              </td>
            </tr>
      );
    });

    
    return (
      <div className="App">
        
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
            {clientes}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
