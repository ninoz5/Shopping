const express = require('express');
const app = express()
const Joi = require('joi')
app.use(express.json())
const courses = [
	{id:1, name: 'course1'},
	{id:2, name: 'course2'},
	{id:3, name: 'course3'}
]

app.get('/',(req,res) =>{
	res.send('Hello world!')
});
app.get('/api/courses', (req,res)=>{
	res.send(courses);
});
app.post('/api/courses', (req,res) =>{
	
	const {error} = validateCourse(req.body) // result.error
	console.log(result)
	if(error)return res.status(400).send(result.error.details[0].message)
	
	const course = {
		id:courses.length + 1,
		name:req.body.name
	};
	courses.push(course);
	res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
	//look up the course, validate, update
	const course =courses.find(c => c.id === parseInt(req.params.id))
	if(!course) return res.status(404).send('the course was not found')//404
	
	
	const {error} = validateCourse(req.body) // result.error
	if(error)return res.status(400).send(result.error.details[0].message)
	
	course.name = req.body.name;
	res.send(course)
})
app.delete('/api/courses/:id', (req,res) => {
	const course =courses.find(c => c.id === parseInt(req.params.id))
	if(!course) return  res.status(404).send('the course was not found')//404
	
	const index  = course.indexOf(course);
	course.splice(index,1)
	res.send(course)

})
app.get('/api/courses/:id', (req,res) =>{
	const course =courses.find(c => c.id === parseInt(req.params.id))
	if(!course) return  res.status(404).send('the course was not found')//404
		res.send(course)
})
app.get('/api/posts/:year/:month', (req,res) =>{
	res.send(req.query)
})
//Port
const port = process.env.PORT ||3000
app.listen(port, () => console.log(`listening ${port}` ))

function validateCourse(course){
	const schema = {
		name:Joi.string().min(3).required()
	}
	return  Joi.validate(req.body,schema)
	
}

