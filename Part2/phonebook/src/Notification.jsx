

const Notification = ({messageError, messageOk}) => {

    if(messageError === null && messageOk === null) {
        return null
    }
  return (
    <>
    {
        messageError ?  
        <div className='error'> {messageError} </div>
        :  <div className="successful"> {messageOk} </div>
    }
    
   
    </>
  )
}

export default Notification
