const API_URL = 'https://openweathermap.org/data'
const API_KEY = 'd2a18755ee857401563dd9b95e3ea239'

var app = new Vue({
    el: '#app', 
    data: {
        title: 'Weather app',
        cities: [],
        query: '',
        all: [],
        message: ''
    },
    mounted () {
      axios.get('./city.list.min.json').then(response => (this.all = response.data))
    },
    methods: {
        fetchWeatherData(cityID) {
            axios
                .get('https://api.openweathermap.org/data/2.5/weather?id='+cityID+'&appid='+API_KEY)
                .then(response => (this.cities.push(response.data)))
                .catch(function (error) {
                    this.say(error)
                })
        },
        search (e) {
            if ( this.query.length == 0 ) return
            let city = this.all.find(el => (el.name.toUpperCase() === this.query.toUpperCase()), this)
            if ( city ) {
                this.fetchWeatherData(city.id)
                this.query = ''
            } else {
                this.say('Not found :(')
            }
        },
        say (text) {
            this.message = text
            setTimeout(() => (app.message = ''), 2000)
        }
    }
})
