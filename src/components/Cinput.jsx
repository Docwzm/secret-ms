import React from 'react'

export default class SearchInput extends React.Component {
  constructor () {
    super()

    this.onComposition = this.onComposition.bind(this)
    this.onChange = this.onChange.bind(this)
    this.isCompositing = false
  }

  onComposition (e) {
      console.log(e.type)
    if (e.type === 'compositionstart') {
      this.isCompositing = true
    } else {
      this.isCompositing = false
      this.callHandler(e)
    }
  }

  onChange (e) {
    if (!this.isCompositing) {
      this.callHandler(e)
    }
  }

  callHandler (e) {
    const { onChange } = this.props
    if (onChange && onChange instanceof Function) {
      this.props.onChange(e)
    }
  }

  render () {
    return (
        <input {...this.props} onCompositionStart={this.onComposition}
            onCompositionEnd={this.onComposition}
        />
    )
  }
}