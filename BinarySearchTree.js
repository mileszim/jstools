/**
 * A simple JavaScript binary search tree implementation.
 * Miles Zimmerman
 * @constructor
 */
BinarySearchTree = function() {
    this.master_node = null;
    this._size = 0;
}


/**
 * Inserts a node into the tree.
 * @param {number} data The value being inserted
 */
BinarySearchTree.prototype.insert = function(data) {
    var new_node = {                            // make the new node
        left_node: null,
        right_node: null,
        data: data
    };
    if (this.master_node instanceof Object) { // master_node exists
        var current_node = this.master_node;
        var parent_node  = null;
        while (true) {
            parent_node = current_node;
            if (data < current_node.data) {
                current_node = current_node.left_node;
                if (current_node===null) {
                    parent_node.left_node = new_node;
                    break;
                }
            } else {
                current_node = current_node.right_node;
                if (current_node===null) {
                    parent_node.right_node = new_node;
                    break;
                }
            }
        }
    } else {                                                                    // master_node is null
        this.master_node = new_node;
    }
    this.size++;
}


/**
 * Test if a value is within the tree.
 * @param {number} data The value to check.
 * @return {boolean} True if found, false is not
 */
BinarySearchTree.prototype.find = function(data) {
    if (this.master_node instanceof Object) {    // master_node exists
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
    
    return false;                                 // master_node is null
}


/**
 * Get the largest value in the tree
 * @return {(number|null)} The largest number found, or null if tree is empty.
 */
BinarySearchTree.prototype.getMax = function() {
    if (this.master_node instanceof Object) {
        var current_node = this.master_node;
        while (current_node.right_node instanceof Object) {
            current_node = current_node.right_node;
        }
        return current_node.data;
    }
    return null;
}


/**
 * Get the smallest value in the tree
 * @return {(number|null)} Smallest number found, null if tree is empty
 */
BinarySearchTree.prototype.getMin = function() {
    if (this.master_node instanceof Object) {
        var current_node = this.master_node;
        while (current_node.left_node instanceof Object) {
            current_node = current_node.left_node;
        }
        return current_node.data;
    }
    return null;
}


/**
 * Returns a sorted array of the numbers from least to greatest
 * @return {Array.<number>} The array of sorted numbers
 */
BinarySearchTree.prototype.getSortedArray = function() {
    return this.recursiveSort(this.master_node);
}


/**
 * Recursively sorts the numbers in the tree, used in getSortedArray function
 * @param {Object} node The node to start recursing from
 * @return {(Array.<number>|undefined)} Returns the array of numbers if found, or undefined if no child
 */
BinarySearchTree.prototype.recursiveSort = function(node) {
    if (node instanceof Object) {
        var node_array = [],
        var left_array = this.recursiveSort(node.left_node),
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
}


/**
 * Returns the size of the tree
 * @return {number} The size of the tree
 */
BinarySearchTree.prototype.size = function() {
    return this._size;
}