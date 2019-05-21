import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';

/**
 * Reads angular.json file from the root of a workspace and returns an
 * array of all project names
 *
 * @returns {string[]} Array of project names
 */
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
    vscode.window.showErrorMessage('Could not load projects from angular.json');
    console.error(err);
  }
  return [];
};

/**
 * Alphabetical sort function based on current locale
 *
 * @param {string} a The first element for comparison
 * @param {string} b The second element for comparson
 */
const sortByName = (a: string, b: string) => a.localeCompare(b);

/**
 * Main entry point for Angular project selector extension. Gets a list
 * of projects from the angular.json file and filters if an optional
 * arguments has been specified.
 *
 * @param args The command arguments
 * @returns Alphabetically sorted list of project names
 */
const projectSelectorCommandHandler = async (
  ...args: any[]
): Promise<string | undefined> => {
  let filter = '';
  if (args[0] && args[0].filter) {
    filter = args[0].filter;
  }

  const projects = !!filter
    ? getProjects()
        .filter(project => project.includes(filter))
        .sort(sortByName)
    : getProjects().sort(sortByName);

  return vscode.window.showQuickPick(projects, {
    placeHolder: 'Select a project'
  });
};

/**
 * This method is called when the extension is activated.
 * The extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'extension.angularProjectSelector',
      projectSelectorCommandHandler
    )
  );
}

/**
 * This method is called when the extension is deactivated
 */
export function deactivate() {}
