const File = require('../models/File');
const Project = require('../models/Project');

class FileRepository {

  async createFile(name, content, projectId, userId,language) {
    try {
      const project = await Project.findById(projectId);
      console.log(project);

      if (!project) {
        throw new Error('Project not found');
      }

      if (project.user.toString() !== userId) {
        const err = new Error('Unauthorized');
        err.statusCode = 403;
        throw err;
      }

      const file = await File.create({
        name,
        content,
        language,
        project: projectId
      });

      return file;

    } catch (e) {
      throw new Error('Error creating file: ' + e.message);
    }
  }

  async getFile(fileId, userId) {
    try {
      const file = await File.findById(fileId).populate('project');

      if (!file) {
        throw new Error('File not found');
      }

      if (file.project.user.toString() !== userId) {
        const err = new Error('Unauthorized');
        err.statusCode = 403;
        throw err;
      }

      return file;

    } catch (e) {
      throw new Error('Error fetching file: ' + e.message);
    }
  }

  async updateFile(fileId, content, userId) {
    try {
      const file = await File.findById(fileId).populate('project');

      if (!file) {
        throw new Error('File not found');
      }

      if (file.project.user.toString() !== userId) {
        const err = new Error('Unauthorized');
        err.statusCode = 403;
        throw err;
      }

      file.content = content;
      await file.save();

      return file;

    } catch (e) {
      throw new Error('Error updating file: ' + e.message);
    }
  }

  async deleteFile(fileId, userId) {
    try {
      const file = await File.findById(fileId).populate('project');

      if (!file) {
        throw new Error('File not found');
      }

      if (file.project.user.toString() !== userId) {
        const err = new Error('Unauthorized');
        err.statusCode = 403;
        throw err;
      }

      await File.findByIdAndDelete(fileId);

    } catch (e) {
      throw new Error('Error deleting file: ' + e.message);
    }
  }
}

module.exports = FileRepository;