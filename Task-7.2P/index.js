const { createApp } = Vue;

createApp({
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
         })
         .catch(error => console.error('Error loading JSON:', error));
    }
}).mount('#app');