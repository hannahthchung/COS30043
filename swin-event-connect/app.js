const { createApp, ref, computed } = Vue

const EventCard = {
  props: ["event", "index", "currentUser"],
  template: `
    <div class="event-card">
      <div class="event-card-header">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="event-title">{{ event.title }}</h5>
          <span class="event-type-badge" :class="'type-' + event.type.toLowerCase().replace(' ', '-')">
            <i :class="getTypeIcon(event.type)"></i> {{ event.type }}
          </span>
        </div>
      </div>
      <div class="event-card-body">
        <p class="mb-3">{{ event.desc }}</p>
        
        <div class="event-meta">
          <span><i class="fas fa-calendar-alt"></i> {{ formatDate(event.date) }}</span>
          <span><i class="fas fa-user"></i> {{ event.hostName }}</span>
        </div>
        
        <div class="mb-3">
          <small class="text-muted">
            <i class="fas fa-envelope"></i> Questions? Contact: 
            <a :href="'mailto:' + event.user" class="text-decoration-none">{{ event.user }}</a>
          </small>
        </div>
        
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center gap-3">
            <span class="interested-count">
              <i class="fas fa-star"></i> {{ event.interested }} interested
            </span>
            
            <!-- Toggleable Join Button -->
            <button 
              class="btn btn-custom btn-sm"
              :class="$parent.isUserJoined(event) ? 'btn-success-custom joined-btn' : 'btn-outline-success'"
              @click="$emit('join', index)"
            >
              <i :class="$parent.isUserJoined(event) ? 'fas fa-check-circle' : 'fas fa-user-plus'"></i> 
              {{ $parent.isUserJoined(event) ? 'Joined' : 'You wanna join?' }}
            </button>
          </div>
          
          <div class="d-flex gap-2">
            <button 
              class="btn btn-custom btn-sm"
              :class="$parent.isUserInterested(event) ? 'btn-interested-active' : 'btn-interested-default'"
              @click="$emit('interested', index)"
            >
              <i :class="$parent.isUserInterested(event) ? 'fas fa-check' : 'fas fa-thumbs-up'"></i>
              {{ $parent.isUserInterested(event) ? 'Interested' : "I'm interested" }}
            </button>
            
            <div v-if="event.user === currentUser" class="d-flex gap-1">
              <button class="btn btn-custom btn-warning-custom btn-sm" @click="$emit('edit', index)">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="btn btn-custom btn-danger-custom btn-sm" @click="$emit('delete', index)">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    getTypeIcon(type) {
      const icons = {
        Workshop: "fas fa-chalkboard-teacher",
        Club: "fas fa-users",
        Social: "fas fa-heart",
        "Free Food": "fas fa-utensils",
      }
      return icons[type] || "fas fa-calendar"
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    },
  },
}

const AppMain = {
  components: { EventCard },
  template: `
    <div>
      <div v-if="!currentUser">
        <div class="login-card">
          <h5 class="mb-4 login-title">Welcome to SwinEvent Connect!</h5>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label fw-semibold">Swinburne Email</label>
              <input 
                v-model="loginEmail" 
                type="email" 
                class="form-control form-control-custom" 
                required 
                placeholder="e.g.: 104050xxx@student.swin.edu.au"
              >
            </div>
            <button class="btn btn-custom btn-primary-custom w-100">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
          </form>
        </div>
      </div>

      <div v-if="currentUser">
        <!-- Moved app-header here, only visible when logged in -->
        <div class="app-header">
          <h1 class="app-title">SwinEvent Connect 🎉</h1>
          <p class="app-subtitle">Click in, vibe out. Create your unforgettable uni memories now!</p>
        </div>
        <div class="welcome-section">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h5 class="mb-1"><i class="fas fa-user-circle"></i> Welcome back!</h5>
              <p class="mb-0 text-muted">{{ currentUser }}</p>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-custom btn-success-custom" @click="toggleForm">
                <i :class="showForm ? 'fas fa-times' : 'fas fa-plus'"></i>
                {{ showForm ? 'Cancel' : 'Create Event' }}
              </button>
              <button class="btn btn-outline-secondary btn-custom" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>

        <div v-if="showForm" class="form-section">
          <h5 class="mb-4"><i class="fas fa-calendar-plus"></i> Create New Event</h5>
          <form @submit.prevent="addEvent">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Event Title</label>
                <input 
                  v-model="newEvent.title" 
                  class="form-control form-control-custom" 
                  placeholder="Enter event title" 
                  required
                >
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold">Event Type</label>
                <select v-model="newEvent.type" class="form-select form-control-custom" required>
                  <option value="">Select event type</option>
                  <option>Workshop</option>
                  <option>Club</option>
                  <option>Social</option>
                  <option>Free Food</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Description</label>
              <textarea 
                v-model="newEvent.desc" 
                class="form-control form-control-custom" 
                rows="3"
                placeholder="Describe your event..." 
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Event Date</label>
              <input 
                v-model="newEvent.date" 
                type="date" 
                class="form-control form-control-custom" 
                required
              >
            </div>
            <button class="btn btn-custom btn-primary-custom">
              <i class="fas fa-calendar-plus"></i> Create Event
            </button>
          </form>
        </div>

        <div class="search-filter-section">
          <h6 class="mb-3"><i class="fas fa-search"></i> Find Events</h6>
          <div class="row">
            <div class="col-md-8 mb-2">
              <input 
                v-model="searchTerm" 
                class="form-control form-control-custom" 
                placeholder="🔍 Search event titles..."
              >
            </div>
            <div class="col-md-4 mb-2">
              <select v-model="filterType" class="form-select form-control-custom">
                <option value="">All Types</option>
                <option>Workshop</option>
                <option>Club</option>
                <option>Social</option>
                <option>Free Food</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="paginatedEvents.length > 0">
          <event-card
            v-for="(event, index) in paginatedEvents"
            :key="index"
            :event="event"
            :index="index"
            :currentUser="currentUser"
            @interested="markInterested"
            @join="toggleJoin"
            @edit="editEvent"
            @delete="deleteEvent"
          />
        </div>

        <div v-else class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <h5>No events found</h5>
          <p>Try adjusting your search or filters, or create a new event!</p>
        </div>

        <nav v-if="totalPages > 1" class="mt-4">
          <ul class="pagination pagination-custom justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--">
                <i class="fas fa-chevron-left"></i> Previous
              </button>
            </li>
            <li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: currentPage === n }">
              <button class="page-link" @click="currentPage = n">{{ n }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="currentPage++">
                Next <i class="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  data() {
    return {
      events: [],
      loginEmail: "",
      currentUser: null,
      showForm: false,
      newEvent: { title: "", desc: "", date: "", type: "" },
      searchTerm: "",
      filterType: "",
      currentPage: 1,
      eventsPerPage: 3,
      userInterests: {},
      userJoined: {},
    }
  },
  computed: {
    filteredEvents() {
      return this.events.filter((e) => {
        const matchesSearch = this.searchTerm === "" || e.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        const matchesType = this.filterType === "" || e.type === this.filterType
        return matchesSearch && matchesType
      })
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.eventsPerPage
      return this.filteredEvents.slice(start, start + this.eventsPerPage)
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.eventsPerPage)
    },
  },
  methods: {
    login() {
      if (!this.loginEmail.endsWith("@student.swin.edu.au") && !this.loginEmail.endsWith("@swin.edu.au")) {
        alert("Use Swinburne email only")
        return
      }
      this.currentUser = this.loginEmail
      localStorage.setItem("currentUser", this.currentUser) // Add this line
      this.loginEmail = ""
    },
    logout() {
      const prevUser = this.currentUser // Store current user before setting to null
      this.currentUser = null
      localStorage.removeItem("currentUser")
      this.userInterests = {}
      this.userJoined = {}
      // Remove user-specific data for the user who just logged out
      if (prevUser) {
        localStorage.removeItem(`userInterests_${prevUser}`)
        localStorage.removeItem(`userJoined_${prevUser}`)
      }
    },
    toggleForm() {
      this.showForm = !this.showForm
    },
    extractHostName(email) {
      if (email.endsWith("@swin.edu.au")) {
        // For staff
        const name = email.split("@")[0]
        const parts = name.split(".")
        if (parts.length >= 2) {
          return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
        }
        return `Staff ${name}`
      } else if (email.endsWith("@student.swin.edu.au")) {
        // For students
        const studentId = email.split("@")[0]
        return `Student ${studentId}`
      } else {
        // Fallback for unexpected email formats: try to format as a name or just use the part before @
        const parts = email.split("@")[0].split(".")
        if (parts.length >= 1) {
          return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
        }
        return email.split("@")[0] // Fallback to just the username part
      }
    },
    addEvent() {
      const newE = {
        ...this.newEvent,
        user: this.currentUser,
        hostName: this.extractHostName(this.currentUser),
        interested: 0,
      }
      this.events.unshift(newE)
      this.saveEvents()
      this.resetForm()
      this.currentPage = 1 // Add this line to go to the first page
    },
    editEvent(index) {
      const realIndex = (this.currentPage - 1) * this.eventsPerPage + index;
      this.editingEventIndex = realIndex;
      this.newEvent = { ...this.events[realIndex] };
      this.showForm = true;

      this.$nextTick(() => {
        const formSection = document.querySelector(".form-section");
        if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
      });
    },
    deleteEvent(index) {
      const realIndex = (this.currentPage - 1) * this.eventsPerPage + index
      if (confirm("Are you sure you want to delete this event?")) {
        this.events.splice(realIndex, 1)
        this.saveEvents()
      }
    },
    markInterested(index) {
      const realIndex = (this.currentPage - 1) * this.eventsPerPage + index
      const eventId = this.events[realIndex].title + this.events[realIndex].date

      if (this.userInterests[eventId]) {
        // User is removing their interest
        this.events[realIndex].interested = Math.max(0, this.events[realIndex].interested - 1)
        this.userInterests[eventId] = false
      } else {
        // User is showing interest
        this.events[realIndex].interested++
        this.userInterests[eventId] = true
      }

      this.saveEvents()
      this.saveUserData()
    },
    toggleJoin(index) {
      const realIndex = (this.currentPage - 1) * this.eventsPerPage + index
      const eventId = this.events[realIndex].title + this.events[realIndex].date

      // Toggle the join status - this allows users to unjoin!
      this.userJoined[eventId] = !this.userJoined[eventId]
      this.saveUserData()
    },
    isUserInterested(event) {
      const eventId = event.title + event.date
      return this.userInterests[eventId] || false
    },
    isUserJoined(event) {
      const eventId = event.title + event.date
      return this.userJoined[eventId] || false
    },
    saveUserData() {
      localStorage.setItem(`userInterests_${this.currentUser}`, JSON.stringify(this.userInterests))
      localStorage.setItem(`userJoined_${this.currentUser}`, JSON.stringify(this.userJoined))
    },
    loadUserData() {
      const interests = localStorage.getItem(`userInterests_${this.currentUser}`)
      const joined = localStorage.getItem(`userJoined_${this.currentUser}`)

      this.userInterests = interests ? JSON.parse(interests) : {}
      this.userJoined = joined ? JSON.parse(joined) : {}
    },
    resetForm() {
      this.newEvent = { title: "", desc: "", date: "", type: "" }
      this.showForm = false
    },
    saveEvents() {
      localStorage.setItem("events", JSON.stringify(this.events))
    },
    loadEvents() {
      const saved = localStorage.getItem("events")
      if (saved) {
        this.events = JSON.parse(saved)
      }
    },
  },
  mounted() {
    // Load current user from localStorage first
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      this.currentUser = savedUser
      this.loadUserData() // Load user-specific data if user is found
    }

    fetch("swin-events.json")
      .then((res) => res.json())
      .then((fetchedData) => {
        let currentEvents = []
        const savedEvents = localStorage.getItem("events")

        if (savedEvents) {
          currentEvents = JSON.parse(savedEvents)
        } else {
          currentEvents = fetchedData
        }

        // Assign events directly; hostName is now expected to be in the JSON
        this.events = currentEvents
        this.saveEvents()
      })
      .catch((error) => {
        console.error("Error loading data:", error)
      })
  },
  watch: {
    currentUser(newUser) {
      if (newUser) {
        this.loadUserData()
      }
    },
    searchTerm() {
      this.currentPage = 1
    },
    filterType() {
      this.currentPage = 1
    },
  },
}

createApp({ components: { AppMain } }).mount("#app")
