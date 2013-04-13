/**
 * JSTools
 * Miles Zimmerman
 * @constructor
 */
var JSTools = JSTools || {};



/**
 * JSTools Binary Search Tree.
 * Miles Zimmerman
 * @constructor
 */
JSTools.BinarySearchTree = function() {
    if (!(this instanceof JSTools.BinarySearchTree)) return new JSTools.BinarySearchTree();
    
    this.master_node = null;
    this._size = 0;
}

JSTools.BinarySearchTree.prototype = {

    /**
     * Inserts a node into the tree.
     * @param {number} data The value being inserted
     */
    insert: function(data) {
        var new_node = {
            left_node: null,
            right_node: null,
            data: data
        };
        if (this.master_node instanceof Object) {
            var current_node = this.master_node;
            var parent_node = null;
            while (true) {
                parent_node = current_node;
                if (data < current_node.data) {
                    current_node = current_node.left_node;
                    if (current_node === null) {
                        parent_node.left_node = new_node;
                        break;
                    }
                } else {
                    current_node = current_node.right_node;
                    if (current_node === null) {
                        parent_node.right_node = new_node;
                        break;
                    }
                }
            }
        } else {
            this.master_node = new_node;
        }
        this._size++;
    },



    /**
     * Test if a value is within the tree.
     * @param {number} data The value to check.
     * @return {boolean} True if found, false is not
     */
    find: function(data) {
        if (this.master_node instanceof Object) {
            var current_node = this.master_node;
            while (true) {
                if (current_node.data === data) {
                    return true;
                } else {
                    if (data < current_node.data) {
                        current_node = current_node.left_node;
                    } else {
                        current_node = current_node.right_node;
                    }
                    if (current_node === null) {
                        return false;
                    }
                }
            }
        }
        return false;
    },



    /**
     * Get the largest value in the tree
     * @return {(number|null)} The largest number found, or null if tree is empty.
     */
    getMax: function() {
        if (this.master_node instanceof Object) {
            var current_node = this.master_node;
            while (current_node.right_node instanceof Object) {
                current_node = current_node.right_node;
            }
            return current_node.data;
        }
        return null;
    },



    /**
     * Get the smallest value in the tree
     * @return {(number|null)} Smallest number found, null if tree is empty
     */
    getMin: function() {
        if (this.master_node instanceof Object) {
            var current_node = this.master_node;
            while (current_node.left_node instanceof Object) {
                current_node = current_node.left_node;
            }
            return current_node.data;
        }
        return null;
    },



    /**
     * Returns a sorted array of the numbers from least to greatest
     * @return {Array.<number>} The array of sorted numbers
     */
    getSortedArray: function() {
        return this.recursiveSort(this.master_node);
    },



    /**
     * Recursively sorts the numbers in the tree, used in getSortedArray function
     * @param {Object} node The node to start recursing from
     * @return {(Array.<number>|undefined)} Returns the array of numbers if found, or undefined if no child
     */
    recursiveSort: function(node) {
        if (node instanceof Object) {
            var node_array = [];
            var left_array = this.recursiveSort(node.left_node);
            var right_array = this.recursiveSort(node.right_node);
            if (left_array) {
                node_array = node_array.concat(left_array);
            }
            node_array.push(node.data);
            if (right_array) {
                node_array = node_array.concat(right_array);
            }
            return node_array;
        }
        return undefined;
    },



    /**
     * Returns the size of the tree
     * @return {number} The size of the tree
     */
    size: function() {
        return this._size;
    },
    
    
    
    /**
     * Delete a node from the tree
     * @param {number} data The data to delete
     * @return {boolean} True if successful, false if unsuccessful (Node doesn't exist)
     */
    remove: function(data) {
        if (!data || this.size()===0) return false;
        if (this.size()===1 && this.master_node.data===data) {
            this.master_node = null;
            this._size--;
            return true;
        }
        
        var current_node = this.master_node;
        var parent_node  = this.master_node;
        
        while(true) {
            if (current_node.data === data) break; // found the node
            if (!current_node.right_node && !current_node.left_node) return false; //no node in tree
            parent_node = current_node;
            if (data < current_node.data) current_node = current_node.left_node;
            if (data > current_node.data) current_node = current_node.right_node;
        }
        
        if (!current_node.left_node && !current_node.right_node) {
            if (current_node === parent_node.right_node) {
                console.log('test');
                parent_node.right_node = null;
            }
            if (current_node === parent_node.left_node) parent_node.left_node = null;
            this._size--;
            return true;
        }
        
        if (current_node.left_node && !current_node.right_node) {
            if (current_node === parent_node.left_node) {
                parent_node.left_node = current_node.left_node;
            } else
            if (current_node === parent_node.right_node) {
                parent_node.right_node = current_node.left_node;
            }
            this._size--;
            return true;
        }
        
        if (!current_node.left_node && current_node.right_node) {
            if (current_node === parent_node.left_node) {
                parent_node.left_node = current_node.right_node;
            } else
            if (current_node === parent_node.right_node) {
                parent_node.right_node = current_node.right_node;
            }
            this._size--;
            return true;
        }
        
        if (current_node.left_node && current_node.right_node) {
            var replace_data;
            var replace_parent;
            
            // add balance: 0 = left replace, 1 = right replace
            if ((Math.floor(Math.random()*11) % 2) == 0) {
                replace_node = current_node.left_node;
                replace_parent = current_node.left_node;
                while (replace_node.right_node) {
                    replace_parent = replace_node;
                    replace_node = replace_node.right_node;
                }
                var replace_data = replace_node.data;
                replace_parent.right_node = null;
                current_node.data = replace_data;
            } else {
                replace_node = current_node.right_node;
                replace_parent = current_node.right_node;
                while (replace_node.left_node) {
                    replace_parent = replace_node;
                    replace_node = replace_node.left_node;
                }
                var replace_data = replace_node.data;
                replace_parent.left_node = null;
                
            }
            current_node.data = replace_data;
            this._size--;
            return true;
        }
        
        return false;
    }
};



