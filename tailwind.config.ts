interface AddVariation {
  addVariant: any;
}

module.exports = {
  plugins: [
    function (payload: AddVariation) {
      payload.addVariant('initial', 'html :where(&)');
    },
  ],
};
