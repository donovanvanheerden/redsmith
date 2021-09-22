import * as actions from "monaco-editor/esm/vs/platform/actions/common/actions";

let menus = actions.MenuRegistry._menuItems;
let contextMenuEntry = [...menus].find(entry => entry[0]._debugName == "EditorContext");
let contextMenuLinks = contextMenuEntry[1];

let removableIds = ["editor.action.quickCommand", "editor.action.refactor", "editor.action.revealDefinition", "editor.action.revealDeclaration", "editor.action.quickOutline", "editor.action.changeAll"];

let removeById = (list, ids) => {
  let node = list._first;
  do {
    let shouldRemove = ids.includes(node.element?.command?.id);
    if (shouldRemove) { list._remove(node)  }
  } while ((node = node.next));
};

removeById(contextMenuLinks, removableIds);