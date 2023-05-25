# Steampunk 6502 Debugger

This is a Visual Studio Code extension that allows debugging 6502 code using VS Code debugger and the Steampunk 6502 emulator. Note that as of now, the debugger is more mature than the emulator itself.

![Screenshot](images/screenshot.png)

## Features

* Attach to a running Steampunk emulator
* Support for stepping and breakpoints
* Viewing local registers and call stack
* Memory viewer

All of these are standard features of VS Code.

## Requirements

The debugger is not (yet) capable of starting an emulator on its own; instead, you need to attach to a running instance of a [Steampunk emulator](https://github.com/bl-nero/steampunk). Both Atari 2600 and Commodore 64 are supported.

## Usage

1. Download and run the [Steampunk emulator](https://github.com/bl-nero/steampunk) with a `--debugger` flag. For example, to debug C64 code, use the following command:
    ```sh
    cargo run --bin=c64 --release -- --debugger
    ```
2. Create a launch configuration for attaching to the debugger. Open VS Code, create or open any workspace, and add this to `.vscode/launch.json`:
    ```json
    {
      "name": "Attach to Steampunk",
      "type": "steampunk-6502",
      "request": "attach",
    },
    ```
    By default, port 1234 is used for talking to the debugger; you can specify your own with a `"port"` element and a `--debugger-port` Steampunk command-line argument.
3. Using the "Run and Debug" panel, switch to the configuration that you have just created in and attach to a running emulator.
4. See [Known Issues](#known-issues) for important caveats.

## Known Issues

* The debugger attaches before the CPU is properly initialized, so to see the first stack frame, you have to "step over" the reset cycle. As soon as you do it, the bottom-most stack frame will appear.
* The disassembly view doesn't work if no file is open in an editor. To view the disassembly:
  1. Open any file (it may be a dummy text file).
  2. Go to the "Run and Debug" view.
  3. Right-click on a stack frame in the Call Stack view.
  4. Click "Open Disassembly View".
* The emulator will quit unexpectedly if it sees a debugger message it doesn't understand. One case when it may happen is when you are using a VS Code workspace from a project where you already have source breakpoints defined. Since Steampunk only supports instruction breakpoints (without attached source), it will yell at you angrily and refuse to cooperate. The workaround is to use a different workspace or remove source breakpoints prior to attaching.

## Release Notes

### 1.0.0

Initial release.
