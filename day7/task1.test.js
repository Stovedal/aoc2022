const { traverseFileStructure, calculateSizeOfDirectory, findDirectories, findSumOfSizes, identifyDirectoryToDelete } = require("./task1")

const newLine = "\n"

describe('Given "$cd /" command when traversing file structure', () => {
  const commands = '$ cd /'
  test('then a file structure with no content is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({})
  })
  test('then an empty path is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({})
  })
})


describe('Given "$cd /" command when traversing file structure', () => {
  const commands = '$ ls'
  test('then a file structure with no content is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({})
  })
  test('then an empty path is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/')
  })
})

describe('Given "$ ls dir a" command when traversing file strucuture', () => {
  const commands = ['$ ls', 'dir a'].join(newLine)
  test('then a file structure with no content is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)' })
  })
  test('then a path with a directory is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/')
  })
})

describe('Given command of a dir with a file when traversing file structure', () => {
  const commands = ['$ ls', 'dir a', '14848514 b.txt'].join(newLine)
  test('then a file structure with a directory containing the file is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/b.txt']: 14848514 })
  })
  test('then a path with the directory and the file is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/')
  })
})

describe('Given command of entering a dir with a file when traversing file structure', () => {
  const commands = ['$ ls', 'dir a', '$ cd a', '$ ls', '14848514 b.txt'].join(newLine)
  test('then a file structure with a directory containing a file is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/a/b.txt']: 14848514 })
  })
  test('then a file with with a directory containing a file is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/a')
  })
})

describe('Given command of entering a dir with a file and the backing once when traversing file structure', () => {
  const commands = ['$ ls', 'dir a', '$ cd a', '$ ls', '14848514 b.txt', '$ cd ..'].join(newLine)
  test('then a file structure with a directory containing a file is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/a/b.txt']: 14848514 })
  })
  test('then a file path pointing to root is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/')
  })
})

describe('Given command of entering two nested directories, when traversing a file structure', () => {
  const commands = ['$ ls', 'dir a', '$ cd a', '$ ls', 'dir b', '$ cd b'].join(newLine)
  test('then a file structure with a directory containing both directories is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/a/b']: '(dir)' })
  })
  test('then a file path pointing to the nested directory is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/a/b')
  })
})

describe('Given command of entering three nested directories and backing once, when traversing a file structure', () => {
  const commands = ['$ ls', 'dir a', '$ cd a', '$ ls', 'dir b', '$ cd b', '$ ls', 'dir c', '$ cd c', '$ cd ..'].join(newLine)
  test('then a file structure with a directory containing both directories is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/a/b']: '(dir)', ['/a/b/c']: '(dir)' })
  })
  test('then a file path pointing to the nested directory is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/a/b')
  })
})

describe('Given command of entering two nested directories, and then returning to root, when traversing a file structure', () => {
  const commands = ['$ ls', 'dir a', '$ cd a', '$ ls', 'dir b', '$ cd b', '$ cd /'].join(newLine)
  test('then a file structure with a directory containing both directories is returned', () => {
    expect(traverseFileStructure(commands).structure).toEqual({ ['/a']: '(dir)', ['/a/b']: '(dir)' })
  })
  test('then a file path pointing to root is returned', () => {
    expect(traverseFileStructure(commands).path).toEqual('/')
  })
})


const fileStructure = {
  structure: {
    '/a': '(dir)',
    '/b.txt': 14848514,
    '/c.dat': 8504156,
    '/d': '(dir)',
    '/a/e': '(dir)',
    '/a/f': 29116,
    '/a/g': 2557,
    '/a/h.lst': 62596,
    '/a/e/i': 584,
    '/d/j': 4060174,
    '/d/d.log': 8033020,
    '/d/d.ext': 5626152,
    '/d/k': 7214296
  },
  path: '/'
}

describe('Given filestructure and directory, when calculating size of directory', () => {
  test('then the size of a directory containing a single file is returned', () => {
    expect(calculateSizeOfDirectory({ fileStructure, directory: '/a/e' })).toEqual(584)
  })
  test('then the size of a directory containing multiple files is returned', () => {
    expect(calculateSizeOfDirectory({ fileStructure, directory: '/a' })).toEqual(94853)
  })
  test('then the size of a directory containing multiple files with similar names is returned', () => {
    expect(calculateSizeOfDirectory({ fileStructure, directory: '/d' })).toEqual(24933642)
  })
  // test('then the size of a the root directory is returned', () => {
  //   expect(calculateSizeOfDirectory({ fileStructure, directory: '/' })).toEqual(48381165)
  // })
})

describe('Given filestructure when finding directories', () => {
  test('then all contained directories are returned', () => {
    expect(findDirectories({ fileStructure })).toEqual(['/a', '/d', '/a/e'])
  })
})

const fileCommands = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe('Given commands, when summarizing the largest directories sizes', () => {
  test('then the sum of the directories under limit size, sizes are returned', () => {
    expect(findSumOfSizes(fileCommands)).toEqual(95437)
  })
})

describe('Given commands, a directory that it just small enough to allow an update can be found', () => {
  test('Given commands, a file system is built and the directory to delete is returned', () => {
    expect(identifyDirectoryToDelete(fileCommands)).toEqual(24933642)
  })
})