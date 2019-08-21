import {cityList} from '../../game/cityList'
import {
  infectionRateToken,
  infectionRateNumber
} from '../../game/infectionRateToken'
import {outbreakToken} from '../../game/outbreakToken'
import React from 'react'

class PandemicMap extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.string)
    this.canvasRef = React.createRef()
    this.cityList = this.props.cityList ? this.props.cityList : cityList
    this.infectionRate = this.props.infectionRate ? this.props.infectionRate : 0
    this.outbreaks = this.props.outbreaks ? this.props.outbreaks : 0
    this.playerCardDeck = this.props.playerCardDeck
      ? this.props.playerCardDeck
      : []
    this.playerCardDiscard = this.props.playerCardDiscard
      ? this.props.playerCardDiscard
      : []
    this.infectionCardDeck = this.props.infectionCardDeck
      ? this.props.infectionCardDeck
      : []
    this.infectionCardDiscard = this.props.infectionCardDiscard
      ? this.props.infectionCardDiscard
      : []
    this.players = [
      {location: 'Atlanta'},
      {location: 'Hong Kong'},
      {location: 'Beijing'},
      {location: 'London'}
    ]
  }
  componentDidMount() {
    this.drawRect()
  }
  drawRect = () => {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')

    // eslint-disable-next-line max-statements
    Object.keys(this.cityList).forEach(cityKey => {
      const city = this.cityList[cityKey]

      // Font Size for Tokens
      ctx.font = '30px Courier New'

      // Outbreak Token
      this.outbreakFn(ctx)

      // Infection Rate Token
      this.infectionRateFn(ctx)

      // Cure Tokens
      this.blueCure(ctx, 'eradicated')
      this.yellowCure(ctx, 'no cure')
      this.blackCure(ctx, 'cured')
      this.redCure(ctx, 'no cure')

      // Font Size for Decks
      ctx.font = '25px Courier New'

      // Infection Deck
      this.infectionCardDeckFn(ctx)

      // Infection Discard
      this.infectionCardDiscardFn(ctx)

      // Player Deck
      this.playerCardDeckFn(ctx)

      // Player Discard
      this.playerCardDiscardFn(ctx)

      // Font Size for Everything else
      ctx.font = '10px Courier New'

      // City
      this.cityPlacement(ctx, city)

      // Research Center
      if (city.research) {
        this.researchCenterPlacement(ctx, city)
      }

      // Disease Cubes
      // blue
      if (city.blue) {
        this.bluePlacement(ctx, city)
        this.blueNum(ctx, city)
      }
      // yellow
      if (city.yellow) {
        this.yellowPlacement(ctx, city)
        this.yellowNum(ctx, city)
      }
      // black
      if (city.black) {
        this.blackPlacement(ctx, city)
        this.blackNum(ctx, city)
      }
      // red
      if (city.red) {
        this.redPlacement(ctx, city)
        this.redNum(ctx, city)
      }

      // Player Pawns Placement
      this.playerOne(ctx, this.players)
      this.playerTwo(ctx, this.players)
      this.playerThree(ctx, this.players)
      this.playerFour(ctx, this.players)
    })
  }

  // Methods
  // Outbreak Token Method
  outbreakFn = ctx => {
    let coords = outbreakToken[this.outbreaks]
    ctx.beginPath()
    ctx.fillStyle = 'lilac'
    ctx.arc(coords[0], coords[1], 15, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = 'white'
    ctx.stroke()
    ctx.fillText(this.outbreaks, coords[0] - 9, coords[1] + 9)
  }

  // Infection Rate Token Method
  infectionRateFn = ctx => {
    let infect = infectionRateToken[this.infectionRate]
    ctx.beginPath()
    ctx.fillStyle = 'violet'
    ctx.arc(infect[0], infect[1], 15, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.fillText(
      infectionRateNumber[this.infectionRate],
      infect[0] - 9,
      infect[1] + 9
    )
  }

  // Cure Token
  blueCure = (ctx, cureStr) => {
    if (cureStr !== 'no cure') {
      ctx.beginPath()
      ctx.fillStyle = 'blue'
      ctx.rect(320, 640, 30, 30)
      ctx.fill()
      if (cureStr === 'eradicated') {
        ctx.fillStyle = 'white'
        ctx.fillText('X', 326, 664)
      }
    }
  }

  yellowCure = (ctx, cureStr) => {
    if (cureStr !== 'no cure') {
      ctx.beginPath()
      ctx.fillStyle = 'yellow'
      ctx.rect(363, 640, 30, 30)
      ctx.fill()
      if (cureStr === 'eradicated') {
        ctx.fillStyle = 'black'
        ctx.fillText('X', 369, 664)
      }
    }
  }

  blackCure = (ctx, cureStr) => {
    if (cureStr !== 'no cure') {
      ctx.beginPath()
      ctx.fillStyle = 'black'
      ctx.rect(407, 640, 30, 30)
      ctx.fill()
      if (cureStr === 'eradicated') {
        ctx.fillStyle = 'white'
        ctx.fillText('X', 413, 664)
      }
    }
  }

  redCure = (ctx, cureStr) => {
    if (cureStr !== 'no cure') {
      ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.rect(450, 640, 30, 30)
      ctx.fill()
      if (cureStr === 'eradicated') {
        ctx.fillStyle = 'white'
        ctx.fillText('X', 456, 664)
      }
    }
  }

  // Infection Deck Placement Function
  infectionCardDeckFn = ctx => {
    if (this.infectionCardDeck.length) {
      ctx.beginPath()
      ctx.fillStyle = 'purple'
      ctx.rect(590, 30, 145, 110)
      ctx.fill()
      ctx.fillStyle = 'yellow'
      ctx.fillText('Infection', 595, 75)
      ctx.fillText('Deck', 630, 105)
      ctx.stroke()
    }
  }

  // Infection Discard Placement Function
  infectionCardDiscardFn = ctx => {
    if (this.infectionCardDiscard.length) {
      ctx.beginPath()
      ctx.fillStyle = 'purple'
      ctx.rect(750, 30, 145, 110)
      ctx.fill()
      ctx.fillStyle = 'yellow'
      ctx.fillText('Infection', 755, 75)
      ctx.fillText('Discard', 770, 105)
      ctx.stroke()
    }
  }

  // Player Deck Placement Method
  playerCardDeckFn = ctx => {
    if (this.playerCardDeck.length) {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      ctx.rect(592, 520, 105, 140)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.fillText('Player', 600, 570)
      ctx.fillText('Deck', 610, 610)
      ctx.stroke()
    }
  }

  // Player Discard Placement Method
  playerCardDiscardFn = ctx => {
    if (this.playerCardDiscard.length) {
      ctx.beginPath()
      ctx.fillStyle = 'teal'
      ctx.rect(726, 520, 105, 140)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.fillText('Player', 733, 570)
      ctx.fillText('Discard', 727, 610)
      ctx.stroke()
    }
  }

  // City Placement Method
  cityPlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.arc(city.coords[0], city.coords[1], 10, 0, 2 * Math.PI)
    ctx.fillStyle = city.color
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.fillText(city.name, city.coords[0] - 20, city.coords[1] + 20)
  }

  // Research Center Placement Method
  researchCenterPlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.arc(city.coords[0], city.coords[1], 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()
  }

  // Disease Cube Placement and Number Methods
  // Blue Cube
  bluePlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.rect(city.coords[0] - 20, city.coords[1] - 23, 10, 10)
    ctx.fillStyle = 'blue'
    ctx.fill()
  }
  blueNum = (ctx, city) => {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillText(city.blue, city.coords[0] - 18, city.coords[1] - 15)
  }

  // Yellow Cube
  yellowPlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.rect(city.coords[0] - 10, city.coords[1] - 23, 10, 10)
    ctx.fillStyle = 'yellow'
    ctx.fill()
  }
  yellowNum = (ctx, city) => {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillText(city.yellow, city.coords[0] - 8, city.coords[1] - 15)
  }

  // Black Cube
  blackPlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.rect(city.coords[0], city.coords[1] - 23, 10, 10)
    ctx.fillStyle = 'black'
    ctx.fill()
  }
  blackNum = (ctx, city) => {
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillText(city.black, city.coords[0] + 3, city.coords[1] - 15)
  }

  // Red Cube
  redPlacement = (ctx, city) => {
    ctx.beginPath()
    ctx.rect(city.coords[0] + 10, city.coords[1] - 23, 10, 10)
    ctx.fillStyle = 'red'
    ctx.fill()
  }
  redNum = (ctx, city) => {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.fillText(city.red, city.coords[0] + 13, city.coords[1] - 15)
  }

  // Player Pawn Placement Method
  playerOne = (ctx, location) => {
    let key = location[0].location
    let city = cityList[key]
    ctx.beginPath()
    ctx.arc(city.coords[0] - 6, city.coords[1] - 6, 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'lime'
    ctx.fill()
    ctx.stroke()
  }

  playerTwo = (ctx, location) => {
    let key = location[1].location
    let city = cityList[key]
    ctx.beginPath()
    ctx.arc(city.coords[0] + 6, city.coords[1] + 6, 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'pink'
    ctx.fill()
    ctx.stroke()
  }

  playerThree = (ctx, location) => {
    let key = location[2].location
    let city = cityList[key]
    ctx.beginPath()
    ctx.arc(city.coords[0] + 6, city.coords[1] - 6, 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'aqua'
    ctx.fill()
    ctx.stroke()
  }

  playerFour = (ctx, location) => {
    let key = location[3].location
    let city = cityList[key]
    ctx.beginPath()
    ctx.arc(city.coords[0] - 6, city.coords[1] + 6, 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'brown'
    ctx.fill()
    ctx.stroke()
  }

  render() {
    return (
      <React.Fragment>
        <canvas className="map" width="999" height="708" />
        <canvas
          ref={this.canvasRef}
          width="999"
          height="708"
          style={{border: '5px solid #d3d3d3', margin: '10'}}
        />
      </React.Fragment>
    )
  }
}

export default PandemicMap
