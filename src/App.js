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
  generateContinentState(gridSize) {
      var twoDimensionalArray = []
      var oneDimensionalArray = []
      for (var i = 0; i < (gridSize * gridSize); i++) {
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
    var game = _.map(this.state.lifeStatus, _.clone())
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
  circularStitchX(leftGridBox, rightGridBox) {
    leftGridBox += rightGridBox
    while (leftGridBox < 0) leftGridBox += (this.state.lifeStatus).length
    while (leftGridBox >= (this.state.lifeStatus).length) leftGridBox-= (this.state.lifeStatus).length;
    return leftGridBox; 
  }
  circularStitchY(topGridBox, bottomGridBox) {
    topGridBox += bottomGridBox
    while (topGridBox < 0) topGridBox += (this.state.lifeStatus).length
    while (topGridBox >= (this.state.lifeStatus).length) topGridBox-= (this.state.lifeStatus).length;
    return topGridBox; 
  }
  noOfAliveNeighbours(rowIndex, colIndex, gridStatus) {
    var count = 0
    for( var neighRowInd = -1; neighRowInd <= 1; neighRowInd++) {
      for(var neighColInd = -1; neighColInd <= 1; neighColInd++) {
        if( neighRowInd || neighColInd ) {
          if(gridStatus[this.circularStitchX(rowIndex,neighRowInd)][this.circularStitchY(colIndex, neighColInd)] === 1) {
            count = count + 1
          }
        }
      }
    }
    return count
  }
  setUpdate(gridStatus) {
    this.setState({lifeStatus: gridStatus})
  }
  updateState(inCount) {
    console.log("updating")
    var gridStatus = _.map(this.state.lifeStatus, _.clone())
    for(var index1 = 0; index1 < gridStatus.length; index1++) {
      for(var index2 = 0; index2 < gridStatus.length; index2++) {
        if(gridStatus[index1][index2] === 1) {
          if(inCount === 0 || inCount === 1 || inCount > 3) {
            gridStatus[index1][index2] = 0
          }
        } else {
            if(inCount === 3) {
              gridStatus[index1][index2] = 1
              
            }
        }
      }
    }
  }
  componentDidMount() {
    var count = 0
    var gridStatus = _.map(this.state.lifeStatus, _.clone())
    for(var index1 = 0; index1 < gridStatus.length; index1++) {
      for(var index2 = 0; index2 < gridStatus.length; index2++) {
        count = this.noOfAliveNeighbours(index1, index2, gridStatus)
        this.updateState(count)
      }
    }
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

