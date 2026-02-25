import axios from "axios";
import { getToken, removeToken } from "../utils/storage";



const cliente = axios.create({
    baseURL: "http://localhost:3000/api",
    headers:{
        "Content-Type": "application/json"
    },
})

cliente.interceptors.request.use((config)=>{

    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


cliente.interceptors.response.use(
  (response) => response,  // Si todo bien, deja pasar la respuesta
  (error) => {
    if (error.response?.status === 401) {
      removeToken()  // Bota la pulsera vencida
      window.location.href = '/login'  // Manda al login
    }
    return Promise.reject(error)  // Propaga el error para que lo maneje quien llamó
  }
)

export default cliente