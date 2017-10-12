#Simple React Portal component with out-of-box features.


# Getting Started
## Installation

```
$ npm install --save react-date-range
```

## Usage

You can handle Portal's state by your parent's state.
```javascript
import React from 'react';
import { Portal } from 'react-portalizer';

class MyComponent extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            isOpened: false
        }
    }
	
	render() {
        return (
            <div>
                <Portal
                    isOpened={this.state.isOpened}
                >
                /* Your children should be placed here */   
                </Portal>
            </div>
            )
    }
}
```


Or you can make Portal take care of itself by passing *openPortalByClickOnElement* prop.
```javascript
import React from 'react';
import { Portal } from 'react-portalizer';

class MyComponent extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            isOpened: false
        }
    }
	
	render() {
        return (
            <div>
                <Portal
                    openPortalByClickOnElement={<button>Open portal, please</button>}
                >
                /* Your children should be placed here */   
                </Portal>
            </div>
            )
    }
}
```


## Available options
####To use Poral you need pass to it one of two props - either **isOpened** or **openPortalByClickOnElement**.

* **isOpened:** *(Boolean)* - Should Portal be opened or not.
* **openPortalByClickOnElement:** *(Node)* - Element that should toggle Portal
* **closeOnEsc** *(Boolean)* - Close Portal when ESC is presse
* **closeOnOutsideClick** *(Boolean)* - Close Portal when click occured outside of Portal's body
* **onOpen** *(Function)* - Function to be called ***after*** Portal is opened
* **beforeOpen** *(Function)* - Function to be called ***before*** Portal is opened 
* **onClose** *(Function)* - Function to be called ***after*** Portal is closed
* **beforeClose** *(Function)* - Function to be called ***before*** Portal is closed
