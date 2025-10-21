Object.defineProperty(window, 'CSS', {
  configurable: true,
  writable: true,
  value: { supports: jest.fn() },
});
