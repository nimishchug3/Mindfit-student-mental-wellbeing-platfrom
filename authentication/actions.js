import axios from 'axios'
import Cookies from 'js-cookie';


export const  signup=async (user)=>{
try{
    console.log("user",user);
    
    const response=await axios.post("http://localhost:8000/api/v1/user/signup",{username:user.username,password:user.password},{
        withCredentials:true,
    }  );
    console.log("response",response);


    if(response.headers['set-cookie']){
        
        const cookiesFromResponse = response.headers['set-cookie'];

        cookiesFromResponse.forEach(cookie => {
            const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
            Cookies.set(cookieName,cookieValue,{path:"/",sameSite:"None",secure:true});
        });
          }
          console.log("signup response",response);
          localStorage.setItem('user', JSON.stringify(response.data.user))

          if(response)return {status:true,user:response.data.user};
}
catch(err){
    console.log("error in ",err);
    return {status:false};
}

}


export const login=async(user)=>{
    try {

    const response = await axios.post("http://localhost:8000/api/v1/user/signin", 
    user ,
    {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    }
);


if (response.headers['set-cookie']) {
   const cookiesFromResponse = response.headers['set-cookie'];

   cookiesFromResponse.forEach(cookie => {
       const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
       Cookies.set(cookieName, cookieValue, { path: '/' , sameSite: 'None', secure: true });
   });
}

localStorage.setItem('user', JSON.stringify(response.data.user))

return { status: true, user: response.data.user };
} catch (error) {
console.log("error logging in", error);
alert(error)
return {status : false };
}
}

export const checkUserStatus = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/user/userStatus", {
            withCredentials: true,
        });

        if (response.data.userStatus) {
            return true
        }
        return false
    } catch (error) {
        console.log("some error occured in action")
        return false;
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/post/getPosts", {
            withCredentials: true
        })

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.log("error performing getAllPosts action", error)
        throw new Error("error from action")
    }
}

export const likePost = async (id) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/post/like/${id}`, null, {
            withCredentials: true
        })

        console.log(response);
        return response.data

    } catch (error) {
        console.log("error in like post action", error)
        throw new Error("some error occured");
    }
}

export const changeProfilePic = async (imageData) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/user/update-profile-pic", {
            profilePic : imageData,
        }, {
            withCredentials: true,
        })

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error)
        return;
    }
}

export const getUserData = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/user/getUser", {
            withCredentials: true,
        })

        console.log(response.data)
        return response.data.user
    } catch (error) {
        console.log(error);
        alert(error);
        return ;
    }
}

export const getChatSidebar = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/user/sidebar", {
            withCredentials: true,
        })

        console.log(response);

        return response.data;
    } catch (error) {
        console.log("error in getting chat sidebar", error)
    }
}

export const getCompleteChat = async (receiverId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/message/${receiverId}`, {
            withCredentials: true,
        })
        
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("error in getting chat sidebar", error)
        return
    }
}

export const sendMessage = async (content, receiverId) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`,{
            message: content
        },
         {
            withCredentials: true,
        })

        console.log(response.data)

        return response.data;
    } catch (error) {
        console.log("error in sending chat", error)
        return;
    }
}

export const getCaffieneConsumption = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/caffeine/total", {
            withCredentials: true,
        })

        return response.data.totalCaffeineAmount
    } catch (error) {
        console.log("error in coffee", error)
        return;
    }
}

export const addCaffiene = async (type, quantity) => {
    try {
        console.log(type)
        const response = await axios.post("http://localhost:8000/api/v1/caffeine/add", {
            productType: type,
            quantity: quantity
        }, {
            withCredentials: true
        })

        console.log(response);
        return response.data;
    } catch (error) {
        console.log("error in coffee", error)
        return;
    }
}

export const getCalorie = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/calorie/total", {
            withCredentials: true,
        })

        console.log(response);
        return response.data.totalCalorieAmount ;
    } catch (error) {
        console.log("error in calorie");
        return;
    }
}

export const addCalorie = async (type, quantity) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/calorie/add", {
            productType: type,
            quantity: quantity
        }, {
            withCredentials: true
        })

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const getEvents = async () =>  {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/event/get", {
            withCredentials: true,
        })

        console.log(response.data)
        return response.data.events;
    } catch (error) {
        console.log(error);
        return;
    }
}


export const apply = async (id) => {
    try {
        console.log(id)
        const response = await axios.get(`http://localhost:8000/api/v1/event/apply/${id}`, {
            withCredentials: true,
        })

        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const sendPost = async (content) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/post/create`, {
            content: content
        }, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error)
        return;
    }
}

export const getLeaderList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/user/leaderboard');

        return response.data
    } catch (error) {   
        console.log(error);
        return;
    }
}

export const getPostByid = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/post/getPostById/${id}`, {
            withCredentials: true,
        })
        console.log(response.data.post)
        return response.data.post;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const getAllRepliesForPost = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/reply/get/${id}`, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error)
        return;
    }
}

export const reply = async  (id, content) => {
    try {
        const response= await axios.post(`http://localhost:8000/api/v1/reply/create`, {
            postId: id,
            content: content
        }, {
            withCredentials: true
        })

        return(response.data);
    } catch (error) {
        console.log(error);
        return;
    }
}

export const getEventsForUser = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/event/appliedEvent", {
            withCredentials: true
        })

        return response.data.events;
    } catch (error) {
        console.log(error)

        return;
    }
}

export const getUserPosts = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/user/get-user-posts', {
            withCredentials: true
        })

        return response.data.posts;
        
    } catch (error) {
        console.log(error)
        return;
    }
}

export const getAllChallenges = async() => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/challenges/get', {
            withCredentials: true,
        })

        return(response.data.challenges)
    } catch (error) {
        console.log(error)
        return;
    }
}

export const getTherapists = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/therapist/get', {
            withCredentials: true
        })

        return (response.data.therapists)
    } catch (error) {
        console.log(error);
        return;
    }
}