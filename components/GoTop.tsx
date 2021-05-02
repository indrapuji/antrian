/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface PropsType {
  scrollStepInPx: number;
  delayInMs: number;
}

interface StateType {
  intervalId: any;
  thePosition: boolean;
}

class GoTop extends React.Component<PropsType, StateType> {
  _isMounted = false;

  constructor(props: PropsType) {
    super(props);
    this.state = {
      intervalId: 0,
      thePosition: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        this.setState({ thePosition: true });
      } else {
        this.setState({ thePosition: false });
      }
    });
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onScrollStep = () => {
    const { intervalId } = this.state;
    const { scrollStepInPx } = this.props;

    this._isMounted = true;
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  scrollToTop = () => {
    const { delayInMs } = this.props;
    this._isMounted = true;
    const intervalId = setInterval(this.onScrollStep, delayInMs);
    this.setState({ intervalId });
  };

  renderGoTopIcon = () => {
    const { thePosition } = this.state;

    if (thePosition) {
      return (
        <div className="go-top" onClick={this.scrollToTop}>
          <i className="pe-7s-angle-up" />
        </div>
      );
    }

    return <></>;
  };

  render() {
    return <>{this.renderGoTopIcon()}</>;
  }
}

export default GoTop;
