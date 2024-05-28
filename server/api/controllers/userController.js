
export const Logout=async(req,res)=>{
    try {
        res.clearCookie('access_token')
            .status(200).json({
                messsage:"Logout Successful"
            })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}