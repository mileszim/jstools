JavaScript Tools
================

JSTools is a collection of tools and data structures I'm writing when I'm bored or as needed. It's also an attempt to get more comfortable with JS best-practices and code conventions.

Data Structures
---------------

### Binary Search Tree
This is a very basic binary search tree. You can use it as follows.

	// initialize
	var bst = new JSTools.BinarySearchTree();
	
	// inserting
	bst.insert(5);
	bst.insert(10);
	bst.insert(3);
	
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

You can't currently delete but that's coming soon. The structure of this library is going to change drastically soon so I don't recommend using it yet.