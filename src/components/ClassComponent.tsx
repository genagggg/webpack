import React, { Component } from 'react'

export default class ClassComponent extends Component<any, any>{
    constructor(props:any){
        super(props)
        this.state={
            count: 0
        }
        this.increment=this.increment.bind(this)
        this.decrement=this.decrement.bind(this)
    }
    increment(){
        this.setState({count: this.state.count+1})
    }
    decrement(){
        this.setState({count: this.state.count-1})
    }
  render() {
    return (
      <div>
        <h1>Счётчик класса: {this.state.count}</h1>
        <button onClick={this.increment}>Добавить</button>
        <button onClick={this.decrement}>Убавить</button>
      </div>
    )
  }
}
