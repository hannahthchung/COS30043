const { createApp } = Vue;

createApp({
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      studMarks: [
        { name: "Amy", mark: 90 },
        { name: "Bill", mark: 80 },
        { name: "Casey", mark: 78 },
        { name: "David", mark: 84 },
        { name: "Ella", mark: 92 },
        { name: "Frank", mark: 75 },
        { name: "Grace", mark: 88 },
        { name: "Hannah", mark: 85 },
        { name: "Ivan", mark: 76 },
        { name: "Jack", mark: 79 },
        { name: "Kelly", mark: 91 },
        { name: "Liam", mark: 83 },
        { name: "Mona", mark: 87 },
        { name: "Nina", mark: 89 },
        { name: "Oscar", mark: 82 },
        { name: "Pam", mark: 86 },
        { name: "Quincy", mark: 90 },
        { name: "Rachel", mark: 84 },
        { name: "Steve", mark: 88 },
        { name: "Tina", mark: 77 },
        { name: "Uma", mark: 93 },
        { name: "Victor", mark: 74 },
        { name: "Wendy", mark: 81 },
        { name: "Xander", mark: 78 },
        { name: "Yara", mark: 86 },
        { name: "Zane", mark: 80 }
      ]
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.studMarks.length / this.perPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.studMarks.slice(start, start + this.perPage);
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
      }
    }
  }
}).mount('#app');
