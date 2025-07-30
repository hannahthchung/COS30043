const { createApp } = Vue;

createApp({
  data() {
    return {
      guess: 0,
      secret: this.genRandomNum(),
      message: "Start guessing.", 
      attempts: 0
    };
  },
  methods: {
    genRandomNum() {
      return Math.floor(Math.random() * 100) + 1;
    },
    checkGuess() {
      this.attempts++;
      if (this.guess === this.secret) {
        this.message = "You got it!";
      } else if (this.guess > this.secret) {
        this.message = "Guess lower.";
      } else {
        this.message = "Guess higher.";
      }
    },
    giveUp() {
      this.message = "The number was " + this.secret + ".";
    },
    startOver() {
      this.secret = this.genRandomNum();
      this.guess = 0;
      this.message = "Start guessing.";
      this.attempts = 0;
    }
  }
}).mount("#app");


