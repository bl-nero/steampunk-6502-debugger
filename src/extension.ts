import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Activating Steampunk 6502 debugger');

  context.subscriptions.push(
    vscode.debug.registerDebugAdapterDescriptorFactory(
      'steampunk-6502',
      new SteampunkDebugAdapterDescriptorFactory()));
}

class SteampunkDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
  createDebugAdapterDescriptor(
    session: vscode.DebugSession,
    executable: vscode.DebugAdapterExecutable | undefined
  ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
    return new vscode.DebugAdapterServer(1234);
  }
}

export function deactivate() { }