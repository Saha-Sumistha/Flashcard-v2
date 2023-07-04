
const register = {
    template: `   
 
    <div >

    <div class="sidenav" >
    <router-link to="/"><a>Home</a></router-link>
    <router-link to="/register"><a>Register</a></router-link>
    <router-link to="/login"><a>Signin</a></router-link>

        <div class="dropdown">
            <button class="dropbtn"><a>Support</a></button>
            <div class="dropdown-content">
                <p style="border-radius: 1em;">Email : 21f1000276@student.onlinedegree.iitm.ac.in</p>
            </div>
        </div>
</div>
        <div class="main">
            <h2>Register now</h2><hr style="height: 1px;width: 950px;margin-left: 0px;background-color: black;">
            <form action='/register' method="POST" style="font-size: 25px;">
                First name:<input type="text" placeholder="Enter your first name" name="f_name" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;" v-model="formData.f_name" />
                <br><br>
                Last name:<input type="text" placeholder="Enter your last name" name="l_name" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;" v-model="formData.l_name" />
                <br><br>
                Email:<input type="email" placeholder="Enter email" name="email" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;" v-model='formData.email'><br><br>
                Password:<input type="password" placeholder="Your password" name="password" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;"v-model='formData.password'><br><br>
                <label for="psw-repeat">Repeat Password</label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;"><br><br>
            
                <label>
                <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
                </label>
                <br><br>
            <button type="submit" style="border-radius: 0.5em;border-radius: 0.5em;padding: 0.7em 1.5em;"  @click.prevent="onSubmit" >Register</button>
            </form>
            <br>
            <div class="bottom-center" style="text-align: center;font-size: 18px;"><h5>&copy Sumistha Saha.All rights reserved</h5></div>       
        </div>
            
     
     </div>
    
`
,
data: function () {
    return {
      formData: {
        f_name: '',
        l_name: '',
        email: '',
        password:'',
      },
      error: false,
    }
  },
  methods: {
    // once the form is submitted send the form data to the server
    // if request was successful alert with success message
    // else print the error message
    async onSubmit() {
      const createUserRequest = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(this.formData),
        headers: new Headers({ 'content-type': 'application/json' }),

      })
  
      if (createUserRequest.ok) {
        alert('User created successfully')
        const data=await createUserRequest.json()
        // this.$router.push('/dashboard/<int:id>')
        this.$router.push('/')
      } else {
        let errorMessage = await createUserRequest.json()
        this.error = errorMessage.message
      }
    },
  },
  }
  


export default register