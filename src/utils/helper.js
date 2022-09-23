import { arrayMove } from "react-sortable-hoc";
export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function removeCookie(name = "user") {
  setCookie(name, "", -1);
}

export function list_to_tree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    node.key = node.id
    if (node.parent_id) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parent_id]]?.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

export function FormatVndCurrency(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND';
}

export function generateKey(pre) {
  return `${pre}_${new Date().getTime()}`;
}

// do: swap order of 2 item which have order == a and b
// params: tree 
// params: a = order a
// params: b = order b
// return new array after swap
export function swapOrderImmutable(array, oldId, newId, parentId = -1) {
  let newTree = deepCopy(array);

  // find item index
  const oldItemIndex = newTree.findIndex(item => item.id == oldId)
  const newItemindex = newTree.findIndex(item => item.id == newId)

  // swap order of 2 item
  const tempOrder = newTree[oldItemIndex].order
  console.log('bf', tempOrder)
  newTree[oldItemIndex].order = newTree[newItemindex].order
  newTree[newItemindex].order = tempOrder
  console.log('af', tempOrder)

  return newTree
}

// deep copy array to avoid mofify the original and read only assgin
export function deepCopy(originalArray) {
  return JSON.parse(JSON.stringify(originalArray));
}

export function updateNodeInTree(node, nodeId, changes) {
  if (node.id == nodeId) {
    Object.assign(node, changes);
  } else if (node.children != null) {
    for (let i = 0; i < node.children.length; i++) {
      updateNodeInTree(node.children[i], nodeId, changes);
    }
  }
}

/**
 * return node has nodeId
 * @param {tree} root root node of tree
 * @param {number} nodeId id of require node
 */
export function getNodeInTree(root, nodeId) {
  var stack = [], node, ii;
  stack.push(root);

  while (stack.length > 0) {
    node = stack.pop();
    if (node.id == nodeId) {
      // Found it!
      return node;
    } else if (node.children && node.children.length) {
      for (ii = 0; ii < node.children.length; ii += 1) {
        stack.push(node.children[ii]);
      }
    }
  }

  // Didn't find it. Return null.
  return null;
}