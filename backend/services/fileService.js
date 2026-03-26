const FileRepository = require('../repositories/fileRepository');

class FileService {
  constructor() {
    this.fileRepository = new FileRepository();
  }

  async createFile({ name, content, projectId,language, userId }) {
    if (!name || !projectId) {
      const err = new Error('File name and projectId required');
      err.statusCode = 400;
      throw err;
    }

    return await this.fileRepository.createFile(
      name,
      content,
      projectId,
      userId,
      language
    );
  }

  async getFile({ fileId, userId }) {
    if (!fileId) {
      const err = new Error('File ID required');
      err.statusCode = 400;
      throw err;
    }

    return await this.fileRepository.getFile(fileId, userId);
  }

  async updateFile({ fileId, content, userId }) {
    return await this.fileRepository.updateFile(fileId, content, userId);
  }

  async deleteFile({ fileId, userId }) {
    return await this.fileRepository.deleteFile(fileId, userId);
  }
}

module.exports = FileService;