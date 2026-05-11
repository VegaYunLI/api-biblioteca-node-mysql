export function notFoundHandler(req, res) {
  res.status(404).json({
    message: 'Rota não encontrada'
  });
}
