const dropZone = document.querySelector(".ev_share_container");
const inputfile = document.querySelector("#inputfile");
const browsefile = document.querySelector("#browsefile");
const filename = document.querySelector("#filename");

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    dropZone.classList.add("dragged");
});

dropZone.addEventListener("dragleave",(e)=>{
   dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
   dropZone.classList.remove("dragged");
   let files= e.dataTransfer.files;
   
   if(files.length)
   {
    inputfile.files= files;
    filename.innerText = files[0].name;
   }
  
});

browsefile.addEventListener("click",()=>{
    inputfile.click();
    
})