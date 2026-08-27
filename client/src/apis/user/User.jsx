import axios from 'axios';

export const registerAPI = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/register",
      {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;   // <-- IMPORTANT
  }
};

export const loginAPI = async (userData) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/users/login",
            {
                email:userData?.email,
                password:userData?.password,
            },
            {
                withCredentials:true
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error in login :",error);
    }
}

export const checkUserAuthStatusAPI = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/users/auth/check",
            {
                withCredentials:true
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error in user Authentication :",error);
    }
}

export const logoutAPI = async () => {
     try {
        const response = await axios.post("http://localhost:5000/api/v1/users/logout",
            {},
            {
                withCredentials:true
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error in logout :",error);
    }
}

export const getUserProfileAPI = async () => {
     try {
        const response = await axios.get("http://localhost:5000/api/v1/users/profile",
            {
                withCredentials:true
            }
        );
        return response?.data;
    } catch (error) {
        console.error("Error to getting profile :",error);
    }
}
