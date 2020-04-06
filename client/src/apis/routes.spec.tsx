import { getIPInfo } from './routes';

jest.mock('axios');

describe('API Routes', () => {
  const axios = jest.fn();

  it('successfully gets data from an API', async () => {
    const data = "www.google.com";

    axios.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getIPInfo('react')).resolves.toEqual(data);
  });
});