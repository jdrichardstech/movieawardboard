import React from 'react'



const Movie = (props)=>{
  return(
    <div>



      <div className="row blog-comments">

        <div className="col-md-12">

          <div className="  tag-box tag-box-v3" style={{marginBottom:15}}>
              {props.currentNote.note}
          </div>

        </div>



      </div>






    </div>
  )
}



export default Movie
