import Headers from './Headers'
import Content from './Content'

const Course = ({ course }) => {
 
 
  
  
  return (
    <div>
     <Headers course={course}/>
     <Content content={course}/>
     
    </div>
  )
}

export default Course
