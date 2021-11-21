import React, { Component, PropTypes } from 'react';
import './AdminView.css'
import {Link} from 'react-router-dom'

class AdminView extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            data: [], keys:[]
        }
    }
    componentDidMount() {
        this.populateData()
        
       }
    callBackendAPI = async (url) => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message) 
    }
    return body;
    };
    populateData(){
        let url =  "http://localhost:8080/" + this.props.view 
        this.callBackendAPI(url)
        .then(res => {
            this.setState({ data: res})
            this.setState({keys: Object.keys(res[0])})
        })
        .catch(err => console.log(err));
    }
    dictToArray(dict){
        var array = []
        for (const [key, value] of Object.entries(dict)) {
            if(key === 'image'){
                array.push(<img className = 'adminimage' src = {`data:image/jpeg;base64,${value}`} /> )
            }else{
        array.push(<td>{value}</td>);
        }
        }
        return array
    }
    
    

    render() {
       
        return (
            <div>
           
            <table>
            <thead>
            <th> </th>
            {this.state.keys.map((name,i) => 
                <th key = {name}> {(name)} </th>
                    )}
            <th> </th>
            </thead>
            <tbody>
            {this.state.data.map((name,i) =>
                <React.Fragment> 
                <tr key = {name.id}> 
                <td><button>Edit</button></td>
                 {this.dictToArray(name)} 
                 <td><button>Delete</button></td>

                 </tr>
                 </React.Fragment> 
                    )}
             </tbody>

             </table>
              <Link to = {this.props.link}>Add</Link>
              </div>  
        );
    }
}

export default AdminView;
