exports.get = {
  auth: 'jwt',
  handler: (req, res) => res({ response: 'Hi there, friend! 👋' }),
};
