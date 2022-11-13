//Common libraries

const wrapWithTryCatch = async (response, fn) => {
    try {
      response.json(await fn());
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
};

module.exports = {
    wrapWithTryCatch,
};