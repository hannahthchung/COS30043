const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

/* ---------- Name Test Component ---------- */
const NameTest = {
  data() {
    return {
      strName: '',
      myName: 'han thanh'
    };
  },
  template: `
    <div class="card shadow-sm p-4">
      <h3 class="mb-3">Name Test</h3>
      <div class="mb-3">
        <label class="form-label">Enter your name:</label>
        <input type="text" class="form-control" v-model="strName" placeholder="Type your name">
      </div>
      <div v-if="strName" class="mt-3">
        <div v-if="strName.toLowerCase() === myName.toLowerCase()" class="alert alert-success">
          Awesome name!
        </div>
        <div v-else class="alert alert-warning">
          {{ strName }} is not my name!
        </div>
      </div>
    </div>
  `
};

/* ---------- Post Management Component ---------- */
const PostManagement = {
  data() {
    return {
      statPosts: [],
      strStatus: ''
    };
  },
  methods: {
    add(status) {
      if (status && status.trim() !== "") {
        this.statPosts.unshift(status.trim());
        this.strStatus = "";
      }
    },
    remove(index) {
      this.statPosts.splice(index, 1);
    }
  },
  template: `
    <div class="card shadow-sm p-4">
      <h3 class="mb-3">Post Management</h3>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="strStatus" placeholder="What's on your mind?" @keyup.enter="add(strStatus)">
        <button class="btn btn-primary" @click="add(strStatus)">Post</button>
      </div>
      <div v-if="statPosts.length > 0">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(status, index) in statPosts" :key="index">
            {{ status }}
            <button class="btn btn-sm btn-danger" @click="remove(index)">Del</button>
          </li>
        </ul>
      </div>
      <div v-else class="text-muted">
        No status updates yet.
      </div>
    </div>
  `
};

/* ---------- Student Marks Component ---------- */
const StudentMarks = {
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      studMarks: [
        { name: "Amy", mark: 90 }, { name: "Bill", mark: 80 }, { name: "Casey", mark: 78 },
        { name: "David", mark: 84 }, { name: "Ella", mark: 92 }, { name: "Frank", mark: 75 },
        { name: "Grace", mark: 88 }, { name: "Hannah", mark: 85 }, { name: "Ivan", mark: 76 },
        { name: "Jack", mark: 79 }, { name: "Kelly", mark: 91 }, { name: "Liam", mark: 83 },
        { name: "Mona", mark: 87 }, { name: "Nina", mark: 89 }, { name: "Oscar", mark: 82 },
        { name: "Pam", mark: 86 }, { name: "Quincy", mark: 90 }, { name: "Rachel", mark: 84 },
        { name: "Steve", mark: 88 }, { name: "Tina", mark: 77 }, { name: "Uma", mark: 93 },
        { name: "Victor", mark: 74 }, { name: "Wendy", mark: 81 }, { name: "Xander", mark: 78 },
        { name: "Yara", mark: 86 }, { name: "Zane", mark: 80 }
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
  },
  template: `
    <div class="card shadow-sm p-4">
      <h3 class="mb-3">Student Marks</h3>
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in paginatedData" :key="index">
            <td>{{ student.name }}</td>
            <td><span class="badge bg-secondary">{{ student.mark }}</span></td>
          </tr>
        </tbody>
      </table>

      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Prev</a>
          </li>
          <li v-for="page in pageCount" :key="page" :class="{ active: currentPage === page }" class="page-item">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === pageCount }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  `
};

/* ---------- Router ---------- */
const routes = [
  { path: '/', component: NameTest },
  { path: '/posts', component: PostManagement },
  { path: '/marks', component: StudentMarks }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});


createApp({}).use(router).mount('#app');
