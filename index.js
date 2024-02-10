let movies= [
   
];


// below  code is used  to save data permanetly.when we refresh it also it works

if(localStorage.getItem("movies")!==null)
{
  movies=JSON.parse(localStorage.getItem("movies"));
}
else
{
  localStorage.setItem("movies",JSON.stringify(movies));
}


// getting the number of pages
let totalPages=Math.ceil(movies.length/10);

// Current page number

let currentPage=1;
let start=0;
let end=10

// serial number

let serial=start+1;

// preparing the first 10 data

let paginate=movies.slice(start,end);

document.getElementById("totalpages").innerText=totalPages;



// function to display given movies array

function displayMoviesTable(moviesArr)
{
  // this below one is write after push movie tomovie(movies.push(movie).because when we display moves it shows again and again when we add new movies so we write like this to avoid that problem)
   document.getElementById("movies").innerHTML="";


   moviesArr.forEach((movie,index) => 
   {
        let row=document.createElement("tr");

        let numbering=document.createElement("td");
        numbering.append(serial);
        row.appendChild(numbering);
        serial++;

        let title=document.createElement("td");
        title.append(movie.title);
        row.appendChild(title);

        let releaseDate=document.createElement("td");
        releaseDate.append(movie.releaseDate);
        row.appendChild(releaseDate);

        // genre is in a ARRAY SO WE LOOP IT.
        let genres =document.createElement("td");
        movie.genres.forEach((genre,index)=>
        {
             genres.append(genre+" . ");
        })
        row.appendChild(genres);

        let duration=document.createElement("td");
        duration.append(movie.duration);
        row.appendChild(duration);

        let imdbRating =document.createElement("td");
        imdbRating.append(movie.imdbRating);
        row.appendChild(imdbRating);

        

        let actions=document.createElement("td");
        actions.classList.add("actions")
        // .classList.add("") is adding class to the tag

        let view=document.createElement("i")
        view.classList.add("fa-solid")
        view.classList.add("fa-eye")
        view.onclick=openViewModal.bind(this,movie.id)


        // HOW TO PASS THE PARAMETER 
        // view.onclick=openModel.bind(this,"whaterever you want to pass"),bind is used to pass argument
        
        //one moree way is
        
        // view.addEventListener("click",openModal);


        let trash=document.createElement("i")
        trash.classList.add("fa-solid")
        trash.classList.add("fa-trash")
        trash.onclick=deleteMovie.bind(this,movie.id);

        let edit=document.createElement("i")
        edit.classList.add("fa-regular")
        edit.classList.add("fa-pen-to-square")
        edit.onclick= setUpdate.bind(this,movie.id)

        actions.appendChild(view);
        actions.appendChild(edit);
        actions.appendChild(trash);
        row.appendChild(actions);


        document.getElementById("movies").appendChild(row);

   });
}


displayMoviesTable(paginate)

// functon to load next page

function nextPage()
{
   if(currentPage<totalPages)
   {
    currentPage++;
    start+=10;
    end+=10;
    serial=start+1;

    paginate=movies.slice(start,end);
    displayMoviesTable(paginate);
    document.getElementById("current_page").innerText=currentPage;
   }
   
}

function prevPage()
{
   if(currentPage>1)
   {
    currentPage--;
    start-=10;
    end-=10;
    serial=start+1;

    paginate=movies.slice(start,end);
    displayMoviesTable(paginate);
    document.getElementById("current_page").innerText=currentPage;
   }
   
}

function openPage(pageNumber)
{
  if(pageNumber!=="" && pageNumber>=1 && pageNumber<=totalPages)
  {
    currentPage=pageNumber;
    start=(currentPage-1)*10;
    end=currentPage*10;
    serial=start+1;

    paginate=movies.slice(start,end);
    displayMoviesTable(paginate);
    document.getElementById("current_page").innerText=currentPage;
  }
 
}

// function to display single movie info

function openViewModal(movieid)
{
let movie=movies.find((movie,index)=>
{
    return movie.id===movieid
})
document.getElementById("title").innerText=movie.title;
document.getElementById("poster").src=movie.posterurl;
document.getElementById("genree").innerText=movie.genres;
document.getElementById("story").innerText=movie.storyline;
document.getElementById("actor").innerText=movie.actors;
document.getElementById("rd").innerText=movie.releaseDate;
document.getElementById("time").innerText=movie.duration;
document.getElementById("time").innerText=movie.duration;
document.getElementById("time").innerText=movie.duration;
document.getElementById("imbd").innerText=movie.imdbRating;
document.getElementById("average").innerText=movie.contentRating;



document.getElementById("view_modal").style.display="flex";


}

