// pulls values of or json structure as a list
to_list = (tree, depth) =>{
    // SET VALUE YOU WANT
    var value = tree.root.song;
    if (!tree.left || !tree.right){
        if (!tree.left && !tree.right){
            return [value];
        }
        else if (!tree.left){
            return [value, ...to_list(tree.right, depth+=1)]
        }
        else {
            return [value, ...to_list(tree.left, depth+=1)]
        }
    }
    return [value, ...to_list(tree.left, depth+=1), ...to_list(tree.right, depth+=1)];
}

find_song = (search, tree) =>{
    if (!tree){
        return null;
    }
    if (tree.root.song === search){
        return tree.root;
    }
    var res1=find_song(search, tree.left);
    var res2 = find_song(search, tree.right);
    if (res1) return res1;
    if (res2) return res2;
    return null;
 }

 set_song = (new_song, tree, old_song) => {
     var oldKey=old_song.song;
     if (!tree){
         return null;
     }
     else if (tree.root.song === oldKey){
         tree.root = new_song;
         return tree;
     }
     else {
         return {root:tree.root, left:set_song(new_song,tree.left,old_song), right:set_song(new_song,tree.right,old_song)};
     }
 }

 change_attribute = (attr, tree, target) => {
    if (tree === null){
        return;
    }
    if (tree.root === target){
        tree.root.attribute = attr;
    }
    change_attribute(attr, tree.left, target);
    change_attribute(attr, tree.right, target);  
 }

//cannot delete root
delete_node = (tree, target) =>{
    if (tree){
        if (tree.left.root===target) {
            tree.left=null;
        }
        else if (tree.right.root===target){
            tree.right=null;
        }
        else {
            delete_node(tree.left, target);
            delete_node(tree.right, target);
        }
    }
}




var t = {root:
{song: "jazz",
artist:"blah",
attribute: "genre",},
left:{
    root:{
        song:"jesus etc.",
        artist:"wilco",
        attribute: "genre",
    },
    left: null,
    right: null,
},
right:{
    root:{
        song:"Heads Will Roll",
        artist:"yeah yeah yeahs",
        attribute: "mood",
    },
    left: {
        root:{
            song:"I wanna hold your hand",
            artist:"beatles",
            attribute: "tempo",
        },
        left: null,
        right: null,
    },
    right: null,
},
};

var O_song = {
    song:"I wanna hold your hand",
    artist:"beatles",
    attribute: "tempo",}

var O_song2 = {
    song:"gfah",
    artist:"beatles",
    attribute: "tempo",}

var new_song = {
    song:"Yellow submarine",
    artist:"beatles",
    attribute: "tempo",}
console.log('%o',to_list(t,1));
console.log('%o',find_song('fghjk', t));
console.log('%o',to_list(set_song(new_song, t, O_song),1));
change_attribute("crazy", t, new_song);
console.log('%o',t);
