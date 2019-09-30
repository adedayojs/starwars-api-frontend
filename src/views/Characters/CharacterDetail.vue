<template>
  <section>
    <DetailHeader />

    <!-- Display Spinner if component is loading-->
    <div v-if="loading">
      <img src="/img/spinner.svg" />
      <p>Loading Your Next Character</p>
    </div>

    <!--Navigation Buttons-->
    <div style="margin:1em 5em" v-if="!loading && !loadError">
      <button class="view-more">
        <span
          v-if="this.$route.params.id>1"
          style="border-right:solid 2px #000"
          @click="previousPerson()"
        >Prev</span>
        <span v-if="this.$route.params.id<=characters.count" @click="nextPerson()">Next</span>
      </button>
    </div>

    <!--Card Component For Character Details-->
    <div v-if="character.name && !loading && !loadError " class="card-div">
      <img :src="randomImage()" class="planet-card-image" />
      <!-- Details About the character -->
      <div class="info">
        <h2>{{character.name}}</h2>
        <span>Title of Character</span>
        <p>
          {{character.gender == 'male'?'His':'Her'}} name is {{character.name}}. {{character.gender == 'male'?'He':'She'}} was born in {{character.birth_year}}. {{character.gender == 'male'?'His':'Her'}} height is {{character.height}} cm. {{character.gender == 'male'?'He':'She'}} has a mass of {{character.mass}} kg. {{character.gender == 'male'?'His':'Her'}} skin color is {{character.skin_color}} and eyecolor is {{character.eye_color}}.
          <br />
          <br />
          {{character.name}} has {{character.vehicles.length?character.vehicles.length:'No'}} Vehicle and has {{character.starships.length?character.starships.length:'No'}} starships
        </p>
      </div>

      <!--Navigation Buttons-->
      <div style="margin:1em 5em" v-if="!loading && !loadError">
        <button class="view-more">
          <span
            v-if="this.$route.params.id>1"
            style="border-right:solid 2px #000"
            @click="previousPerson()"
          >Prev</span>
          <span v-if="this.$route.params.id<=characters.count" @click="nextPerson()">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>


<script>
import DataFetcher from "../../helper/DataFetcher";
import DetailHeader from "../DetailHeader";

export default {
  data() {
    return {
      character: {},
      characters: [],
      loading: true,
      loadError: false,
      currentId: ""
    };
  },
  methods: {
    randomImage() {
      const imgArr = [
        "/img/character-1.jpg",
        "/img/character-3.jpg",
        "/img/character-2.jpg",
        "/img/character-4.jpg"
      ];
      const randomImage = Math.floor(Math.random() * 4);
      return imgArr[randomImage];
    },
    nextPerson() {
      this.loading = true;
      DataFetcher.people(this.currentId + 1).then(res => {
        this.character = res;
        this.loading = false;
        this.currentId++;
        this.$router.push({
          name: "CharacterDetail",
          params: { id: this.currentId }
        });
      });
    },
    previousPerson() {
      this.loading = true;
      DataFetcher.people(this.currentId - 1).then(res => {
        this.character = res;
        this.loading = false;
        this.currentId--;
        this.$router.push({
          name: "CharacterDetail",
          params: { id: this.currentId }
        });
      });
    }
  },

  components: {
    DetailHeader
  },
  created() {
    try {
      DataFetcher.people(this.$route.params.id).then(res => {
        this.character = res;
        this.loading = false;
        this.currentId = Number(this.$route.params.id);
      });

      DataFetcher.people().then(res => {
        this.characters = res;
      });
    } catch (e) {
      throw e;
    }
  }
};
</script>

<style scoped>
.planet-card-image {
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
}
.card-div {
  background-color: #d8d8d8;
  height: 40em;
  display: flex;
  flex-direction: column;
  max-width: 50%;
  margin: 2em auto;
}
.info {
  padding: 5em 1em;
  text-align: left;
}
.info h2 {
  margin: 0;
}
.info span,
.info p {
  font-size: 1.3em;
}

/********** Loader Buttons**********/
.view-more {
  padding: 0.5em 0em;
  background-color: #fff;
  border: solid #000 2px;
  border-radius: 7px;
  font-size: 1em;
  cursor: pointer;
  font-weight: 900;
  overflow: hidden;
}
.view-more span:hover {
  background-color: #000;
  color: #fff;
  transition: ease-in-out 0.5s;
}
.view-more span {
  padding: 0.5em 2em;
}
h4 {
  font-size: 1em;
  color: red;
}
span {
  padding: 0.3em;
  font-size: 1em;
}
button span:hover {
  box-shadow: #d8d8d8 2px 2px 0.3em;
  background: #f2f2f2;
}
</style>