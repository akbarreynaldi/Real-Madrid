class fetchAPI {
    constructor() {
        this.baseUrl = `https://api.football-data.org/v2/`;
        this.token = '24fff3ee49fc454b919338b1638865e7';
    }

    //fetch call
    async fetch(path) {
        const response = await fetch(this.baseUrl + path, {
            headers: {
                'X-Auth-Token': this.token
            }
        });
        const data = await response.json();
        return data;
    }

    //data team dengan id=86 yaitu Real Madrid
    async teamData() {
        const result = await this.fetch("teams/86");
        return result;
    }

    //data klasemen dengan id 2014 yaitu Primera Division
    async standingsData() {
        const result = await this.fetch("competitions/2014/standings");
        return result;
    }

    //data pertandingan dengan id team 86 yaitu Real Madrid
    async matchData() {
        const result = await this.fetch("teams/86/matches");
        return result;
    }

    //match info
    async matchInfo() {
        let urlParams = new URLSearchParams(window.location.search);
        let matchId = urlParams.get("id");
        const result = await this.fetch(`matches/${matchId}`);
        return result;
    }

}


export default fetchAPI;