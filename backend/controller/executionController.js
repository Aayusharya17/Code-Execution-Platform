const ExecutionService = require('../services/executionService');

const executionService = new ExecutionService();

const runCode = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileId } = req.params;

    const input = req.body?.input ?? "";
    console.log('Received input:', input);
    console.log(userId,fileId);
    const result = await executionService.run(fileId, userId, input);

    return res.json({ success: true, output: result });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = { runCode };