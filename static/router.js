import home from './components/home.js'
//import userComponent from './components/user/user.js'
// import allStudents from './components/student/students.js'
import register from './components/user/register.js'
import login from './components/user/login.js'
import dashboard from './components/user/dashboard.js'
import deck from './components/user/deck.js'
//import updateStudent from './components/student/update_student.js'


const routes = [
  // home route
  { path: '/', name: 'home', component: home },

// user routes
  //{ path: '/students', name: 'students', component: allStudents },
  //{ path: '/student/:id', name: 'student', component: studentComponent },
//   {
//     path: '/update/student/:id',
//     name: 'updateStudent',
//     component: updateStudent,
//   },
  { path: '/register', name: 'register', component: register },
  { path: '/login', name: 'login', component: login },
  { path: '/dashboard/:id', name: 'dashboard', component: dashboard},
  { path: '/deck/:id', name: 'deck', component: deck},
]


const router = new VueRouter({
  routes,
  base: '/',
})

export default router
