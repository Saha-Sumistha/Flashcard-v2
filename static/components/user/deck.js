const deck = {
    template: `  
    <div>
        <div class="sidenav">
            <a >Dashboard</a>
            <a href="/logout">Logout</a>
            <div class="dropdown">
                <button class="dropbtn">Support</button>
                    <div class="dropdown-content">
                        <p style="border-radius: 1em;">21f1000276@student.onlinedegree.iitm.ac.in</p>
                    </div>
            </div>  
        </div>

        <div class="main">
        <h1 style="font-family: emoji;">This is your Deck &#11015</h1>
        <h4>Please scroll the page to see more than three deck </h4>
        <hr style="height: 1px;width: auto;margin-left: 0px;background-color: black;">
        </h1>
      

        <span v-if="deckss.jojo==true">    
        <span v-for="item in deckss.items">
            
        <div class="card"
            style="padding-bottom: 30px; width: 9cm;height: 18cm; display : flex;flex-direction:column; float: left; margin-left: 80px; margin-bottom: 20px;">
            <div class="container" style="padding: 2px 1px;text-align:center">

                <h2 id="t1"><b id="c">{{item['title']}}</b></h2>

                <h4>score : {{item['score']}}</h4>

                <h4> Last visited:
                 {{item['last_rev']}}
                </h4>
                <p id="p1"><a>View deck</a></p>
                <p id="p1"><a>Take quiz</a></p>
                <button onclick="reply_click(this.id)">Add Card</button><br><br>
            </div>
            <form method="POSt"
                style="visibility: hidden;">
                <label for="cname"><b>Card Front</b></label>
                <input type="text" placeholder="Enter front description" name="front" required>
                <br><br>
                <label for="bname"><b>Card Back</b></label>
                <input type="text" placeholder="Enter back description" name="back" required>
                <br><br>
                <button type="submit"> Submit </button>
            </form>
            <br>
            <form 
                style="visibility: hidden" method="POST">
                <label for="cname1"><b>Deck New name</b></label>
                <input type="text" placeholder="Enter Deck name" name="frontd" required>
                <br><br>
                <button type="submit">submit</button>
            </form>
            <br>
            <form  style="visibility: hidden;"
                method="post">
                <label for="dname3"><b>Are you Sure ? You want to delete the card.</b></label>
                <br><br>
                <button type="submit">Delete</button>
            </form><br>
            <button class="btn1 warning"  type="submit" name="click" value="Edit"
                onclick="func1(this.id)">Edit</button>
            <button class="btn1 success"  type="submit" name="click" value="delete"
                onclick="func2(this.id)">Delete</button>

            <button class="btn1 info" type="submit" name="click" value="cancel"><a
                     style="text-decoration: none;">Cancel</a></button>
        </div>
        
        <br><br>
      </span>
      </span>
    </div>
    </div>`,

    data: function() {
        return { deckss:
            {
                ID:0,
                jojo: false,
                items:[]
            },
            DeckData: {
                title: '',
            }
    }
    },
    metthods:{
        async onSubmitdeck() {
            const createStudentRequest = await fetch(`/api/courses/${this.$route.params.id}`, {
                method: 'PUT',
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify(this.DeckData),
            })
            console.log(createStudentRequest)
            if (createStudentRequest.ok) {
                alert('Deck created successfully')
                const data = await createStudentRequest.json()
                console.log(data)
                document.getElementById("bc").style.visibility="hidden";
                this.$router.push(`/api/courses/${this.$route.params.id}`)
                // localStorage.setItem("jwt-token",data.token);
                // this.$router.push('/')
            } else {
                let errorMessage = await createStudentRequest.json()
                this.error = errorMessage.message
            }
        },
    },

  

    async mounted() {
        // const token = localStorage.getItem('jwt-token');
        // console.log(token) 
        let res = await fetch(`/api/courses/${this.$route.params.id}`,{
            method: "GET",
        } )
        //console.log(res)
        let data=await res.json()
        console.log(data)
        // console.log(token+"HULLLLLLLLLLLAAAAAAAA")
        if (res.ok) {
            this.deckss.jojo=true
            this.deckss.items=data
            console.log(this.deckss.items)
        } else if (res.status == 401) {
            this.success = false
            this.error = data.response.error
        } else {
            this.success = false
            this.error = data.message
        }
        
    // }


}




  
    // data : function() {
    //   return {
    //     profile: {
    //       username: 'Abhisek',
    //       email: 'narendra@gmail.com',
    //     },
  
    //     success: true,
    //     error: 'Something went wrong',
    //     DeckData: {
    //       title: '',
    //     },
    //     error: false,
    //   }
    // },

    // methods:{



    // },
    // async mounted() {
    //   const res = await fetch(`/api/user/${this.$route.params.id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authentication-Token': localStorage.getItem('auth_token'),
    //     },
    //   })
    //   console.log(res)
    //   const data = await res.json()
    //   console.log(data)
    //   if (res.ok) {

    //     this.profile = data
    //   } else if (res.status == 401) {
    //     this.success = false
    //     this.error = data.response.error
    //   } else {
    //     this.success = false
    //     this.error = data.message
    //   }
    // },
  
  }
  
  export default deck