/* eslint-disable complexity */
import React from 'react'
import {Button, Dropdown, Form} from 'react-bootstrap'
import {connectedCities} from '../../game/connectedCities'
import {playerCards} from '../../game/playerCards'

class MainMoves extends React.Component {
  constructor() {
    super()
    this.state = {
      drive: 'Drive/ferry to',
      directFlight: 'Take direct flight to',
      charterFlightTo: 'Take charter flight to',
      shuttleFlightTo: 'Take shuttle flight to',
      giveKnowledgeCard: 'Card',
      giveKnowledgeCardTo: 'Player',
      discardCure: []
    }
  }

  handleOtherFlightSubmit = (cityGo, discard) => {
    this.props.handleOtherFlightSubmit(cityGo, discard)
    this.setState({
      drive: 'Drive/ferry to',
      directFlight: 'Take direct flight to',
      charterFlightTo: 'Take charter flight to',
      shuttleFlightTo: 'Take shuttle flight to',
      giveKnowledgeCard: 'Card',
      giveKnowledgeCardTo: 'Player',
      discardCure: []
    })
  }

  handleBasicTravel = city => {
    this.props.handleBasicTravel(city)
    this.setState({
      drive: 'Drive/ferry to',
      directFlight: 'Take direct flight to',
      charterFlightTo: 'Take charter flight to',
      shuttleFlightTo: 'Take shuttle flight to',
      giveKnowledgeCard: 'Card',
      giveKnowledgeCardTo: 'Player',
      discardCure: []
    })
  }

  handleDriveSubmit = () => {
    this.props.handleDriveSubmit(this.state.drive)
    this.setState({
      drive: 'Drive/ferry to',
      directFlight: 'Take direct flight to',
      charterFlightTo: 'Take charter flight to',
      shuttleFlightTo: 'Take shuttle flight to',
      giveKnowledgeCard: 'Card',
      giveKnowledgeCardTo: 'Player',
      discardCure: []
    })
  }

  handleResearchSubmit = () => {
    this.props.handleResearchSubmit()
  }

  handleTreatSubmit = color => {
    this.props.handleTreatSubmit(color)
  }

  handleKnowledgeSubmit = (give, take, card) => {
    this.props.handleKnowledgeSubmit(give, take, card)
  }

  handleCureSubmit = (cards, color) => {
    this.props.handleCureSubmit(cards, color)
  }

  handleCheckbox = e => {
    if (e.target.checked)
      this.setState({discardCure: [...this.state.discardCure, e.target.name]})
    console.log(this.state.discardCure)
  }

  handleGiveKnowledgeCardToSelect = (eventKey, event) => {
    this.setState({
      giveKnowledgeCardTo: eventKey
    })
  }
  handleGiveKnowledgeCardSelect = (eventKey, event) => {
    this.setState({
      giveKnowledgeCard: eventKey
    })
  }
  handleDriveSelect = (eventKey, event) => {
    this.setState({
      drive: eventKey
    })
  }
  handleDirectFlightSelect = (eventKey, event) => {
    this.setState({
      directFlight: eventKey
    })
  }
  handleCharterFlightTo = (eventKey, event) => {
    this.setState({
      charterFlightTo: eventKey
    })
    console.log(this.state.charterFlightTo)
  }
  handleShuttleFlightTo = (eventKey, event) => {
    this.setState({
      shuttleFlightTo: eventKey
    })
  }

