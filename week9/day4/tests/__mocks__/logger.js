it('should log error on failed login', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  User.findOne.mockImplementation(() => {
    throw new Error('DB Error');
  });

  await controller.login(req, res);

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Login error:'));
  consoleSpy.mockRestore();
});
