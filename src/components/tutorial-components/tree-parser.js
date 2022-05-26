/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
// drag scroll center on click
import * as db from '../../services/firestore';

// pulls values of or json structure as a list
const to_list = (tree, depth) => {
  // SET VALUE YOU WANT
  const value = tree.root.song;
  if (!tree.left || !tree.right) {
    if (!tree.left && !tree.right) {
      return [value];
    } else if (!tree.left) {
      return [value, ...to_list(tree.right, depth += 1)];
    } else {
      return [value, ...to_list(tree.left, depth += 1)];
    }
  }
  return [value, ...to_list(tree.left, depth += 1), ...to_list(tree.right, depth += 1)];
};

const find_song = function (search, tree) {
  if (!tree) {
    return null;
  }
  if (tree.root.song === search) {
    return tree.root;
  }
  const res1 = find_song(search, tree.left);
  const res2 = find_song(search, tree.right);
  if (res1) return res1;
  if (res2) return res2;
  return null;
};

const set_song = function (new_song, tree, old_song) {
  const oldKey = old_song.song;
  if (!tree) {
    return null;
  } else if (tree.root.song === oldKey) {
    tree.root = new_song;
    return tree;
  } else {
    return { root: tree.root, left: set_song(new_song, tree.left, old_song), right: set_song(new_song, tree.right, old_song) };
  }
};

const ui_set = (tree, pid, song) => {
  if (tree) {
    if (tree.root.song !== null && tree.root.song.id === pid && !tree.left.root.song) {
      tree.left.root.song = song;
      tree.left.root.rec = 0;
    } else {
      ui_set(tree.left, pid, song);
      ui_set(tree.right, pid, song);
    }
  }
};

const alg_set = (tree, pid, songs) => {
  if (tree) {
    if (tree.root.song !== null && tree.root.song.id === pid && !tree.right.root.song) {
      tree.right.root.song = songs;
    } else {
      alg_set(tree.left, pid, songs);
      alg_set(tree.right, pid, songs);
    }
  }
};

const alg_add = (tree, songId) => {
  if (tree && tree.right) {
    if (tree.root.song !== null && tree.right.root.song && Array.isArray(tree.right.root.song)) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 3; i++) {
        if (tree.right.root.song[i].id === songId) {
          tree.right.root.song = tree.right.root.song[i];
          tree.right.root.rec = 0;
          break;
        }
      }
    } else { alg_add(tree.right, songId); alg_add(tree.left, songId); }
  }
};

const inc_w = (tree, target) => {
  if (tree) {
    if (tree.root.song && tree.root.song.id === target) {
      if (tree.root.weight === 6) {
        tree.root.weight = 2;
      } else {
        tree.root.weight += 1;
      }
    } else {
      inc_w(tree.left, target);
      inc_w(tree.right, target);
    }
  }
};

const change_attribute = (attr, tree, target) => {
  if (tree === null) {
    return;
  }
  if (tree.root === target) {
    tree.root.attribute = attr;
  }
  change_attribute(attr, tree.left, target);
  change_attribute(attr, tree.right, target);
};

function showChildren_fe(tree, targetid, treeold) {
  let ans = false;
  if (tree) {
    if (tree.left && tree.root.song.id === targetid && (tree.left.root.rec !== 0 || tree.right.root.rec !== 0)) {
      tree.left.root.visible = true;
      tree.right.root.visible = true;
      if (tree.right.root.song !== null) {
        ans = false;
      } else {
        ans = true;
      }
      return ans;
    /* db.getRecs(treeold, targetid)
      .then((result) => { db.songIDsToSongs(result.MESSAGE.songs).then((res) => console.log(res)); }); */ // add catch
    }
    const a1 = showChildren_fe(tree.left, targetid, treeold);
    const a2 = showChildren_fe(tree.right, targetid, treeold);
    return a1 || a2 || false;
  }
  return false;
}
// post maybe just send IDs and weights
// cannot delete root
const delete_node = (tree, target) => {
  if (tree && tree.root.song) {
    if (tree.left && tree.left.root.song && tree.left.root.song.id === target) {
      tree.left = null;
    } else if (tree.right && tree.right.root.song && tree.right.root.song.id === target) {
      tree.right = null;
    } else {
      delete_node(tree.left, target);
      delete_node(tree.right, target);
    }
  }
};

const hideChildren = (tree) => {
  if (tree) {
    if (tree.root.rec !== 0) {
      tree.root.visible = false;
    } else {
      hideChildren(tree.left);
      hideChildren(tree.right);
    }
  }
};

const generateChildren_fe = (tree, _, treeold, t_str = 'root_') => {
  if (tree.root.rec === 0) {
    if (!tree.left) {
      tree.left = {
        root: {
          song: null,
          visible: false,
          weight: 4,
          rec: 1,
          attr: '',
          name: t_str += 'l_',
        },
        left: null,
        right: null,
      };
    } else generateChildren_fe(tree.left, _, treeold, t_str += 'l_');
    if (tree.right === null && tree.root.song !== null) {
      tree.right = {
        root: {
          song: null,
          visible: false,
          weight: 4,
          rec: 2,
          attr: '',
          name: t_str += 'r_',
        },
        left: null,
        right: null,
      };
    } else generateChildren_fe(tree.right, _, treeold, t_str += 'r_');
  }
};
export {
  generateChildren_fe, alg_set, showChildren_fe, delete_node, ui_set, inc_w, hideChildren, alg_add,
};
