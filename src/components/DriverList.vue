<template>
  <div class="driver-standings">
    <h1>F1 Drivers - {{ selectedYear }}</h1>
    <select v-model="selectedYear" @change="getDrivers">
      <option disabled value="">Select a year</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
    <div class="standings-list">
      <div class="standings-header">
        <h2>Position</h2>
        <h2>Driver</h2>
        <h2>Points</h2>
        <h2>Wins</h2>
      </div>
      <ul>
        <li v-for="driver in drivers" :key="driver.driverId">
          <span class="position">#{{ driver.position }}</span>
          <span class="name">{{ driver.givenName }} {{ driver.familyName }}</span>
          <span class="points">{{ driver.points }} points</span>
          <span class="wins">{{ driver.wins }} wins</span>
        </li>
      </ul>
    </div>
  </div>
</template>


  <script>
  import axios from 'axios';
  
  export default {
    data() {
        const currentYear = new Date().getFullYear().toString();
        return {
            selectedYear: currentYear,
            years: Array.from({ length: new Date().getFullYear() - 1999 }, (v, i) => i + 2000), // Creates an array from 2000 to the current year
            drivers: [],
        };
    },
    created() {
        this.getDrivers(); // Fetch drivers' standings when the component is created
    },
    methods: {
        getDrivers() {
            if (this.selectedYear) {
            axios
                .get(`http://ergast.com/api/f1/${this.selectedYear}/driverStandings.json`)
                .then(response => {
                this.drivers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
                    .map(ds => ({
                    ...ds.Driver,
                    position: ds.position,
                    points: ds.points,
                    wins: ds.wins,
                    }));
                })
                .catch(error => console.error('Error:', error));
            }
        },
    },
  };
  </script>
  

  <style scoped>
  div.driver-standings {
    width: 100%; /* Full width */
    max-width: 800px; /* Maximum width of the standings area */
    margin: 2rem auto; /* Centering the standings div */
    padding: 1rem; /* Padding around the content */
  }
  
  h1 {
    color: #e10600; /* F1 red */
    text-transform: uppercase;
    text-align: center; /* Center the title */
    margin-bottom: 1rem;
  }
  
  select {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    border: 2px solid #e10600; /* F1 red for border */
    border-radius: 0.5rem;
    background-color: white;
    -webkit-appearance: none; /* Removes default styling on WebKit browsers */
    -moz-appearance: none; /* Removes default styling on Firefox */
    appearance: none; /* Standard way to remove default arrow */
    font-weight: bold;
    color: #555;
    background-image: url('data:image/svg+xml;utf8,<svg fill="red" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.7rem center;
    background-size: 1.2rem;
    cursor: pointer;
  }
  select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(224, 102, 102, 0.5); /* Light red glow */
  }
  select:hover {
    background-color: #f7f7f7;
  }
    
  .standings-header {
    display: flex;
    justify-content: space-between;
    background-color: #eaeaea; /* Background color for header */
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: 100%; /* Full width */
    margin-bottom: 0.5rem; /* Space below the header */
  }
  
  .standings-header h2 {
    font-weight: bold;
    margin: 0; /* Remove default margins from h2 */
    flex: 1; /* Flex value for equal spacing */
    text-align: center; /* Center the text */
  }
  
  ul {
    list-style: none;
    padding: 0;
    width: 100%; /* Full width */
  }
  
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-top: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease;
  }
  
  li:hover {
    background-color: #ececec; /* slightly darker grey on hover */
  }
  
  .position,
  .name,
  .points,
  .wins {
    flex: 1; /* Flex value for equal spacing */
    text-align: center; /* Center the text */
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  
    li {
      flex-direction: column; /* Stack the details for smaller screens */
      align-items: center; /* Center the items when stacked */
    }
  
    .position,
    .name,
    .points,
    .wins {
      flex-basis: 100%; /* Full width on small screens */
      text-align: center; /* Center the text */
      padding: 0.5rem 0; /* Padding for space */
    }
  
    .standings-header {
      flex-direction: column; /* Stack the header items on smaller screens */
    }
  
    .standings-header h2 {
      flex-basis: 100%; /* Full width for headers */
    }
    select {
        padding: 0.5rem;
        background-position: right 0.5rem center;
    }
  }
  </style>
  

