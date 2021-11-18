export const server = {
  on(_, cb) {
    this.connectionCb = cb;
  },
  connectionCb: undefined,
};
