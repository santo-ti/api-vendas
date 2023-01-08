import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const oldPath = path.resolve(uploadConfig.tempFolder, file);
    const newPath = path.resolve(uploadConfig.directory, file);

    await fs.promises.rename(oldPath, newPath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch {
      return;
    }
  }
}
