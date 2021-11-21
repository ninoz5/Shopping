const express = require('express')



const app = express()

const port = process.env.PORT || 5000;

	


app.listen(port, () => {
	console.log('server started on port 3000')
})
app.get('/express_backend',(req,res) =>{
	 res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});