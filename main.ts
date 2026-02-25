function right () {
    motionbit.setServoPosition(MotionBitServoChannel.S1, 90)
}
input.onPinPressed(TouchPin.P0, function () {
    forward()
})
function left () {
    motionbit.setServoPosition(MotionBitServoChannel.S1, -90)
}
function connecttowifi () {
    let KEY = ""
    let SSID = ""
    WiFiBit.connectToWiFiNetwork(SSID, KEY)
    WiFiBit.connectToWiFiBit()
}
input.onButtonPressed(Button.A, function () {
    left()
})
function getenviromentdata () {
    enviromentdata = [
    Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_mm, DigitalPin.P2),
    Environment.UVLevel(AnalogPin.P2),
    Environment.ReadNoise(AnalogPin.P2),
    Environment.ReadLightIntensity(AnalogPin.P2),
    Environment.ReadWindSpeed(AnalogPin.P2)
    ]
}
function backward () {
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, 128)
}
function getsoildata () {
    soildata = [
    Environment.ReadSoilHumidity(AnalogPin.P2),
    Environment.Ds18b20Temp(DigitalPin.P2, Environment.ValType.DS18B20_temperature_C),
    Environment.ReadDust(DigitalPin.P2, AnalogPin.P2),
    Environment.ReadSoilHumidity(AnalogPin.P2),
    Environment.ReadWaterLevel(AnalogPin.P2),
    Environment.ReadLightIntensity(AnalogPin.P2)
    ]
}
input.onButtonPressed(Button.AB, function () {
    getsoildata()
    getwaterdata()
    getenviromentdata()
})
input.onButtonPressed(Button.B, function () {
    right()
})
input.onPinPressed(TouchPin.P1, function () {
    backward()
})
function overheating () {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
function forward () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, 128)
}
function disconnectfromwifi () {
    WiFiBit.connectToWiFiBit()
    WiFiBit.disconnectFromWiFiNetwork()
}
function getwaterdata () {
    waterdata = [Environment.readPHLevel(AnalogPin.P2), Environment.ReadWaterLevel(AnalogPin.P2), Environment.ReadLightIntensity(AnalogPin.P2)]
}
let sciencedata = ""
let temp = 0
let waterdata: number[] = []
let soildata: number[] = []
let enviromentdata: number[] = []
basic.showString("Hello! <:")
basic.forever(function () {
    temp = input.temperature()
    sciencedata = "" + enviromentdata + soildata + waterdata
    if (temp >= 35) {
        while (temp >= 35) {
            music.play(music.stringPlayable("C5 - C5 - C5 - C5 - ", 120), music.PlaybackMode.UntilDone)
            overheating()
        }
    }
})
