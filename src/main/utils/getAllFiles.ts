import { promises as fs } from 'fs';

export async function getAllFiles(path: string) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory() && !/^\..*/.test(file.name))
    .map((file) => ({ ...file, path: `${path}${file.name}` }));

  // Get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory());

  /*
        Add the found files within the subdirectory to the files array by calling the
        current function itself
      */
  const folderFilesPromise: Promise<any>[] = [];

  folders.forEach((folder) => {
    folderFilesPromise.push(getAllFiles(`${path}${folder.name}/`));
  });

  const foldersFiles = await Promise.all(folderFilesPromise);

  foldersFiles.forEach((folderFiles) => files.push(...folderFiles));

  return files;
}