/**
 * JSTools Trie
 * Miles Zimmerman
 * @param {String} initial_data Some initial data to load into the trie, default nil
 * @param {String} separator The string separating each word in the content, default " "
 * @constructor
 */
JSTools.Trie = function(initial_data, separator) {
    if (!(this instanceof JSTools.Trie)) return new JSTools.Trie(initial_data, separator);
    
    this.master_node = {};
    this._size       = 0;
    this.separator   = " ";
    
    if (separator instanceof String)    this.separator = separator; // set separator from constructor
    if (initial_data instanceof String) this.insertContent(initial_data);  // just use the insert function
}

JSTools.Trie.prototype = {
    
    /**
     * Inserts a string of words into the trie
     * @param {String} content The content to insert.
     */
    insertContent: function(content) {
        if (!(typeof content === 'string'))
            throw new Error('Invalid Content Stype: must be String');
            
        var split_content = content.split(this.separator);
        for (var word in split_content) {
            this.insertWord(split_content[word]);
        }
    },
    
    
    /**
     * Insert a single word into the trie
     * @param {String} word The word to insert
     */
    insertWord: function(word) {
        if (!(typeof word === 'string'))
            throw new Error('Invalid Content Stype: must be String');
            
        var chars = word.split("");
        var current_letter = chars.shift();
        var current_node   = this.master_node;
                
        while (current_node[current_letter]) {
            current_node   = current_node[current_letter];
            current_letter = chars.shift();
        }
        chars.unshift(current_letter);
        for (var letter in chars) {
            current_node[chars[letter]] = {};
            current_node = current_node[chars[letter]];
            this._size++;
        }
    },
    
    
    /**
     * Check if word is in the trie
     * @param {String} word The word to find
     * @return {boolean} True if word in tree, false if not
     */
    contains: function(word) {
        var chars = word.split("");
        var current_node = this.master_node;
        
        for (var letter in chars) {
            if (!current_node[chars[letter]]) {
                return false;
            } else {
                current_node = current_node[chars[letter]];
            }
        }
        return true;
    },
    
    
    /**
     * Return the number of nodes in the trie
     * @return {number} The number of nodes
     */
    size: function() {
        return this._size;
    }
    
};