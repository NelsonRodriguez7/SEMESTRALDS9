import Login_user from '../components/Login_user'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
const Login = () => {
  //Inicializar valores

  const [user, setUser] = useState({user:"",password:""})
  const [redirect, setRedirect]=useState(false)


  //Metodo cuando cambia
  const onchange = (event)=>{
      setUser({...user, [event.target.name]:event.target.value})
  }

  //Metodo cuando envia
  const onsubmit = async(event)=>{
      event.preventDefault()
      try{
          const url = "http://localhost:8081/user/login"
          const data = user
          const config = { headers : {'Content-Type': 'application/json'}}
          const response = await axios.post(url, data, config)
          if(response.status == 200){
            Swal.fire(
              'Excelente',
              'Inicio de sesion Exitoso',
              'success'
            )
           
            sessionStorage.setItem("token", response.data.token)
            sessionStorage.setItem("user_id", response.data.user_id)
            console.log(response.data);
            setRedirect(true)
          }else{
            Swal.fire(
              'Repanpanos',
              'Intenta nuevamente',
              'error'
            )
          }
      }catch(error){
          console.log(error)
          if(response.status == 400)
            Swal.fire(
              'Repanpanos',
              'Usuario o contraseña incorrecta',
              'error'
            )
      }
      
  } 
  if (redirect)
        return <Navigate to="/"></Navigate>
  return (
          <div className="register">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-12 col-md-4 offset-md-1">
                                <div className="register-form">
                                    <div className="mb-5">
                                        <h1>Login</h1>
                                        <p className="lead">Login your account</p>
                                    </div>
                                    <form onSubmit={onsubmit}>
                                    <div className="form-group">
                                            <label>NickName</label>
                                            <input type="text" name="user"  value={user.user} onChange={onchange} className="form-control" id="logincampo1" aria-describedby="emailHelp" placeholder="Enter NickName"/>
                                            <small id="emailHelp" className="form-text text-info">We will never share your data with anyone else.</small>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" name="password"  value={user.password} onChange={onchange} className="form-control" id="logincampo2" placeholder="Password"/>
                                        </div>
                                        <div className="custom-control custom-checkbox my-4">
                                            <input type="checkbox" name="customCheck2" className="custom-control-input" id="customCheck2"/>
                                            <label className="custom-control-label">Remember me</label>
                                        </div>
                                        <button type="submit" className="btn btn-block btn-primary">Submit</button>
                                        </form>

                                        <p className="small my-4 text-center">Don't have an account? <a href="/register">Register</a>.</p>
                            </div>
                    </div>
                    <div className="col-12 col-md-6 offset-md-1 d-flex">
                        <div className="full-picture flex-grow-1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login