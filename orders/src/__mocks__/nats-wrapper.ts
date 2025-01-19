export const natsWrapper = {
  client: {
    publish: jest
      // .setTimeout(500000)
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
