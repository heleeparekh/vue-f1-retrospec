<template>
    <div class="home">
      <!-- News Section -->
      <section class="news">
        <h2>Latest F1 News</h2>
        <div class="news-container">
          <div class="news-item" v-for="news in latestNews" :key="news.id">
            <h3>{{ news.title }}</h3>
            <p>{{ news.description }}</p>
            <!-- Add more news details here -->
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Home',
    data() {
      return {
        latestNews: [],
      };
    },
    methods: {
      async fetchNews() {
        const options = {
          method: 'GET',
          url: 'https://f1-latest-news.p.rapidapi.com/news/f1',
          headers: {
            'X-RapidAPI-Key': '8046a6c17dmshe5f5baa3d613a49p1f56b9jsn69cb3f7eabb1',
            'X-RapidAPI-Host': 'f1-latest-news.p.rapidapi.com'
          }
        };
  
        try {
          const response = await axios.request(options);
          this.latestNews = response.data; // Assuming the data is in the format that you need
        } catch (error) {
          console.error(error);
          // Handle errors, maybe set an error state and display a message
        }
      },
    },
    created() {
      this.fetchNews();
    }
  };
  </script>
  
  <style scoped>
  /* Add styles for your news items and season cards */
  .news-container {
    display: flex;
    flex-wrap: wrap;
    /* More styles */
  }
  
  .news-item {
    /* Styles for news item */
  }
  /* More styles */
  </style>
  