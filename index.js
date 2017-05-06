const React = require('react');

const dejank = (Component, milliseconds = 3000) => {

  return class extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        dejank: true
      }
    }

    componentWillMount() {
      setInterval(() => {
        this.setState({
          dejank: !this.state.dejank
        })
        this.forceUpdate()
      }, milliseconds)
    }

    render() {
      return (
        <Component
          {...this.props}
          dejank={this.state.dejank}
        />
      )
    }
  }
};

module.exports = dejank
