interface AddVariation {
  addVariant: any;
}

module.exports = {
  theme: {},
  plugins: [
    function (payload: AddVariation) {
      payload.addVariant('initial', 'html :where(&)');
    },
  ],
};
