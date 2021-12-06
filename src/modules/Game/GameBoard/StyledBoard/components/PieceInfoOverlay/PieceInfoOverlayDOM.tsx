import React from 'react';
import ReactDOM from 'react-dom';
import { PiecesID } from 'src/types';

type Props = {
  piece: PiecesID;
};

export class PieceInfoOverlayDOM extends React.Component<Props> {
  private el: HTMLElementTagNameMap['div'];
  private overlayRoot: HTMLElement | null;

  constructor(props: Props) {
    super(props);
    this.overlayRoot = document.getElementById(props.piece);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    if (this.overlayRoot) {
      this.overlayRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.overlayRoot) {
      this.overlayRoot.removeChild(this.el);
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
