export const errorHander = (data,res,code=400) =>{
  res.status(code).json({
    hasError:true,
    errorMessage:data
  })
}

export const responseHander = (data,res,code=201) =>{
    res.status(code).json({
      hasError:false,
      body:data
    })
}

export const validateAllOnce = (fields) =>{
   for(let key in fields){
    if(fields[key].trim() ===""){
        throw `${key} required` 
    }
   }
}