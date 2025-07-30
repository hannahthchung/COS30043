var units = [
  { 
    code: "ICT10001", 
    name: "Problem Solving with ICT", 
    creditPoints: 12.5, 
    type: "Core"
  },
  { 
    code: "COS10005", 
    name: "Web Development", 
    creditPoints: 12.5, 
    type: "Core" 
  },
  { 
    code: "INF10003", 
    name: "Introduction to Business Information Systems", 
    creditPoints: 12.5, 
    type: "Core" 
  },
  { 
    code: "INF10002", 
    name: "Database Analysis and Design", 
    creditPoints: 12.5, 
    type: "Core"
  },
  { 
    code: "COS10009", 
    name: "Introduction to Programming", 
    creditPoints: 12.5, 
    type: "Core" 
  },
  { 
    code: "INF30029", 
    name: "Information Technology Project Management", 
    creditPoints: 12.5, 
    type: "Core" 
  },
  { 
    code: "ICT30005", 
    name: "Professional Issues in Information Technology", 
    creditPoints: 12.5, 
    type: "Core" 
  },
  { 
    code: "ICT30001", 
    name: "Information Technology Project", 
    creditPoints: 12.5, 
    type: "Core" 
  },
];

const Unit = {
  data() {
    return { units };
  },
  template: `
    <div>
      <h2>Unit Code: {{ $route.params.id }}</h2>
      <ul v-for="unit in filteredUnits" :key="unit.code">
        <li><strong>Code:</strong> {{ unit.code }}</li>
        <li><strong>Name:</strong> {{ unit.name }}</li>
        <li><strong>Credit Points:</strong> {{ unit.creditPoints }}</li>
        <li><strong>Type:</strong> {{ unit.type }}</li>
      </ul>
    </div>
  `,
  computed: {
    filteredUnits() {
      return this.units.filter(unit =>
        unit.code.toLowerCase().includes(this.$route.params.id.toLowerCase())
      );
    },
  },
};

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/unit/:id",
      component: Unit,
    },
  ],
});

const app = Vue.createApp({});

app.component("app-lookup2", {
  data() {
    return { units };
  },
  template: `
    <div class="col-lg-12">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>More Information</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in units" :key="unit.code">
              <td>{{ unit.code }}</td>
              <td>{{ unit.name }}</td>
              <td><router-link :to="'/unit/' + unit.code">Read More</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-12 mt-4">
        <router-view></router-view>
      </div>
    </div>
  `
});

app.use(router);
app.mount("#app");
