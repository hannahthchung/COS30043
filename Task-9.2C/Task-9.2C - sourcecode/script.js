const Login = {
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header text-center">
              <h2>Login</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      username: "",
      password: "",
      error: "",
    }
  },
  methods: {
    handleLogin() {
      // Simple hardcoded credentials for demonstration
      if (this.username === "user" && this.password === "password") {
        localStorage.setItem("isAuthenticated", "true")
        this.$router.push("/dashboard")
      } else {
        this.error = "Invalid username or password."
      }
    },
  },
}

const ViewUnits = {
  components: {
    paginate: VuejsPaginateNext,
  },
  props: ["units"], 
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" id="codeHeader">Code</th>
                <th scope="col" id="descHeader">Description</th>
                <th scope="col" id="cpHeader">Credit Points</th>
                <th scope="col" id="typeHeader">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedUnits.length === 0">
                <td colspan="4" class="text-center">No units available.</td>
              </tr>
              <tr v-for="unit in paginatedUnits" :key="unit.code">
                <td headers="codeHeader">{{ unit.code }}</td>
                <td headers="descHeader">{{ unit.desc }}</td>
                <td headers="cpHeader">{{ unit.cp }}</td>
                <td headers="typeHeader">{{ unit.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <paginate
          v-if="getPageCount > 1"
          :page-count="getPageCount"
          :page-range="5"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination justify-content-center'"
          :page-class="'page-item'"
          :link-class="'page-link'"
        ></paginate>
      </div>
    </div>
  `,
  data() {
    return {
      perPage: 5,
      currentPage: 1,
    }
  },
  computed: {
    paginatedUnits() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.units.slice(start, end)
    },
    getPageCount() {
      return Math.ceil(this.units.length / this.perPage)
    },
  },
  methods: {
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum)
    },
  },
}

// Insert units
const InsertUnit = {
  props: ["addUnit"], 
  template: `
    <div class="container mt-4">
      <h3>Insert New Unit</h3>
      <form @submit.prevent="submitUnit">
        <div class="mb-3">
          <label for="newCode" class="form-label">Code</label>
          <input type="text" class="form-control" id="newCode" v-model="newUnit.code" required>
        </div>
        <div class="mb-3">
          <label for="newDesc" class="form-label">Description</label>
          <input type="text" class="form-control" id="newDesc" v-model="newUnit.desc" required>
        </div>
        <div class="mb-3">
          <label for="newCp" class="form-label">Credit Points</label>
          <input type="number" step="0.5" class="form-control" id="newCp" v-model.number="newUnit.cp" required>
        </div>
        <div class="mb-3">
          <label for="newType" class="form-label">Type</label>
          <input type="text" class="form-control" id="newType" v-model="newUnit.type" required>
        </div>
        <button type="submit" class="btn btn-success">Add Unit</button>
      </form>
    </div>
  `,
  data() {
    return {
      newUnit: {
        code: "",
        desc: "",
        cp: null,
        type: "",
      },
    }
  },
  methods: {
    submitUnit() {
      if (this.newUnit.code && this.newUnit.desc && this.newUnit.cp !== null && this.newUnit.type) {
        this.addUnit({ ...this.newUnit })
        alert("Unit added successfully!")
        // Clear form
        this.newUnit = { code: "", desc: "", cp: null, type: "" }
      } else {
        alert("Please fill in all fields.")
      }
    },
  },
}

// Update units
const UpdateUnit = {
  props: ["units", "updateUnit"], 
  template: `
    <div class="container mt-4">
      <h3>Update Unit</h3>
      <form @submit.prevent="submitUpdate">
        <div class="mb-3">
          <label for="selectUnitCode" class="form-label">Select Unit Code</label>
          <select class="form-select" id="selectUnitCode" v-model="selectedCode" @change="selectUnit" required>
            <option value="" disabled>Select a unit</option>
            <option v-for="unit in units" :key="unit.code" :value="unit.code">{{ unit.code }} - {{ unit.desc }}</option>
          </select>
        </div>

        <div v-if="unitToUpdate.code">
          <div class="mb-3">
            <label for="updateDesc" class="form-label">Description</label>
            <input type="text" class="form-control" id="updateDesc" v-model="unitToUpdate.desc" required>
          </div>
          <div class="mb-3">
            <label for="updateCp" class="form-label">Credit Points</label>
            <input type="number" step="0.5" class="form-control" id="updateCp" v-model.number="unitToUpdate.cp" required>
          </div>
          <div class="mb-3">
            <label for="updateType" class="form-label">Type</label>
            <input type="text" class="form-control" id="updateType" v-model="unitToUpdate.type" required>
          </div>
          <button type="submit" class="btn btn-primary">Update Unit</button>
        </div>
        <div v-else class="alert alert-info">
          Please select a unit to update.
        </div>
      </form>
    </div>
  `,
  data() {
    return {
      selectedCode: "",
      unitToUpdate: {
        code: "",
        desc: "",
        cp: null,
        type: "",
      },
    }
  },
  methods: {
    selectUnit() {
      const unit = this.units.find((u) => u.code === this.selectedCode)
      if (unit) {
        this.unitToUpdate = { ...unit } // Copy unit data to form
      } else {
        this.unitToUpdate = { code: "", desc: "", cp: null, type: "" }
      }
    },
    submitUpdate() {
      if (this.unitToUpdate.code) {
        this.updateUnit(this.unitToUpdate.code, { ...this.unitToUpdate })
        alert("Unit updated successfully!")
        this.selectedCode = ""
        this.unitToUpdate = { code: "", desc: "", cp: null, type: "" }
      } else {
        alert("No unit selected for update.")
      }
    },
  },
}

// Delete Unit Component
const DeleteUnit = {
  props: ["units", "deleteUnit"], 
  template: `
    <div class="container mt-4">
      <h3>Delete Unit</h3>
      <form @submit.prevent="submitDelete">
        <div class="mb-3">
          <label for="deleteUnitCode" class="form-label">Select Unit Code to Delete</label>
          <select class="form-select" id="deleteUnitCode" v-model="selectedCode" required>
            <option value="" disabled>Select a unit</option>
            <option v-for="unit in units" :key="unit.code" :value="unit.code">{{ unit.code }} - {{ unit.desc }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-danger" :disabled="!selectedCode">Delete Unit</button>
      </form>
      <div v-if="units.length === 0" class="alert alert-info mt-3">
        No units available to delete.
      </div>
    </div>
  `,
  data() {
    return {
      selectedCode: "",
    }
  },
  methods: {
    submitDelete() {
      if (this.selectedCode && confirm(`Are you sure you want to delete unit ${this.selectedCode}?`)) {
        this.deleteUnit(this.selectedCode)
        alert("Unit deleted successfully!")
        this.selectedCode = "" // Clear selection
      }
    },
  },
}

// Dashboard 
const Dashboard = {
  components: {
    ViewUnits,
    InsertUnit,
    UpdateUnit,
    DeleteUnit,
  },
  props: ["units", "addUnit", "updateUnit", "deleteUnit"], // Pass CRUD methods and units down
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Units Dashboard</h1>
        <button @click="logout" class="btn btn-outline-secondary">Logout</button>
      </div>

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="view-tab" data-bs-toggle="tab" data-bs-target="#view" type="button" role="tab" aria-controls="view" aria-selected="true">View Units</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="insert-tab" data-bs-toggle="tab" data-bs-target="#insert" type="button" role="tab" aria-controls="insert" aria-selected="false">Insert Unit</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="update-tab" data-bs-toggle="tab" data-bs-target="#update" type="button" role="tab" aria-controls="update" aria-selected="false">Update Unit</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="delete-tab" data-bs-toggle="tab" data-bs-target="#delete" type="button" role="tab" aria-controls="delete" aria-selected="false">Delete Unit</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="view" role="tabpanel" aria-labelledby="view-tab">
          <ViewUnits :units="units" />
        </div>
        <div class="tab-pane fade" id="insert" role="tabpanel" aria-labelledby="insert-tab">
          <InsertUnit :addUnit="addUnit" />
        </div>
        <div class="tab-pane fade" id="update" role="tabpanel" aria-labelledby="update-tab">
          <UpdateUnit :units="units" :updateUnit="updateUnit" />
        </div>
        <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
          <DeleteUnit :units="units" :deleteUnit="deleteUnit" />
        </div>
      </div>
    </div>
  `,
  methods: {
    logout() {
      localStorage.removeItem("isAuthenticated")
      this.$router.push("/login")
    },
  },
}

// --- Router Setup ---
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, 
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

// Navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login") // Redirect to login if not authenticated
  } else if (to.path === "/login" && isAuthenticated) {
    next("/dashboard") // Redirect to dashboard if already authenticated and trying to go to login
  } else {
    next() 
  }
})

