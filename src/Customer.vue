<templete>
  <div id="app">
  	<h2>Audio Request</h2>
  	<label>1. User name</label>
  	<input type="text" v-model="postUser">
  	<br/>

  	<label>2. Content</label>
  	<textarea type="textarea" v-model="postContent"></textarea>
    <br/>
    <label>3. What's the message expected to be broadcast?</label>
    <select v-model="hour">
      <option value="">Hour</option>
      <option v-for="hour in hour_list" v-bind:value="hour">
        {{ hour }}
      </option>
    </select>
    <select v-model="minute">
      <option value="">Minute</option>
      <option v-for="min in min_list" v-bind:value="min">
        {{ min }}
      </option>
    </select>
  	<br/>
    <br/>
  	<p>{{ message }}</p>
  	<button type="submit" v-on:click="submitOK">submit</button>
    <button v-on:click="reset">reset</button>
  </div>
</templete>

<script>
export default {
    el: '#App',
    data:{
      message: 'You have not submitted yet.',
      postUser: '',
      postContent: '',
      postTime:'',
      hour:'',
      minute:'',
      hour_list:[
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7
      ],
      min_list:[
        00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
      ],
    },
    methods:{
      submitOK: function(){
        console.log(this.hour);
        this.message = 'submit success!';
        var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var now = new Date();
        var formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
          now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + 
          now.getSeconds();
        var expectT = this.hour + ':' + this.minute;
        var config = {
            apiKey: "AIzaSyAGcYPi_jjP4nWq0T0BFsJeJ3sotaVFuvI",
            authDomain: "audio-system.firebaseapp.com",
            databaseURL: "https://audio-system.firebaseio.com",
            storageBucket: "audio-system.appspot.com",
            messagingSenderId: "438293427908" 
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        var postRef = firebase.database().ref('/');
        postRef.push().set({
          uid: this.postUser,
          content: this.postContent,
          time: formatted,
          expectTime: expectT,
          isSched: 0,
          isDone: 0,
        }).then(function(){
          console.log('new post');
        }).catch(function(err){
          console.error('error:', err);
        })
        this.postContent = '';
        this.postTime = '';
        this.hour = '';
        this.minute = '';
      },
      reset: function(){
        this.message = 'You have not submitted yet.';
        this.postUser = '';
        this.postContent = '';
        this.hour = '';
        this.minute = '';
      }
    }
}
</script>

<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>

<style>
</style>
