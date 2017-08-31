import React from 'react'
import './App.css'
var _ = require('lodash');

class Earth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lifeStatus : this.generateContinentState(this.props.numberOfContinents)
    }
  }
  componentWillMount() {
    var gridSize = this.props.numberOfContinents
    this.setState({lifeStatus: this.generateContinentState(gridSize)})
  }
  generateContinentState(inGridSize) {
      var twoDimensionalArray = []
      var oneDimensionalArray = []
      for (var i = 0; i < (inGridSize * inGridSize); i++) {
        var generatedRandomNumber = Math.round(Math.random())
        oneDimensionalArray.push(generatedRandomNumber)
          if(oneDimensionalArray.length === gridSize) {
            twoDimensionalArray.push(oneDimensionalArray)
            oneDimensionalArray = [];
          }
      }
    return twoDimensionalArray
  }
  render() {
    var game = _.clone(this.state.lifeStatus)
    return (
      <div>
        {
          game.map((m,index) => 
            <div key={index}>
              {
                m.map((n, index) => <Button key={index * (n+100)}>{m[n]}</Button>)
              }
            </div>
          )
        }    
      </div>
    )
  }
  circularStitchX(inLeftGridBox, inRightGridBox) {
    inLeftGridBox += inRightGridBox
    while (inLeftGridBox < 0) inLeftGridBox += (this.state.lifeStatus).length
    while (inLeftGridBox >= (this.state.lifeStatus).length) inLeftGridBox-= (this.state.lifeStatus).length;
    return inLeftGridBox; 
  }
  circularStitchY(inTopGridBox, inBottomGridBox) {
    inTopGridBox += inBottomGridBox
    while (inTopGridBox < 0) inTopGridBox += (this.state.lifeStatus).length
    while (inTopGridBox >= (this.state.lifeStatus).length) inTopGridBox-= (this.state.lifeStatus).length;
    return inTopGridBox; 
  }
  noOfAliveNeighbours(inRowIndex, inColIndex, inGridStatus) {
    var count = 0
    for( var neighRowInd = -1; neighRowInd <= 1; neighRowInd++) {
      for(var neighColInd = -1; neighColInd <= 1; neighColInd++) {
        if( neighRowInd || neighColInd ) {
          if(inGridStatus[this.circularStitchX(inRowIndex,neighRowInd)][this.circularStitchY(inColIndex, neighColInd)] === 1) {
            count = count + 1
          }
        }
      }
    }
    return count
  }
  updateState(inCount, inGridStatus) {
    for(var index1 = 0; index1 < inGridStatus.length; index1++) {
      for(var index2 = 0; index2 < inGridStatus.length; index2++) {
        if(inGridStatus[index1][index2] === 1) {
          if(inCount === 0 || inCount === 1 || inCount > 3) {
            inGridStatus[index1][index2] = 0
          }
        } else {
            if(inCount === 3) {
              inGridStatus[index1][index2] = 1 
            }
        }
      }
    }
    return inGridStatus
  }
  componentDidMount() {
    setInterval(() => {
      var count = 0
      var gridStatus = _.clone(this.state.lifeStatus)
      for(var index1 = 0; index1 < gridStatus.length; index1++) {
        for(var index2 = 0; index2 < gridStatus.length; index2++) {
          count = this.noOfAliveNeighbours(index1, index2, gridStatus)
          var inGridStatus = this.updateState(count, gridStatus)
        }
      }
      setTimeout(() => this.setState({lifeStatus: inGridStatus}), 1000)
    }, 1000)
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prop: this.props.children
    }
  }
  renderBasedOnState() {
    if(this.state.prop)
      return (
        <span className="alive-cell"></span>
      )
    else
      return (
        <span className="dead-cell"></span>
      )
  } 
  render() {
    return (
      this.renderBasedOnState()
    )
  }
}

Earth.defaultProps = {
  numberOfContinents: 6
}

export default Earth