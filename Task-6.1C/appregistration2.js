const { createApp } = Vue;

createApp({
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        street: '',
        suburb: '',
        postcode: '',
        mobile: ''
      },
      errors: {},
      showTerms: false
    };
  },
  methods: {
    validate() {
      this.errors = {};

      const nameRegex = /^[A-Za-z]+$/;
      const passwordRegex = /[!$%^&*]/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^04\d{8}$/;

      if (!this.form.firstName || !nameRegex.test(this.form.firstName)) {
        this.errors.firstName = 'First name is required and must contain letters only.';
      }

      if (!this.form.lastName || !nameRegex.test(this.form.lastName)) {
        this.errors.lastName = 'Last name is required and must contain letters only.';
      }

      if (!this.form.username || this.form.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters.';
      }

      if (!this.form.password || this.form.password.length < 8 || !passwordRegex.test(this.form.password)) {
        this.errors.password = 'Password must be at least 8 characters and include a special character ($, %, ^, &, *).';
      }

      if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = 'Passwords do not match.';
      }

      if (!this.form.email || !emailRegex.test(this.form.email)) {
        this.errors.email = 'Valid email is required.';
      }

      if (this.form.street && this.form.street.length > 40) {
        this.errors.street = 'Street address must be less than 40 characters.';
      }

      if (this.form.suburb && this.form.suburb.length > 20) {
        this.errors.suburb = 'Suburb must be less than 20 characters.';
      }

      if (!/^\d{4}$/.test(this.form.postcode)) {
        this.errors.postcode = 'Postcode must be exactly 4 digits.';
      }

      if (!mobileRegex.test(this.form.mobile)) {
        this.errors.mobile = 'Mobile number must be 10 digits and start with 04.';
      }

      return Object.keys(this.errors).length === 0;
    },
    submitForm() {
      if (this.validate()) {
        this.$el.querySelector('form').submit();
      }
    },
    toggleTerms() {
      this.showTerms = !this.showTerms;
    }
  }
}).mount('#app');
