
const appendToPath = (path, str) => {
  if (path === '/') return path + str
  else return path + '/' + str
}

const enterDirectory = (path, directory) => {
  if (directory === '..') {
    return '/' + path.split('/').slice(0, -1).filter(Boolean).join('/')
  }

  if (directory === '/') {
    return '/'
  }

  return appendToPath(path, directory)
}

const addDirectory = (path, structure, directory) => {
  return {
    ...structure,
    [appendToPath(path, directory)]: '(dir)'
  }
}

const addFile = (path, structure, file, size) => {
  return {
    ...structure,
    [appendToPath(path, file)]: Number(size)
  }
}

const applyCommand = ({ structure, path }) => (command) => {
  if (command.startsWith('$ ls')) {
    return { structure, path }
  }

  if (command.startsWith('$ cd ')) {
    const directory = command.replace('$ cd ', '')
    return { structure, path: enterDirectory(path, directory) }
  }

  if (command.startsWith('dir')) {
    const directory = command.replace('dir ', '')
    return { structure: addDirectory(path, structure, directory), path }
  }

  const [size, file] = command.split(' ')

  return {
    structure: addFile(path, structure, file, size),
    path
  }
}

const traverseFileStructure = (commands) => {
  return commands.split('\n').reduce(({ structure, path }, command) => applyCommand({ structure, path })(command), { structure: {}, path: '/' })
}

const calculateSizeOfDirectory = ({ fileStructure: { structure }, directory }) => {
  return Object.entries(structure).reduce((size, [path, value]) => {
    if ((directory === '/' || (path.startsWith(`${directory}/`))) && Number((value))) {
      return size + value
    } else return size
  }, 0)
}

const findDirectories = ({ fileStructure: { structure } }) => {
  const directories =  Object.entries(structure).reduce((directories, [path, value]) => {
    if (value === '(dir)') {
      return [...directories, path]
    } else return directories
  }, [])
  return directories
}

const findSumOfSizes = (commands, limit = 100000) => {
  const fileStructure = traverseFileStructure(commands)
  const directories = findDirectories({ fileStructure })

  return directories.reduce((totalSize, directory) => {
    const size = calculateSizeOfDirectory({ fileStructure, directory })
    return (size > 0 && size <= limit) ? totalSize + size :totalSize
  }, 0)
}

const DISK_SPACE = 70000000
const UPDATE_SPACE = 30000000

const findSpaceNeeded = ({ structure }) => {
  const occupiedSpace = Object.entries(structure).reduce((size, [, value]) => (Number(value)) ? value + size : size, 0)
  const availableSpace = DISK_SPACE - occupiedSpace
  return UPDATE_SPACE - availableSpace
}

const identifyDirectoryToDelete = (commands) => {
  const fileStructure = traverseFileStructure(commands)
  const spaceNeeded = findSpaceNeeded(fileStructure)
  const directories = findDirectories({ fileStructure })
  const dirsAndSizes = directories.map((directory) => ({ directory, size: calculateSizeOfDirectory({ fileStructure, directory }) }))
  return dirsAndSizes.sort((a, b) => a.size - b.size).find((dir) => dir.size > spaceNeeded).size
}

module.exports = {
  traverseFileStructure,
  calculateSizeOfDirectory,
  findDirectories,
  findSumOfSizes,
  identifyDirectoryToDelete
}