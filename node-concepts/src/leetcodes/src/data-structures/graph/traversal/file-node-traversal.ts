/**
 * File System Navigation
 * - Problem: Navigating through a file system, where directories are nodes, and subdirectories/files are child nodes.
 * - Solution: Pre-order traversal can be used to visit each directory before its subdirectories, which is useful for tasks like copying an entire directory structure.
 */
class FileNode {
	name: string;
	children: FileNode[] = [];

	constructor(name: string) {
		this.name = name;
	}
}

const rootFile = new FileNode('root');
const home = new FileNode('home');
const user = new FileNode('user');
const docs = new FileNode('docs');
const photos = new FileNode('photos');
const photo1 = new FileNode('photo1.jpg');
const photo2 = new FileNode('photo2.jpg');

rootFile.children.push(home);
home.children.push(user);
user.children.push(docs, photos);
photos.children.push(photo1, photo2);

/** Print File System */
function printFileSystem(node: FileNode, indent = 0): void {
	console.log(' '.repeat(indent) + node.name);
	for (const child of node.children) {
		printFileSystem(child, indent + 2);
	}
}
printFileSystem(rootFile);
