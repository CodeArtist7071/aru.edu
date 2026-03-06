type statusType = "idle"|"loading" | "Success" | "failed";

export const StatusBanner=({status}:any)=>{
    // console.log("status",status.status);
   switch(status.status){
    case 400 : 
     return(
        <p className="text-red-600 text-center mb-5 bg-red-200 py-2 rounded-lg">{status.message}</p>
     )
   }
}