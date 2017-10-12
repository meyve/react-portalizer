'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Portal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Created by meyve on 10.10.17*/


var Portal = exports.Portal = function (_React$Component) {
    _inherits(Portal, _React$Component);

    function Portal(props) {
        _classCallCheck(this, Portal);

        var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, props));

        _this.wrapper = function () {
            return _react2.default.createElement(
                'div',
                { className: 'react_portal-wrapper',
                    ref: function ref(wrapper) {
                        return _this.wrapperElement = wrapper;
                    } },
                _this.props.children
            );
        };

        _this.portalContainer = null;
        _this.state = {
            isOpened: Boolean(props.isOpened)
        };

        _this.openPortal = _this.openPortal.bind(_this);
        _this.closePortal = _this.closePortal.bind(_this);
        _this.handleEscKeyPress = _this.handleEscKeyPress.bind(_this);
        _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
        _this.getDefaultDomNode = _this.getDefaultDomNode.bind(_this);
        _this.createPortal = _this.createPortal.bind(_this);
        return _this;
    }

    _createClass(Portal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.closeOnEsc) {
                document.addEventListener('keydown', this.handleEscKeyPress);
            }
            if (this.props.closeOnOutsideClick) {
                document.addEventListener('mouseup', this.handleOutsideClick);
                document.addEventListener('touchstart', this.handleOutsideClick);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.hasOwnProperty('isOpened')) {
                if (this.props.isOpened !== nextProps.isOpened) {
                    return nextProps.isOpened ? this.openPortal() : this.closePortal();
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.closeOnEsc) {
                document.removeEventListener('keydown', this.handleEscKeyPress);
            }
            if (this.props.closeOnOutsideClick) {
                document.removeEventListener('mouseup', this.handleOutsideClick);
                document.removeEventListener('touchstart', this.handleOutsideClick);
            }
        }
    }, {
        key: 'getDefaultDomNode',
        value: function getDefaultDomNode() {
            var reactContainerId = 'react_portal-container';
            this.portalContainer = document.getElementById(reactContainerId);

            if (!this.portalContainer) {
                this.portalContainer = document.createElement('div');
                this.portalContainer.id = reactContainerId;
                document.body.appendChild(this.portalContainer);
            }
            return document.getElementById(reactContainerId);
        }
    }, {
        key: 'openPortal',
        value: function openPortal() {
            if (this.props.beforeOpen) this.props.beforeOpen();
            return this.setState({ isOpened: true }, this.props.onOpen);
        }
    }, {
        key: 'closePortal',
        value: function closePortal() {
            if (this.props.beforeClose) this.props.beforeClose();
            return this.setState({ isOpened: false }, this.props.onClose);
        }
    }, {
        key: 'handleOutsideClick',
        value: function handleOutsideClick(event) {
            if (!this.state.isOpened) return;
            if (!this.wrapperElement || this.wrapperElement.contains(event.target)) {
                return;
            }
            this.closePortal();
        }
    }, {
        key: 'handleEscKeyPress',
        value: function handleEscKeyPress(event) {
            if (event.keyCode === 27 && this.state.isOpened) {
                this.closePortal();
            }
        }
    }, {
        key: 'createPortal',
        value: function createPortal() {
            return _reactDom2.default.createPortal(this.wrapper(), this.portalContainer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (!this.props.node && !this.portalContainer) this.getDefaultDomNode();

            return _react2.default.createElement(
                'div',
                { className: 'react_portal-root', ref: function ref(root) {
                        return _this2.root = root;
                    } },
                this.props.openPortalByClickOnElement && _react2.default.cloneElement(this.props.openPortalByClickOnElement, { onClick: this.openPortal }),
                this.state.isOpened && this.createPortal()
            );
        }
    }]);

    return Portal;
}(_react2.default.Component);

Portal.propTypes = {
    isOpened: _propTypes2.default.bool,
    closeOnEsc: _propTypes2.default.bool,
    closeOnOutsideClick: _propTypes2.default.bool,
    openPortalByClickOnElement: _propTypes2.default.any,
    onOpen: _propTypes2.default.func,
    beforeOpen: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    beforeClose: _propTypes2.default.func
};