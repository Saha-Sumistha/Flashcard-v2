const dashboard = {
    template: `  
    <div>
    <div class="sidenav">
            <a href="/#/dashboard/1" class="active">Dashboard</a>
            <a @click.prevent="Todecks">My deck</a>
            <a onclick="func()">Add deck</a>
            <a onclick="func2()">Delete deck</a>
            <a onclick="func3()">Delete account</a>
              <div class="dropdown">
                <button class="dropbtn">Support</button>
                    <div class="dropdown-content">
                      <p style="border-radius: 1em;">21f1000276@student.onlinedegree.iitm.ac.in</p>
                    </div>
              </div>
          </div>
        
          <div class="main" >
          
            <div class="container" style="margin-left: 0em; font-size: 20px;">
              <h1>
                  <span style="color:rgb(17, 19, 17);margin: 1.5cm ;font-family: revert;">|| Welcome {{profile.f_name}} &#128512; || Your overall score :  ||</span>
                  <hr  style="height: 1px;width: auto;margin-left: 0px;background-color: black;">
                  <button class='btn btn-success pull-right'style="background-color: #090909;border-color: #1a237e;margin: right -5cm; float: right; padding-bottom: 6px;padding-top: 6px;border-radius: 5px;">
                  <a href='/logout' style="color: white; padding: 8px;height: auto;" >Log out</a><br>
                  </button>
              </h1>
              
              <table style="height: 45px;width: 500px;">
                  <tr >
                      <th style="text-align: center;">Deck Name</th>
                      <th style="text-align: center;">Last Visited</th>
                      <th style="text-align: center;" >Deck Score </th>
                  </tr>
                  <!-- {% for elem in dash %} -->
                  <tr >
                      <td style="text-align: center;">  </td>
                      <td style="text-align: center;">
                        <!-- {% if elem[1]|float > 1 %}
                          {{elem[1]}}{{" days ago"}}
                      
                        {% elif elem[1]==None %}
                          {{"Not visited "}}   
                              
                        {% else %}
                          {{ "%.1f"|format(elem[1]*24|float)}}{{" hours ago"}}
                        {% endif %}-->
                    </td> 
                      <td style="text-align: center;"></td>
                  </tr>
                  <!-- {% endfor %} -->
              </table>
            </div>
              
            <div style="display: flex;">      
                  <form id="deck" style="visibility: hidden;" method="post">
                      <label for="dname"><b>Deck Name</b></label>
                      <input type="text" placeholder="Enter Deck Name" required v-model='DeckData.title'/>
                      <br><br>
                      <button type="submit" @click.prevent="onSubmitdeck">Add</button>
                      <button type="button"><a  style="text-decoration: none;" onclick="func54()">Cancel</a></button>
                  </form>
                  <form id="deletedeck" style="visibility: hidden;"  method="post">
                      <label for="dname1"><b>Deck Name</b></label>
                      <input type="text" placeholder="Enter Deck Name" name="dname1" required  v-model='DeckData.title'/>
                      <br><br>
                      <button type="submit" @click.prevent="onSubmitdeletedeck">Delete</button>
                      <button type="button"><a  style="text-decoration: none;" onclick="func55()">Cancel</a></button>
                  </form>
                  <form id="deleteaccount" style="visibility: hidden;"  method="post">
                      <label for="dname2"><b>User email id</b></label>
                      <input type="text" placeholder="Enter user email id" name="dname2" required>
                      <br><br>
                      <button type="submit" >Delete</button>
                      <button type="button"><a style="text-decoration: none;" onclick="func56()">Cancel</a></button>
                  </form>
            </div>  
          </div>
   
  
         
    
    
 
</div>`,
  
    data : function() {
      return {
        profile: {
          username: 'Abhisek',
          email: 'narendra@gmail.com',
        },
  
        success: true,
        error: 'Something went wrong',
        DeckData: {
          title: '',
        },
        error: false,
      }
    },





    
    methods:{
    async onSubmitdeck() {
      const createStudentRequest = await fetch(`/api/courses/${this.$route.params.id}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(this.DeckData),
      })
      console.log(createStudentRequest)
      if (createStudentRequest.ok) {
        alert('Deck created successfully')
        const data = await createStudentRequest.json()
        console.log(data)
        this.$router.push(`/dashboard/${this.$route.params.id}`)
      } else {
        let errorMessage = await createStudentRequest.json()
        this.error = errorMessage.message
      }
    },


    async onSubmitdeletedeck() {
      const createStudentRequest = await fetch(`/api/courses/${this.$route.params.id}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(this.DeckData),
      })
      console.log(createStudentRequest)
      if (createStudentRequest.ok) {
        alert('Deck deleted successfully')
        // const data = await createStudentRequest.json()
        // console.log(data)
        this.$router.push(`/dashboard/${this.$route.params.id}`)
      } else {
        let errorMessage = await createStudentRequest.json()
        this.error = errorMessage.message
      }
    },


    async Todecks(){
      // // let res = await fetch(`http://127.0.0.1:8080/api/courses/${this.$route.params.id}` )
      // async created() {
          let getStudentRequest = await fetch(`/api/courses/${this.$route.params.id}`)
          let getStudentData = await getStudentRequest.json()
      
          // if request was successful change the studedents by the response data
          // else alerts with the error message
          if (getStudentRequest.ok) {
          //   this.students = getStudentData
          //   this.filteredStudents = getStudentData
            this.$router.push(`/deck/${this.$route.params.id}`)
          } else {
            alert(getStudentData.message)
          }
        },
  },
    async mounted() {
      const res = await fetch(`/api/user/${this.$route.params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('auth_token'),
        },
      })
      console.log(res)
      const data = await res.json()
      console.log(data)
      if (res.ok) {

        this.profile = data
      } else if (res.status == 401) {
        this.success = false
        this.error = data.response.error
      } else {
        this.success = false
        this.error = data.message
      }
    },
  
  }
  
  export default dashboard


