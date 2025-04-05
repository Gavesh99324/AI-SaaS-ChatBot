
import React , { useEffect} from 'react';
import { Box, Typography, Button } from '@mui/material';
import Robot from '../../src/assets/robot_p.png';
import CustomizedInput from '../components/shared/CustomizedInput';
import { IoLogIn } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Signing In", {id: "login"})
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });

    } catch (error) {
      console.log(error)
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login")
    } 
  }, [auth?.user])

  console.log("Robot Image Path:", Robot);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <h1>Login</h1>
      <Box padding={7} mt={7} sx={{ display:{ md: "flex", sm: "none", xs: "none"}}}>
        <img src={Robot} alt="Robot" style={{ width: "300px" }} />
      </Box>

      <Box display={"flex"} flex={{ xs: 1, md: 0.5 }} justifyContent={'center'} alignItems={'center'} padding={2} ml={"auto"} mt={16}>
        <form
           onSubmit={(handleSubmit)}
           style={{ 
              margin: 'auto', 
              padding: '30px', 
              boxShadow: "10px 10px 20px rgba(0, 170, 190, 0.5)", 
              borderRadius: "10px", 
              border: "none", 
            }}
        >
          <Box sx={{ display: 'flex', flexDirection:"column", justifyContent: "center" }}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label={"Email"}/>
            <CustomizedInput type="password" name="password" label={"Password"}/>
            <Button type='submit' 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      mt: 2, 
                      width: "300px", 
                      borderRadius: 2, 
                      bgcolor: "rgba(0, 170, 190, 0.6)",
                      ":hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    endIcon={<IoLogIn />}
                    >
                    Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
};

export default Login;



