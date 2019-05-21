// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "angular-project-selector" is now active!'
  );

  const getProjects = (): string[] => {
    let workspaceRoot = vscode.workspace.rootPath;
    if (!workspaceRoot) {
      vscode.window.showWarningMessage('No workspace root found');
      return [];
    }

    try {
      const angularJson = join(workspaceRoot, 'angular.json');
      if (existsSync(angularJson)) {
        const contents = readFileSync(angularJson, 'utf8');
        const json = JSON.parse(contents);
        if (!!json && !!json.projects) {
          return Object.keys(json.projects);
        }
      }
    } catch (err) {
      vscode.window.showErrorMessage(
        'Could not load projects from angular.json'
      );
      console.error(err);
    }
    return [];
  };

  const sortByName = (a: string, b: string) => a.localeCompare(b);

  const allProjectsCommandHandler = () => {
    const nxProjects = getProjects().sort(sortByName);
    console.log(nxProjects);
  };

  const projectSelectorCommandHandler = (args: any[]) => {
    console.log(args);
    console.log(getProjects());
  };

  /* const nxE2eProjectsCommandHandler = async () => {
    const nxE2eProjects = getNxProjects()
      .filter(project => {
        return project.includes('e2e');
      })
      .sort(sortByName);

    console.log(nxE2eProjects);

    const selection = await vscode.window.showQuickPick(nxE2eProjects, {
      placeHolder: 'Select an E2E project to run'
    });

    if (!selection) {
      console.log(`No valid selection made!`);
      return;
    }

    return selection;
	}; */

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.angularProjectSelector',
      projectSelectorCommandHandler
    )
  );

  /* context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.angularAllProjectsCommandHandler',
      nxAllProjectsCommandHandler
    )
  ); */

  /* context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.nxE2eProjectsCommandHandler',
      nxE2eProjectsCommandHandler
    )
  ); */
}

// this method is called when your extension is deactivated
export function deactivate() {}
