const sendMessage = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

export { sendMessage };
