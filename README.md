JavaScript Tools
================

JSTools is a collection of tools and data structures I'm writing when I'm bored or as needed. It's also an attempt to get more comfortable with JS best-practices and code conventions.

### Data Structures
* [Binary Search Tree](#binary_search_tree)
* [Trie](#trie)

Data Structures
---------------

<a name="binary_search_tree">
### Binary Search Tree
This is a very basic binary search tree. You can use it as follows.

	// initialize
	var bst = new JSTools.BinarySearchTree();
	
	// inserting
	bst.insert(5);
	bst.insert(10);
	bst.insert(3);
	
	// delete
	bst.remove(10);
	
	// find
	bst.find(3);
	
	// max/min
	bst.getMax();
	bst.getMin();
	
	// return a sorted array
	bst.getSortedArray();
	
I tested the BST find method against an array at worst-case with 10,000,000 random numbers, and it received some pretty decent run times. For example: 

	bst find:   0.249ms
	arr find: 142.056ms


<a name="trie">
### Trie
This is a trie structure for rapidly determining the existence of a word in a block of content.

	// initialize
	var my_content   = "Some long block of text.";
	var my_separator = " ";
	var trie = new JSTools.Trie(my_content, my_separator); //default separator is " "
	
	// or you can do:
	var trie = new JSTools.Trie();
	
	// inserting
	trie.insertContent("More long blocks of text.");
	trie.insertWord("word");
	
	// find
	trie.contains("word");
	
I haven't tested the runtime yet. Will do soon.