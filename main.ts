/**
 * Criado e mantido por Luiz Henrique Ferreira Monteiro 
 * em parceria com a Fuzzy Makers
 * https://github.com/Wolfloiz
 * https://fuzzymakers.com/
 */

//% color="#2c80b8"
namespace fuzzyLibrary {

    export enum digitalPorts {
        //% blockId="P0 e P1" block="P0 e P1"
        P0P1 = 1,
        //% blockId="P2P3" block="P2 e P3"
        P2P3 = 2,
        //% blockId="P3P4" block="P3 e P4"
        P3P4 = 3,
        //% blockId="P4P5" block="P4 e P5"
        P4P5 = 4,
        //% blockId="P6P7" block="P6 e P7"
        P6P7 = 5,
        //% blockId="P8P9" block="P8 e P9"
        P8P9 = 6,
        //% blockId="P10P11" block="P10 e P11"
        P10P11 = 7,
        //% blockId="P12P13" block="P12 e P13"
        P12P13 = 8,
        //% blockId="P14P15" block="P14 e P15"
        P14P15 = 9,
        //% blockId="P1P10" block="P1 e P10"
        P1P10 = 10
    }

    export enum hexColor {
        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow
    }

    export enum servoPorts {
        //% blockId="P1" block="P1"
        P1 = 1,
        //% blockId="P4" block="P4"
        P4 = 2,
        //% blockId="P2" block="P2"
        P2 = 3,
        //% blockId="P10" block="P10"
        P10 = 4
    }
    //% blockId=Digital_Ultrasonic block="Sensor Ultrasonico|pin %value_DNum"
    //% weight=97
    //% blockGap=20
    //% color=ED755E
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function ultrasonic(value_DNum: digitalPorts): number {
        //send pulse
        let Trig, Echo;
        if (value_DNum == 1) { Trig = DigitalPin.P0; Echo = DigitalPin.P1; }
        else if (value_DNum == 2) { Trig = DigitalPin.P2; Echo = DigitalPin.P3; }
        else if (value_DNum == 3) { Trig = DigitalPin.P3; Echo = DigitalPin.P4; }
        else if (value_DNum == 4) { Trig = DigitalPin.P4; Echo = DigitalPin.P5; }
        else if (value_DNum == 5) { Trig = DigitalPin.P6; Echo = DigitalPin.P7; }
        else if (value_DNum == 6) { Trig = DigitalPin.P8; Echo = DigitalPin.P9; }
        else if (value_DNum == 7) { Trig = DigitalPin.P10; Echo = DigitalPin.P11; }
        else if (value_DNum == 8) { Trig = DigitalPin.P12; Echo = DigitalPin.P13; }
        else if (value_DNum == 9) { Trig = DigitalPin.P14; Echo = DigitalPin.P15; }
        else if (value_DNum == 10) { Trig = DigitalPin.P1; Echo = DigitalPin.P10; }

        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(Trig, 0);

        //read pulse, maximum distance=500cm
        const d = pins.pulseIn(Echo, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }

    //% blockId=ModuleWorld_PWM_Servo2 block="Girar servo 270 |pin %ServoNum|valor %value"
    //% weight=6
    //% blockGap=20
    //% value.min=0 value.max=270
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function servo2(ServoNum: servoPorts, value: number): void {
        let pin;
        if (ServoNum == 1) { pin = AnalogPin.P1; }
        else if (ServoNum == 2) {
            led.enable(false);
            pin = AnalogPin.P4;
        }
        else if (ServoNum == 3) { pin = AnalogPin.P2; }
        else if (ServoNum == 4) {
            led.enable(false);
            pin = AnalogPin.P10;
        }

        pins.servoSetPulse(pin, Math.map(value, 0, 270, 500, 2500))
    }

    //% blockId=ModuleWorld_PWM_RGB block=" LED RGB|Red: %value1|Green: %value2|Blue: %value3"
    //% weight=2
    //% blockGap=20
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function rgb(value1: number, value2: number, value3: number): void {

        pins.analogWritePin(AnalogPin.P13, value1 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P14, value2 * 1024 / 256);
        pins.analogWritePin(AnalogPin.P12, value3 * 1024 / 256);
    }

    //% blockId=ModuleWorld_PWM_RGB2 block="RGB|value %value"
    //% weight=1
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function rgb2(value: hexColor): void {
        let pin1 = DigitalPin.P13;
        let pin2 = DigitalPin.P14;
        let pin3 = DigitalPin.P12;

        switch (value) {
            case hexColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case hexColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case hexColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case hexColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case hexColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case hexColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case hexColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case hexColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }
    }

}