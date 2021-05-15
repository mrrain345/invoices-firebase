import React, { Component } from 'react'
import { Card, Form, Col, Row, InputGroup, Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Preset {
  name = ""
  address = ""
  nip = ""
}

interface IProps {
  seller?: boolean
}

interface IState {
  presetId: number
  presets: Preset[]
  name: string
  address: string
  nip: string
  removeModal: boolean
}

export default class SubjectForm extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    const presets: Preset[] = [
      { name: "Test 1", address: "Test address 1", nip: "4353564654656" },
      { name: "Test 2", address: "Test address 2", nip: "2345646546565" },
      { name: "Test 3", address: "Test address 3", nip: "5467432313365" },
      { name: "Test 4", address: "Test address 4", nip: "2345785465764" }
    ]

    const { name, address, nip } = new Preset()
    this.state = { presetId: 0, presets, name, address, nip, removeModal: false }
  }
  

  presetChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const presetId = parseInt(event.target.value ?? "0")

    if (presetId < 1 || presetId > this.state.presets.length) {
      return this.setState({ presetId: 0, name: "", address: "", nip: "" })
    }

    const { name, address, nip } = this.state.presets[presetId-1]
    this.setState({ presetId, name, address, nip })
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    this.setState({ [name]: value } as Pick<IState, keyof Preset>)
  }

  canSavedPreset = () => {
    const { name, address, nip } = this.state
    return name !== "" && address !== "" && nip !== ""
  }

  savePreset = () => {
    let presetId = this.state.presetId
    const { presets, name, address, nip } = this.state

    if (presetId === 0) {
      presetId = presets.push({ name, address, nip })
    } else if (presetId <= presets.length) {
      presets[presetId-1] = { name, address, nip }
    }

    this.setState({ presetId, presets })
  }

  removePreset = () => {
    let presetId = this.state.presetId
    const { presets } = this.state

    if (presetId < 1 || presetId > presets.length) return
    presets.splice(presetId-1, 1)

    const { name, address, nip } = new Preset()
    this.setState({ presetId: 0, presets, name, address, nip, removeModal: false })
  }

  removeModalShow = () => {
    this.setState({ removeModal: true })
  }

  removeModalClose = () => {
    this.setState({ removeModal: false })
  }

  render() {
    const { presetId, presets, name, address, nip, removeModal } = this.state
    const options = presets.map((preset, i) => <option key={i+1} value={i+1}>{preset.name.split('\n')[0]}</option>)

    return (
      <Card>
        <Card.Header>{this.props.seller ? "Sprzedawca" : "Nabywca"}</Card.Header>
        <Card.Body>

          <Form.Group as={Form.Label} className="row">
              <Col sm="4" md="3" xl="2" className="col-form-label">Preset</Col>
              <Col sm="8" md="9" xl="10">
                <InputGroup>
                  <Form.Control as="select" name="presetId" value={presetId} onChange={this.presetChanged}>
                    <option value={0}>(nowy)</option>
                    { options }
                  </Form.Control>
                  <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-save">{ presetId === 0 ? 'Dodaj' : 'Zapisz' }</Tooltip> }>
                    <Button variant="outline-success" onClick={this.savePreset} disabled={!this.canSavedPreset()}>
                      { presetId === 0 ? <AddIcon/> : <EditIcon/>}
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={ <Tooltip id="tooltip-delete">Usuń</Tooltip> }>
                    <Button variant="outline-danger" onClick={this.removeModalShow} disabled={presetId === 0}><DeleteIcon/></Button>
                  </OverlayTrigger>
                </InputGroup>
              </Col>
          </Form.Group>

          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="3" xl="2" className="col-form-label">Nazwa</Col>
            <Col sm="8" md="9" xl="10">
              <Form.Control as="textarea" rows={2} name="name" value={name} onChange={this.onChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="3" xl="2" className="col-form-label">Adres</Col>
            <Col sm="8" md="9" xl="10">
              <Form.Control as="textarea" rows={2} name="address" value={address} onChange={this.onChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="3" xl="2" className="col-form-label">NIP</Col>
            <Col sm="8" md="9" xl="10">
              <Form.Control name="nip" value={nip} onChange={this.onChange}/>
            </Col>
          </Form.Group>

          <Modal show={removeModal} onHide={this.removeModalClose}>
            <Modal.Header>
              <Modal.Title>Czy na pewno chcesz usunąć preset?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2 mb-sm-0">
                <Col sm="2">Nazwa:</Col>
                <Col sm="10" className="fw-bold">{name}</Col>
              </Row>
              <Row className="mb-2 mb-sm-0">
                <Col sm="2">Adres:</Col>
                <Col sm="10" className="fw-bold">{address}</Col>
              </Row>
              <Row>
                <Col sm="2">NIP:</Col>
                <Col sm="10" className="fw-bold">{nip}</Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.removeModalClose}>Anuluj</Button>
              <Button variant="danger" onClick={this.removePreset}>Usuń</Button>
            </Modal.Footer>
          </Modal>

        </Card.Body>
      </Card>
    )
  }
}
