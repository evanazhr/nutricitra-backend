const response = (res, statusCode, message, data) => {
  const status = parseInt(statusCode) || 500; 

  return res.status(status).json({
    status: statusCode < 400 ? 'success' : 'failed',
    message,
    data
  });
};

export default response;