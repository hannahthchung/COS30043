// Home Component
const Home = {
  template: `
    <div>
      <h2>Welcome</h2>
      <input v-model="firstName" placeholder="First Name" class="form-control mb-2">
      <input v-model="lastName" placeholder="Last Name" class="form-control mb-2">
      <p class="fw-bold">Welcome, {{ fullName }}</p>

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="mountain" v-model="imageType">
        <label class="form-check-label">Mountain</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="ocean" v-model="imageType">
        <label class="form-check-label">Ocean</label>
      </div>

      <div v-if="imageType" class="mt-3">
        <img :src="imageURL" alt="Selected View" class="img-fluid rounded" style="max-width: 400px;">
      </div>
    </div>
  `,
  data() {
    return {
      firstName: '',
      lastName: '',
      imageType: ''
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`.trim();
    },
    imageURL() {
      return this.imageType === 'mountain'
        ? 'img/mountains.jpg'
        : 'img/ocean.jpg';
    }
  }
};

// Tasks Component (from 5.1P)
const Tasks = {
  template: `
    <div>
      <h2>Status Post</h2>
      <div class="input-group mb-3">
        <input v-model="strStatus" class="form-control" placeholder="Enter status..." @keyup.enter="add(strStatus)">
        <button class="btn btn-primary" @click="add(strStatus)">Post</button>
      </div>
      <div v-if="statPosts.length > 0">
        <ul class="list-group">
          <li v-for="(status, index) in statPosts" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ status }}
            <button class="btn btn-sm btn-danger" @click="remove(index)">Del</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No status updates yet.</p>
      </div>
    </div>
  `,
  data() {
    return {
      statPosts: [],
      strStatus: ''
    };
  },
  methods: {
    add(status) {
      if (status.trim()) {
        this.statPosts.unshift(status.trim());
        this.strStatus = '';
      }
    },
    remove(index) {
      this.statPosts.splice(index, 1);
    }
  }
};

// Units Component (load units.json)
const Units = {
  template: `
    <div>
      <h2>Units</h2>
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Credit Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in units" :key="unit.code">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  data() {
    return {
      units: []
    };
  },
  mounted() {
    fetch('units.json')
      .then(response => response.json())
      .then(data => {
        this.units = data;
      });
  }
};

// Router Setup
const routes = [
  { path: '/', component: Home },
  { path: '/tasks', component: Tasks },
  { path: '/units', component: Units }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({});
app.use(router);
app.mount('#app');