// --- Main ---
const app = Vue.createApp({
  template: `
    <router-view
      :units="units"
      :addUnit="addUnit"
      :updateUnit="updateUnit"
      :deleteUnit="deleteUnit"
    ></router-view>
  `,
  data() {
    return {
      units: [],
    }
  },
  async created() {
    await this.loadUnits()
  },
  methods: {
    async loadUnits() {
      const storedUnits = localStorage.getItem("units")
      if (storedUnits) {
        this.units = JSON.parse(storedUnits)
      } else {
        // If no units in localStorage, fetch from units.json and save
        try {
          const response = await fetch("units.json")
          const data = await response.json()
          this.units = data
          this.saveUnitsToLocalStorage()
        } catch (error) {
          console.error("Error loading initial units from units.json:", error)
          // Fallback to an empty array or a default if fetch fails
          this.units = []
        }
      }
    },
    saveUnitsToLocalStorage() {
      localStorage.setItem("units", JSON.stringify(this.units))
    },
    addUnit(unit) {
      // Check for duplicate code
      if (this.units.some((u) => u.code === unit.code)) {
        alert("Error: Unit with this code already exists.")
        return
      }
      this.units.push(unit)
      this.saveUnitsToLocalStorage()
    },
    updateUnit(code, updatedUnit) {
      const index = this.units.findIndex((u) => u.code === code)
      if (index !== -1) {
        // Ensure the code itself isn't changed if it's the identifier
        this.units[index] = { ...updatedUnit, code: code }
        this.saveUnitsToLocalStorage()
      }
    },
    deleteUnit(code) {
      this.units = this.units.filter((u) => u.code !== code)
      this.saveUnitsToLocalStorage()
    },
  },
})

app.use(router)
app.component("paginate", VuejsPaginateNext) 
app.mount("#app")