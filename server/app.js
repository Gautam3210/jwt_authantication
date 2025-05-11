const express = require('express')

const app = express()

app.set('view engine', 'ejs');

app.get('/signup',(req, res)=>{
  res.render('signUp');
})
app.get('/login', (req, res)=>{
  res.render('logIn');
})


app.listen(5000, ()=>{
  console.log("server is running on port 5000")
})