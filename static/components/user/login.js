const login = {
    template: `   
 
    <div >
    <div class="sidenav">
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
            <h2>Signin now</h2><hr style="height: 1px;width: 950px;margin-left: 0px;background-color: black;">
            <form action='/login' method="POST" style="font-size: 25px;">            
                Email:<input type="email" placeholder="Enter email" name="email" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;" v-model="formData.email">
                <br><br>
                Password:<input type="password" placeholder="Your password" name="password" required style="padding: 0.65em 8em;border-radius: 11px;margin-left: 0.5em;" v-model="formData.password">
                <br><br>            
                <button type="submit" style="border-radius: 0.5em;border-radius: 0.5em;padding: 0.7em 1.5em;" @click.prevent="loginUser">Signin</button>
            </form>
            <br>
            <div class="bottom-center" style="text-align: center;font-size: 18px;"><h5>&copy Sumistha Saha.All rights reserved</h5></div>  
        </div>
    </div>
    
`,
// data: function () {
//     return {
//       formData: {
//         email: '',
//         password:'',
//       },
//       error: false,
//     }
//   },
//   methods: {
//     async onSubmit() {
//         const createStudentRequest = await fetch('/api/user/1', {
//           method: 'GET',
//           //body: JSON.stringify(this.formData),
//           headers: new Headers({ 'content-type': 'application/json' }),
  
//         })
    
//         if (createStudentRequest.ok) {
//           alert('User created successfully')
//           this.$router.push('/dashboard')
//         } else {
//           let errorMessage = await createStudentRequest.json()
//           this.error = errorMessage.message
//         }
//       },
//     // async onSubmit() {
//     //   const res = await fetch(`/login?include_auth_token`, {
//     //     method: 'post',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(this.formData),
//     //   })

//     //   if (res.ok) {
//     //     const data = await res.json()
//     //     localStorage.setItem(
//     //       'auth-token',
//     //       data.response.user.authentication_token
//     //     )
//     //     this.$router.push('/dashboard/1')
//     //   } else {
//     //     console.log('something went wrong')
//     //   }
//     // },
//   },
//   }
  


// export default signin
// const signin = {
//     template: `
//       <form action=''>
//         <input type='text' name='email' id='email' placeholder='email' v-model="formData.email"/>
//         <input type='password' name='password' placeholder='password' v-model="formData.password"/>
//         <button @click.prevent="loginUser"> Login </button>
//       </form>
//     `,
  
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
      }
    },
  
    methods: {
      async loginUser() {
        const res = await fetch('/login?include_auth_token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        })
        console.log(res)
        if (res.ok) {
            alert('Response OK')
          const data = await res.json()
          console.log(data)
          localStorage.setItem(
            'auth_token',
            data.response.user.authentication_token
          )
          //console.log(data.response.user.id)
          this.$router.push('/dashboard/1')
          //this.$router.push('/dashboard/'+data.response.user.id)
          //this.$router.push('/dashboard/'+this.id)
          //location.replace('/dashboard/'+data.response.user.id)
        } else {
          console.log('something went wrong')
        }
      },
    },
    
  }
  
  export default login
  