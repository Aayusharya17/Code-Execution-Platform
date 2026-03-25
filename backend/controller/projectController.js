const ProjectService = require('../services/projectService');

const projectService = new ProjectService();

const createProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    const project = await projectService.createProject({ name, userId });

    return res.status(201).json({
      data: project,
      success: true,
      message: 'Project created successfully',
      err: {}
    });

  } catch (e) {
    console.error('[CREATE PROJECT ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { projectId } = req.params;

    const files = await projectService.getAllFiles({ projectId, userId });

    return res.status(200).json({
      data: files,
      success: true,
      message: 'Files fetched successfully',
      err: {}
    });

  } catch (e) {
    console.error('[GET FILES ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

module.exports = {
  createProject,
  getAllFiles
};