  render() {
    //get current user and all cities (besides one current user is in)
    let currentUser = this.props.currentUser
    let allCities = Object.keys(connectedCities).filter(
      cityName => cityName !== currentUser.location
    )
    let currentCity = this.props.cities[currentUser.location]
    let allCityArray = Object.keys(this.props.cities)

    //see where you can drive/ferry
    let connectedCityDrive = connectedCities[this.props.currentUser.location]

    //see where you can take direct flight
    let connectedCityDirectFlight = currentUser.hand.filter(
      card => card.type === 'city' && card.title !== currentUser.location
    )

    //check if you can take charter
    let canTakeCharter = currentUser.hand.filter(
      card => card.title === currentUser.location
    ).length

    //getting list of all cities with research center
    let researchCities = []
    allCityArray.forEach(city => {
      if (this.props.cities[city].research)
        researchCities.push(this.props.cities[city])
    })

    //see if you can tke shuttle
    let canTakeShuttle = researchCities.length > 1 && currentCity.research

    //check if player can treat disease in cities
    const colors = ['red', 'blue', 'yellow', 'black']

    let canTreat =
      colors.map(color => currentCity[color]).reduce((a, b) => a + b) > 0

    //see if player can share knowledge
    const canShareKnowledge = this.props.cities[currentUser.location].length > 1

    //see if player can cure
    const currentPlayerColor = currentUser.hand.map(card => card.color)
    const currentPlayerColorObj = {}
    currentPlayerColor.forEach(
      color =>
        (currentPlayerColorObj[color] = currentPlayerColorObj[color] + 1 || 1)
    )
    const canCure = Object.keys(currentPlayerColorObj).filter(
      color => currentPlayerColorObj[color] >= 1
    ).length
    //which menu to show
    let menuReturn = ''
    switch (this.props.showMenu) {
      case 'default':
        menuReturn = (
          <div id="btn-menu">
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('moves')}
            >
              Move
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('research')}
              disabled={!canTakeCharter}
            >
              Research
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('treat')}
              disabled={!canTreat}
            >
              Treat
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('knowledge')}
              disabled={canShareKnowledge}
            >
              Knowledge
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('cure')}
              disabled={!canCure}
            >
              Cure
            </Button>
          </div>
        )
        break
      case 'moves':
        menuReturn = (
          <div id="btn-menu">
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('drive')}
            >
              Drive/Ferry
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('direct flight')}
            >
              Direct Flight
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('charter flight')}
              disabled={!canTakeCharter}
            >
              Charter Flight
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('shuttle flight')}
              disabled={!canTakeShuttle}
            >
              Shuttle Flight
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'drive':
        menuReturn = (
          <div id="btn-menu">
            You are in {currentUser.location}.<br />
            <Dropdown onSelect={this.handleDriveSelect}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {this.state.drive}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {connectedCityDrive.map(city => (
                  <Dropdown.Item key={city} eventKey={city}>
                    {city}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              disabled={this.state.drive === 'Take direct flight to'}
              onClick={() => this.handleBasicTravel(this.state.drive)}
            >
              Submit
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'direct flight':
        menuReturn = (
          <div id="btn-menu">
            <Dropdown onSelect={this.handleDirectFlightSelect}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {this.state.directFlight}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {connectedCityDirectFlight.map(card => (
                  <Dropdown.Item key={card.title} eventKey={card.title}>
                    {card.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() =>
                this.handleOtherFlightSubmit(
                  this.state.directFlight,
                  this.state.directFlight
                )
              }
            >
              Submit
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'charter flight':
        menuReturn = (
          <div id="btn-menu">
            {canTakeCharter ? (
              <div>
                Discard {currentUser.location} and
                <Dropdown onSelect={this.handleCharterFlightTo}>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    {this.state.charterFlightTo}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allCities.map(city => (
                      <Dropdown.Item key={city} eventKey={city}>
                        {city}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="outline-dark"
                  className="game-menu-btn"
                  onClick={() =>
                    this.handleOtherFlightSubmit(
                      this.state.charterFlightTo,
                      currentUser.location
                    )
                  }
                >
                  Submit
                </Button>
              </div>
            ) : (
              <p>You cannot take a charter flight</p>
            )}
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'shuttle flight':
        menuReturn = (
          <div id="btn-menu">
            {canTakeShuttle ? (
              <div>
                <Dropdown onSelect={this.handleShuttleFlightTo}>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    {this.state.shuttleFlightTo}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {researchCities
                      .filter(city => currentUser.location !== city.name)
                      .map(city => (
                        <Dropdown.Item key={city.name} eventKey={city.name}>
                          {city.name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="outline-dark"
                  className="game-menu-btn"
                  onClick={() =>
                    this.handleBasicTravel(this.state.shuttleFlightTo)
                  }
                >
                  Submit
                </Button>
              </div>
            ) : (
              <p>You cannot take a shuttle flight</p>
            )}
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'research':
        menuReturn = (
          <div id="btn-menu">
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.handleResearchSubmit}
              disabled={!canTakeCharter}
            >
              Build research center
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'treat':
        menuReturn = (
          <div id="btn-menu">
            {colors.map((color, index) => {
              if (currentCity[color]) {
                return (
                  <Button
                    key={index}
                    variant="outline-dark"
                    className="game-menu-btn"
                    onClick={() => this.handleTreatSubmit(color)}
                  >
                    Treat {color}
                  </Button>
                )
              }
            })}
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'give knowledge':
        menuReturn = (
          <div id="btn-menu">
            Give
            <Dropdown onSelect={this.handleGiveKnowledgeCardSelect}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {this.state.giveKnowledgeCard}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {currentUser.hand.map(card => {
                  if (card.title === currentUser.location) {
                    return (
                      <Dropdown.Item key={card.title} eventKey={card.title}>
                        {card.title}
                      </Dropdown.Item>
                    )
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
            TO
            <Dropdown onSelect={this.handleGiveKnowledgeCardToSelect}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {this.state.giveKnowledgeCardTo}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.props.otherUsers.map(user => {
                  if (user.location === currentUser.location) {
                    return (
                      <Dropdown.Item key={user.name} eventKey={user.name}>
                        {user.name}
                      </Dropdown.Item>
                    )
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => {
                this.handleKnowledgeSubmit(
                  currentUser.name,
                  this.state.giveKnowledgeCardTo,
                  this.state.giveKnowledgeCard
                )
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'take knowledge':
        menuReturn = (
          <div id="btn-menu">
            Take {currentUser.location} FROM
            <Dropdown onSelect={this.handleGiveKnowledgeCardToSelect}>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {this.state.giveKnowledgeCardTo}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.props.otherUsers.map(user => {
                  if (
                    user.location === currentUser.location &&
                    user.hand.filter(card => card.title === user.location)
                      .length === 1
                  ) {
                    return (
                      <Dropdown.Item key={user.name} eventKey={user.name}>
                        {user.name}
                      </Dropdown.Item>
                    )
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => {
                this.handleKnowledgeSubmit(
                  this.state.giveKnowledgeCardTo,
                  currentUser.name,
                  currentUser.location
                )
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'knowledge':
        menuReturn = (
          <div id="btn-menu">
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('give knowledge')}
            >
              Give Knowledge
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('take knowledge')}
            >
              Take Knowledge
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      case 'cure':
        menuReturn = (
          <div id="btn-menu">
            Discover Cure. Discard:
            <Form.Group
              controlId="formBasicChecbox"
              className="moves-cure-checks"
            >
              {currentUser.hand.map(card => (
                <Form.Check
                  type="checkbox"
                  label={card.title}
                  key={card.title}
                  name={card.title}
                  onChange={e => this.handleCheckbox(e)}
                />
              ))}
            </Form.Group>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => {
                const cards = this.state.discardCure.map(
                  name => playerCards.filter(card => card.title === name)[0]
                )
                this.handleCureSubmit(cards, cards[0].color)
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={this.props.resetMenu}
            >
              Back
            </Button>
          </div>
        )
        break
      default:
        menuReturn = (
          <div id="btn-menu">
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('moves')}
            >
              Move
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('research')}
            >
              Research
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('treat')}
            >
              Treat
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('knowledge')}
            >
              Knowledge
            </Button>
            <Button
              variant="outline-dark"
              className="game-menu-btn"
              onClick={() => this.props.showMenuToggle('cure')}
            >
              Cure
            </Button>
          </div>
        )
    }
    return menuReturn
  }
}

export default MainMoves
