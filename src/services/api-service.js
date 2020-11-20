import axios from 'axios';
const baseUrl = process.env.VUE_APP_BASE_URL;

axios.interceptors.request.use(
    (request) => {
        request.headers={
            "content-type":"application/json"
        }
        console.log(request.url);
        if(request.url.indexOf('auth/local')===-1){
            if(sessionStorage.getItem('user')){
                const {jwt} = {...JSON.parse(sessionStorage.getItem('user'))};
                console.log(jwt);

                request.headers={
                    ...request.headers,
                    "Authorization":"Bearer "+jwt
                }
    
            }
        }
        console.log('Intercept request',request)
        return request;
    }
)

axios.interceptors.response.use(
    (response) => {
        const {data,config} ={...response};
        console.log('config',config)
        if(config.url.indexOf('auth/local')>-1){
            sessionStorage.setItem('user',JSON.stringify(data))
        }
        console.log('RESP',response)
        return response;
    },
    (error)=>{
        console.log('Intercept Response Er',error)
        return Promise.reject(error)
    }
)

class ApiService {

    static async get(url) {
        try {
            const {data} = await axios.get(`${baseUrl}${url}`);
            return data;
        } catch (e) {
            return (e);
        }
    }
    static async post(url,inputData) {
        return axios.post(`${baseUrl}${url}`, inputData)
        // try{
        //     const {data} = await axios.post(`${baseUrl}${url}`,inputData);
        //     return data;
        // }catch(e){
        //     console.log(e);
            
        // }
    }
    static async delete(clientId, orderId) {
        try {
            const deleted = await axios.delete(`${baseUrl}/${clientId}/${orderId}`);
            return deleted;
        } catch (e) {
            return e;
        }
    }
}

export default ApiService;