// function to open create movie modal

function openAddModal()
{
document.getElementById("add_modal").style.display="flex";
}


// function to add a movie


function createMovie()
{

let lastId;
if(movies.length!==0)
{
  lastId=movies.length 
  // let lastId=movies[movies.length-1].id 
}
else
{
  lastId=0
}


let movie={
  ratings:[],
  id:lastId+1
}

movie.title=document.getElementById("add_title").value;
movie.genres=document.getElementById("add_genres").value.split(",");
movie.duration=document.getElementById("add_duration").value;
movie.releaseDate=document.getElementById("add_releasedate").value;
movie.storyline=document.getElementById("add_storyline").value;
movie.actors=document.getElementById("add_actors").value.split(",");
movie.imdbRating=document.getElementById("add_imbd").value;
movie.posterurl=document.getElementById("add_posterurl").value;

movies.push(movie);
localStorage.setItem("movies",JSON.stringify(movies));
displayMoviesTable(movies);
closemodal("add_modal")


document.getElementById("add_form").reset();

document.getElementById("add_releasedate").type="text";

}



// function to setup data for update

let movieToUpdate=null;
function setUpdate(id)
{
movieToUpdate=movies.find((movie,index)=>
{
  return movie.id===id;
})
    
  
    document.getElementById("update_title").value=movieToUpdate.title;
    
    // let genres="";
    // movie.genres.forEach((genre,index)=>
    // {
    //   genres+=genre+",";
    // })
    // document.getElementById("update_genres").value=genres.substring(0,genres.length-1);

    // instead of above code we can just call a convertToCommaString function

    document.getElementById("update_genres").value=convertToCommaString(movieToUpdate.genres);


    document.getElementById("update_duration").value=movieToUpdate.duration;
    document.getElementById("update_releasedate").value=movieToUpdate.releaseDate;
    document.getElementById("update_storyline").value=movieToUpdate.storyline;

     
    // let actors="";
    // movie.actors.forEach((actor,index)=>
    // {
    //   actors+=actor+",";
    // })
    // document.getElementById("update_actors").value=actors.substring(0,actors.length-1);

    document.getElementById("update_actors").value=convertToCommaString(movieToUpdate.actors);

    document.getElementById("update_imbd").value=movieToUpdate.imdbRating;
    document.getElementById("update_posterurl").value=movieToUpdate.posterurl;




document.getElementById("update_modal").style.display="flex";
}


// this below function is used to reduce the code for genres and actors

function convertToCommaString(data)
{
let stringData="";
data.forEach((d,index)=>
{
  stringData+=d+",";
})
return stringData.substring(0,stringData.length-1);

}

// FUNCTION TO UPDATE THE MOVIES


function updateMovie()
{

movieToUpdate.title=document.getElementById("update_title").value;
movieToUpdate.genres=document.getElementById("update_genres").value.split(",");
movieToUpdate.duration=document.getElementById("update_duration").value;
movieToUpdate.releaseDate=document.getElementById("update_releasedate").value;
movieToUpdate.storyline=document.getElementById("update_storyline").value;
movieToUpdate.actors=document.getElementById("update_actors").value.split(",");
movieToUpdate.imdbRating=document.getElementById("update_imbd").value;
movieToUpdate.posterurl=document.getElementById("update_posterurl").value;

localStorage.setItem("movies",JSON.stringify(movies));
displayMoviesTable(movies);
closemodal("update_modal");

}


// to delete movies

function deleteMovie(id)
{
    let confirmation=confirm("Are you sure you want to delete");
    if( confirmation===true)
    {
      let index=movies.findIndex((movie,index)=>
      {
        return movie.id===id;
      })
      movies.splice(index,1);
      localStorage.setItem("movies",JSON.stringify(movies));
      displayMoviesTable(movies);
     }
}
   

// console.log(movie)






// function to close any modal

function closemodal(modal)
{
document.getElementById(modal).style.display="none";
}


// function to convert text to date

function convertToDate()
{
document.getElementById("add_releasedate").type="date";
}
























