<template>
    <div class="keyboardContainer">
        <div class="simple-keyboard-main"></div>
    </div>
</template>
  
<script lang="ts">
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { lookup } from "../../../common/hid_keys"
export default {
    name: "SimpleKeyboard",
    props: {
        input: String
    },
    data: () => ({
        keyboard: null as Keyboard | null,
    }),
    mounted() {
        let commonKeyboardOptions = {
            onKeyPress: (button: any) => this.onKeyPress(button),
            theme: "simple-keyboard hg-theme-default hg-layout-default",
            physicalKeyboardHighlight: true,
            syncInstanceInputs: true,
            mergeDisplay: true,
            debug: false
        };
        this.keyboard = new Keyboard(".simple-keyboard-main", {
            ...commonKeyboardOptions,
            /**
             * Layout by:
             * Sterling Butters (https://github.com/SterlingButters)
             */
            layout: {
                default: [
                    "{ESCAPE} {F1} {F2} {F3} {F4} {F5} {F6} {F7} {F8} {F9} {F10} {F11} {F12}",
                    "{Grave%20Accent} 1 2 3 4 5 6 7 8 9 0 - = {DELETE%20(Backspace)}",
                    "{Tab} q w e r t y u i o p [ ] \\",
                    "{Caps%20Lock} a s d f g h j k l ; ' {Return%20(ENTER)}",
                    "{LeftShift} z x c v b n m , . / {RightShift}",
                    "{LeftControl} {LeftAlt} {Left%20GUI} {Spacebar} {LeftArrow} {UpArrow} {DownArrow} {RightArrow}"
                ],
            },
            display: {
                "{ESCAPE}": "ESC",
                "{Tab}": "Tab",
                "{DELETE%20(Backspace)}": "Bksp",
                "{Return%20(ENTER)}": "Enter",
                "{Caps%20Lock}": "Caps",
                "{LeftShift}": "Shift",
                "{RightShift}": "Shift",
                "{LeftControl}": "Ctrl",
                "{LeftAlt}": "Alt",
                "{RightAlt}": "Alt",
                "{Left%20GUI}": "Cmd",
                "{Right%20GUI}": "Cmd",
                "{Grave%20Accent}": "`",
                "{Spacebar}": "&nbsp;&nbsp;&nbsp;",
                "{F1}": "F1",
                "{F2}": "F2",
                "{F3}": "F3",
                "{F4}": "F4",
                "{F5}": "F5",
                "{F6}": "F6",
                "{F7}": "F7",
                "{F8}": "F8",
                "{F9}": "F9",
                "{F10}": "F10",
                "{F11}": "F11",
                "{F12}": "F12",
                "{LeftArrow}": "←",
                "{RightArrow}": "→",
                "{UpArrow}": "↑",
                "{DownArrow}": "↓",
            }
        });
    },
    methods: {
        onKeyPress(button: any) {
            {
                let _button = decodeURIComponent(button);
                if (_button.charAt(0) === "{") {
                    _button = _button.substring(1, _button.length - 1);
                }
                let translatedButton = lookup(_button);
                this.$emit("onKeyPress", translatedButton);
            }

        },
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.keyboardContainer {
    display: flex;
    background-color: rgba(0, 0, 0, 0.1);
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
}

.simple-keyboard.hg-theme-default {
    display: inline-block;
}

.simple-keyboard-main.simple-keyboard {
    width: 100%;
    background-color: transparent;
}

.simple-keyboard-main.simple-keyboard .hg-row:first-child {
    margin-bottom: 10px;
}

.simple-keyboard-arrows.simple-keyboard {
    align-self: flex-end;
    background-color: transparent;
}

.simple-keyboard .hg-button.selectedButton {
    background-color: rgba(5, 25, 70, 0.53);
    color: white;
}

.simple-keyboard .hg-button.emptySpace {
    pointer-events: none;
    background-color: transparent;
    border: none;
    box-shadow: none;
}

.simple-keyboard-arrows .hg-row {
    justify-content: center;
}

.simple-keyboard-arrows .hg-button {
    width: 50px;
    flex-grow: 0;
    justify-content: center;
    display: flex;
    align-items: center;
}

.controlArrows {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column;
}

.simple-keyboard-control.simple-keyboard {
    background-color: transparent;
}

.simple-keyboard-control.simple-keyboard .hg-row:first-child {
    margin-bottom: 10px;
}

.simple-keyboard-control .hg-button {
    width: 50px;
    flex-grow: 0;
    justify-content: center;
    display: flex;
    align-items: center;
}

.numPad {
    display: flex;
    align-items: flex-end;
}

.simple-keyboard-numpad.simple-keyboard {
    background-color: transparent;
}

.simple-keyboard-numpad.simple-keyboard {
    width: 160px;
}

.simple-keyboard-numpad.simple-keyboard .hg-button {
    width: 50px;
    justify-content: center;
    display: flex;
    align-items: center;
}

.simple-keyboard-numpadEnd.simple-keyboard {
    width: 50px;
    background: transparent;
    margin: 0;
    padding: 5px 5px 5px 0;
}

.simple-keyboard-numpadEnd.simple-keyboard .hg-button {
    align-items: center;
    justify-content: center;
    display: flex;
}

.simple-keyboard-numpadEnd .hg-button.hg-standardBtn.hg-button-plus {
    height: 85px;
}

.simple-keyboard-numpadEnd.simple-keyboard .hg-button.hg-button-enter {
    height: 85px;
}

.simple-keyboard.hg-theme-default .hg-button.hg-selectedButton {
    background: rgba(5, 25, 70, 0.53);
    color: white;
}

.hg-button.hg-functionBtn.hg-button-space {
    width: 350px;
}
</style>
  