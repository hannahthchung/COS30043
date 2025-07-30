const app = Vue.createApp({ })

app.component('app-mypost',
{
  // defining data to be used in the component
  data: function () {
    return {
      statPosts: [],
      strStatus: ''
    }
  },
  // define the template for the component
  template: `
    <div>
      <h1>Status Post</h1>
      <div>
        <label for="status-input">Status:&nbsp;</label>
        <input id="status-input" type="text" v-model="strStatus" @keyup.enter="add(strStatus)">&nbsp;
        <button @click="add(strStatus)">Post</button>
      </div>
      <br>
      <div v-if="statPosts.length > 0">
        <div v-for="(status, index) in statPosts" :key="index" style="margin:10px">
          <span>{{ status }}&nbsp;</span>
          <button @click="remove(index)">Del</button>
        </div>
      </div>
      <div v-else>
        <div>No status updates yet.</div>
      </div>
    </div>
  `,
  // defining the methods for add and remove status messages
  methods: {
    add: function (status) {
      if (status && status.trim() !== "") {
        this.statPosts.unshift(status.trim());
        this.strStatus = "";
      }
    },
    remove: function (index) {
      this.statPosts.splice(index, 1);
    }
  }
});

app.mount('#app');
