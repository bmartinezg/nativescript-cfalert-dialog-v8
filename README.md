# nativescript-cfalert-dialog [![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/nativescript-cfalert-dialog)

This plugin is a wrapper around `CFAlertDialog` for Android and `CFAlertViewController` adapted to native-script v8 by Bruno Martínez.

## Screenshots

### Android

<img src="https://github.com/shiv19/nativescript-cfalert-dialog/blob/master/assets/demoandroid.gif?raw=true" height="640" >

### iOS

<img src="https://github.com/shiv19/nativescript-cfalert-dialog/blob/master/assets/iosdemo.gif?raw=true" height="640" >

## Installation

```javascript
yarn add 'https://github.com/bmartinezg/nativescript-cfalert-dialog-v8'
```

## Configuration

no configuration step involved

## Usage

NativeScript Core with { TypeScript } (works on Core, Angular and Vue as well)

```js
import {
  CFAlertDialog,
  DialogOptions,
  CFAlertGravity,
  CFAlertActionAlignment,
  CFAlertActionStyle,
  CFAlertStyle,
} from "nativescript-cfalert-dialog";

let cfalertDialog = new CFAlertDialog();

let options: DialogOptions = {
  // Options go here
  dialogStyle: CFAlertStyle.ALERT,
  title: "This is cool!",
};

cfalertDialog.show(options); // That's about it ;)
```

## API

`show(options): Promise<string>;`

Shows the CFAlert Dialog based on the options provided.
It returns a promise which can either resolve with a button title (if button was clicked), or it can resolve empty (undefined).

`dismiss(animate:boolean): void;`

Dismiss the CFAlert Dialog (animate option effective on iOS only)

## Options format

```javascript
// Everything that has '?' is optional
export interface DialogOptions {
  dialogStyle: CFAlertStyle;
  title: string;
  titleColor?: string;
  message?: string;
  messageColor?: string;
  textColor?: string;
  textAlignment?: CFAlertGravity;
  backgroundColor?: string;
  backgroundBlur?: string; // iOS only
  cancellable?: boolean;
  headerView?: any; // nativeView
  footerView?: any; // nativeView
  onDismiss?: Function; // calback for dismiss, function (dialog)
  buttons?: [
    {
      text: string, // title
      buttonStyle: CFAlertActionStyle,
      buttonAlignment?: CFAlertActionAlignment,
      textColor?: string,
      backgroundColor?: string,
      onClick: Function, // function (buttonName)
    }
  ];
  simpleList?: {
    // android only
    items: [string],
    onClick: Function, // function(dialogInterface, index)
  };
  singleChoiceList?: {
    // android only
    items: [string],
    selectedItem: number,
    onClick: Function, // function(dialogInterface, index)
  };
  multiChoiceList?: {
    // android only
    items: [string],
    selectedItems: [boolean], // should have same number of elements as 'items'
    onClick: Function, // function (dialogInterface, index, b)
  };
}
```

## License

Apache License Version 2.0, January 2004
