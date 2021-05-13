import React, { Component, createRef } from 'react'
import { Card, Form, Col, Row, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
  name: string
}

interface IState {
  preset: number
}

export default class SubjectForm extends Component<IProps, IState> {

  presetRef = createRef<HTMLSelectElement>()
  nameRef = createRef<HTMLTextAreaElement>()
  addressRef = createRef<HTMLTextAreaElement>()
  nipRef = createRef<HTMLInputElement>()

  constructor(props: IProps) {
    super(props)
  
    this.state = {
       preset: (props.name === 'Sprzedawca') ? 1 : 0
    }
  }
  

  presetChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      preset: parseInt(this.presetRef.current?.value ?? "0")
    })
  }

  render() {
    return (
      <Card>
        <Card.Header>{this.props.name}</Card.Header>
        <Card.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" md="3" xl="2">Preset</Form.Label>
            <Col sm="8" md="9" xl="10">
              <InputGroup>
                <Form.Control as="select" defaultValue={this.state.preset} onChange={this.presetChanged} ref={this.presetRef}>
                  <option value={0}>(nowy)</option>
                  <option value={1}>Opcja 1</option>
                  <option value={2}>Opcja 2</option>
                  <option value={3}>Opcja 3</option>
                </Form.Control>
                <OverlayTrigger placement="top" overlay={ <Tooltip id="tooltip-save">{ this.state.preset === 0 ? 'Dodaj' : 'Zapisz' }</Tooltip> }>
                  <Button variant="outline-success">{ this.state.preset === 0 ? <AddIcon/> : <EditIcon/>}</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={ <Tooltip id="tooltip-delete">Usuń</Tooltip> }>
                  <Button variant="outline-danger" disabled={this.state.preset === 0}><DeleteIcon/></Button>
                </OverlayTrigger>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" md="3" xl="2">Nazwa</Form.Label>
            <Col sm="8" md="9" xl="10">
              <Form.Control as="textarea" rows={2} ref={this.nameRef}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" md="3" xl="2">Adres</Form.Label>
            <Col sm="8" md="9" xl="10">
              <Form.Control as="textarea" rows={2} ref={this.addressRef}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4" md="3" xl="2">NIP</Form.Label>
            <Col sm="8" md="9" xl="10">
              <Form.Control ref={this.nipRef}/>
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
    )
  }
}
