// jest-setup.js
jest.mock('@expo/vector-icons', () => {
  const MockIcon = () => null;
  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    Feather: MockIcon,
  };
});