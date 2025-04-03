import  'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

const Loading = () => {
     const {loading} = useSelector((store) => store.product)
  return (
     <Backdrop
     sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 100000,backgroundColor: 'rgba(0, 255, 255, 0.36)', backdropFilter: "blur(10px)" })}
     open={loading}
     
   >
     <CircularProgress color="inherit" />
   </Backdrop>
  )
}

export default Loading