const home = {
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
                <h2 >Flashcard</h2>
                <hr style="width: 500px;height: 0px;width: 950px;margin-left: 0px;background-color: black;">
                <p>Why Flashcard ?</p>
                <p style="margin-right: 18cm;">With effective self testing approach you can improve your memory in a easier way.</p>
                <p style="margin-right: 18cm;">Build multiple deck with multiple card for interactive learning .</p>
                <div class="bottom-center" style="text-align: center;font-size: 18px;"><h5>&copy Sumistha Saha.All rights reserved</h5></div>
            </div>
     
    </div>

`



}

export default home