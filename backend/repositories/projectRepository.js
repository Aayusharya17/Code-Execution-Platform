const Project = require('../models/Project');
const File = require('../models/File');

class ProjectRepository {

  async createProject(name, userId) {
    try {
      const project = await Project.create({
        name,
        user: userId
      });

      return project;

    } catch (e) {
      throw new Error('Error creating project: ' + e.message);
    }
  }

  async getAllFiles(projectId, userId) {
    try {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      if (project.user.toString() !== userId) {
        const err = new Error('Unauthorized access');
        err.statusCode = 403;
        throw err;
      }

      const files = await File.find({ project: projectId });

      return files;

    } catch (e) {
      throw new Error('Error fetching files: ' + e.message);
    }
  }
}

module.exports = ProjectRepository;