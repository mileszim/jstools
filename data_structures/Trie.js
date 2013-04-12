var JSTools = JSTools || {}; // in case of single file inclusion

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