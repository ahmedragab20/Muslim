interface AddVariation {
  addVariant: any;
}

module.exports = {
  theme: {
    fontFamily: {
      headline: ['Headland One', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [
    function (payload: AddVariation) {
      payload.addVariant('initial', 'html :where(&)');
    },
  ],
};
