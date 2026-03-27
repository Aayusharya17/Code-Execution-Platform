const FileService = require('../services/fileService');

const fileService = new FileService();

const createFile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;
    const { name, content } = req.body;
     language = name.split('.').pop(0).toLowerCase(); 

     if(language === 'c++') language = 'cpp';


    const file = await fileService.createFile({
      name,
      content,
      projectId,
      language,
      userId
    });

    return res.status(201).json({
      data: file,
      success: true,
      message: 'File created successfully',
      err: {}
    });

  } catch (e) {
    console.error('[CREATE FILE ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

const getFile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileId } = req.params;

    const file = await fileService.getFile({ fileId, userId });

    return res.status(200).json({
      data: file,
      success: true,
      message: 'File fetched successfully',
      err: {}
    });

  } catch (e) {
    console.error('[GET FILE ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

const updateFile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileId } = req.params;
    const { content } = req.body;

    const file = await fileService.updateFile({
      fileId,
      content,
      userId
    });

    return res.status(200).json({
      data: file,
      success: true,
      message: 'File updated successfully',
      err: {}
    });

  } catch (e) {
    console.error('[UPDATE FILE ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileId } = req.params;

    await fileService.deleteFile({ fileId, userId });

    return res.status(200).json({
      data: {},
      success: true,
      message: 'File deleted successfully',
      err: {}
    });

  } catch (e) {
    console.error('[DELETE FILE ERROR]', e.message);

    return res.status(e.statusCode || 500).json({
      data: {},
      success: false,
      message: e.message,
      err: e.message
    });
  }
};

module.exports = {
  createFile,
  getFile,
  updateFile,
  deleteFile
};