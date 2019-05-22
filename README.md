# Angular Project Selector

This extension provides a convenient way of dynamically extracting a list of projects defined in an `angular.json` file, so that they can be used as a Command input in `tasks.json`. Any projects found will be presented in a picker so that the user can easily select.

Projects can also be filtered by providing an optional argument when defining the task input in `tasks.json`.

> Note: Extension will look for the `angular.json` file at the root of the current workspace. Works with standard Angular CLI projects and monorepos created with NX Extensions.

## Usage

The following example shows how the extension can be used to return a list of e2e projects using the filter argument and then passing the selected value as an input parameter to an `ng e2e` command:

tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "e2e",
      "type": "shell",
      "command": "ng",
      "args": ["e2e", "${input:app}"],
      "presentation": {
        "reveal": "always"
      },
      "group": {
        "kind": "test",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"]
    }
  ],
  "inputs": [
    {
      "type": "command",
      "id": "app",
      "command": "extension.angularProjectSelector",
      "args": {
        "filter": "e2e"
      }
    }
  ]
}
```

### Further reading

- [Visual Studio Code Input Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference#_input-variables)
