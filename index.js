/* Created by meyve on 10.10.17*/
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export class Portal extends React.Component {
    constructor (props) {
        super(props);

        this.portalContainer = null;
        this.state           = {
            isOpened: Boolean(props.isOpened),
        };


        this.openPortal         = this.openPortal.bind(this);
        this.closePortal        = this.closePortal.bind(this);
        this.handleEscKeyPress  = this.handleEscKeyPress.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.getDefaultDomNode  = this.getDefaultDomNode.bind(this);
        this.createPortal       = this.createPortal.bind(this);
    }

    static propTypes = {
        isOpened                  : PropTypes.bool,
        closeOnEsc                : PropTypes.bool,
        closeOnOutsideClick       : PropTypes.bool,
        openPortalByClickOnElement: PropTypes.any,
        onOpen                    : PropTypes.func,
        beforeOpen                : PropTypes.func,
        onClose                   : PropTypes.func,
        beforeClose               : PropTypes.func,
    };

    componentDidMount () {
        if (this.props.closeOnEsc) {
            document.addEventListener('keydown', this.handleEscKeyPress);
        }
        if (this.props.closeOnOutsideClick) {
            document.addEventListener('mouseup', this.handleOutsideClick);
            document.addEventListener('touchstart', this.handleOutsideClick);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.hasOwnProperty('isOpened')) {
            if (this.props.isOpened !== nextProps.isOpened) {
                return nextProps.isOpened ? this.openPortal() : this.closePortal();
            }
        }
    }

    componentWillUnmount () {
        if (this.props.closeOnEsc) {
            document.removeEventListener('keydown', this.handleEscKeyPress);
        }
        if (this.props.closeOnOutsideClick) {
            document.removeEventListener('mouseup', this.handleOutsideClick);
            document.removeEventListener('touchstart', this.handleOutsideClick);
        }

    }

    getDefaultDomNode () {
        const reactContainerId = 'react_portal-container';
        this.portalContainer   = document.getElementById(reactContainerId);

        if (!this.portalContainer) {
            this.portalContainer    = document.createElement('div');
            this.portalContainer.id = reactContainerId;
            document.body.appendChild(this.portalContainer);
        }
        return document.getElementById(reactContainerId);
    }

    openPortal () {
        if (this.props.beforeOpen) this.props.beforeOpen();
        return this.setState({isOpened: true}, this.props.onOpen);
    }

    closePortal () {
        if (this.props.beforeClose) this.props.beforeClose();
        return this.setState({isOpened: false}, this.props.onClose);
    }

    handleOutsideClick (event) {
        if (!this.state.isOpened) return;
        if (!this.wrapperElement || this.wrapperElement.contains(event.target)) {
            return;
        }
        this.closePortal();
    }

    handleEscKeyPress (event) {
        if (event.keyCode === 27 && this.state.isOpened) {
            this.closePortal();
        }
    }

    wrapper = () => <div className='react_portal-wrapper'
                         ref={(wrapper) => this.wrapperElement = wrapper}>{this.props.children}</div>;

    createPortal () {
        return ReactDOM.createPortal(this.wrapper(), this.portalContainer);
    }

    render () {

        if (!this.props.node && !this.portalContainer) this.getDefaultDomNode();

        return (
            <div className='react_portal-root' ref={(root) => this.root = root}>
                {this.props.openPortalByClickOnElement && React.cloneElement(this.props.openPortalByClickOnElement, {onClick: this.openPortal})}
                {this.state.isOpened && this.createPortal()}
            </div>
        );
    }
}