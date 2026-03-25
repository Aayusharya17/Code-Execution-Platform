const ProjectRepository = require('../repositories/projectRepository');

class ProjectService {
  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async createProject({ name, userId }) {
    if (!name) {
      const err = new Error('Project name is required');
      err.statusCode = 400;
      throw err;
    }

    return await this.projectRepository.createProject(name, userId);
  }

  async getAllFiles({ projectId, userId }) {
    if (!projectId) {
      const err = new Error('Project ID is required');
      err.statusCode = 400;
      throw err;
    }

    return await this.projectRepository.getAllFiles(projectId, userId);
  }
}

module.exports = ProjectService;